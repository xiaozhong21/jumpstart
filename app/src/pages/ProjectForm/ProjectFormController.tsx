import * as React from "react";

import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import useProtectedApi from "../../services/apiClients/useProtectedApi";
import { ProjectFormInput, Project } from "../../utils/types";

import ProjectFormView from "./ProjectFormView";

const ProjectFormController = () => {
  const { loading, apiClient } = useProtectedApi();

  const { register, control, handleSubmit, setValue, formState } =
    useForm<ProjectFormInput>({
      defaultValues: {
        imageUrl:
          "https://github.com/xiaozhong21/Investory/blob/main/docs/images/logo.png?raw=true",
      },
    });
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [project, setProject] = React.useState<Project>();
  const [error, setError] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  const isAddMode = !projectId;

  const autopopulate = (project: Project) => {
    if (!isAddMode) {
      setValue("title", project.title);
      setValue("description", project.description);
      setValue("label", project.label);
      setValue("imageUrl", project.image_url);
      setValue("fundingGoal", project.funding_goal);
    }
  };

  const clearForm = () => {
    setValue("title", "");
    setValue("description", "");
    setValue("label", "");
    setValue("imageUrl", "");
    setValue("fundingGoal", 0);
  };

  const loadProject = React.useCallback(() => {
    if (projectId !== undefined && apiClient) {
      apiClient
        .getProject(projectId)
        .then((response: Project) => {
          setProject(response);
          autopopulate(response);
          setError(false);
        })
        .catch((err: { message: React.SetStateAction<string> }) => {
          setError(true);
          setErrorMessage(err.message);
        });
    } else {
      clearForm();
    }
  }, [apiClient, projectId, autopopulate, clearForm]);

  const onSubmit: SubmitHandler<ProjectFormInput> = async (data) => {
    if (data.imageUrl === "") {
      data.imageUrl =
        "https://github.com/xiaozhong21/jumpstart/blob/main/app/src/assets/logo.png?raw=true";
    }
    if (isAddMode) {
      apiClient && (await apiClient.addCreatorProject(data));
    } else {
      apiClient && (await apiClient.updateCreatorProject(projectId, data));
    }
    navigate("/dashboard");
  };

  React.useEffect(() => {
    loadProject();
  }, [loading, projectId]);

  return (
    <ProjectFormView
      isAddMode={isAddMode}
      error={error}
      errorMessage={errorMessage}
      project={project}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      register={register}
      control={control}
      formState={formState}
    />
  );
};

export default ProjectFormController;
