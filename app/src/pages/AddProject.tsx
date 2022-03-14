import * as React from "react";

import { useNavigate } from "react-router-dom";

import * as apiClient from "../services/apiClient";
import { AddProjectInput } from "../utils/types";

const AddProject = () => {
  const [title, setTitle] = React.useState<string>("");
  const navigate = useNavigate();

  let userInput: AddProjectInput = {
    title,
    description: "",
    label: "",
    creator: "",
    imageUrl: "",
    fundingGoal: 0,
    totalFundings: 0,
  };

  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    apiClient.addProject(userInput);
    navigate("/projects");
    setTitle("");
  };

  return (
    <form {...{ onSubmit }}>
      <label>
        Add project:
        <input
          onChange={(e) => setTitle(e.currentTarget.value)}
          value={title}
        />
      </label>
      <button>Add</button>
    </form>
  );
};

export default AddProject;
