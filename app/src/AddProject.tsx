import * as React from "react";

import { useNavigate } from "react-router-dom";

import * as apiClient from "./apiClient";
import { Project } from "./types";

const AddProject = () => {
  const [title, setTitle] = React.useState<string>("");
  const navigate = useNavigate();

  let userInput: Project = {
    title,
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
