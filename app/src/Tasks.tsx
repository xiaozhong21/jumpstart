import * as React from "react";

import * as apiClient from "./apiClient";

// import styles from "./styles.module.scss";

const Tasks = () => {
  return (
    <section>
      <TaskList />
      <AddTask />
    </section>
  );
};

const TaskList = () => {
  interface Task {
    id: number;
    name: string;
  }
  const [tasks, setTasks] = React.useState<Task[]>([]);

  const loadTasks = async () => setTasks(await apiClient.getTasks());

  React.useEffect(() => {
    loadTasks();
  }, []);

  return (
    <ul>
      {tasks.map(({ id, name }) => (
        <li key={id}>{name}</li>
      ))}
    </ul>
  );
};

const AddTask = () => {
  const [task, setTask] = React.useState("");

  const canAdd = task !== "";

  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (canAdd) {
      apiClient.addTask(task);
      setTask("");
    }
  };

  return (
    <form {...{ onSubmit }}>
      <label>
        New task:{" "}
        <input onChange={(e) => setTask(e.currentTarget.value)} value={task} />
      </label>
      <button disabled={!canAdd}>Add</button>
    </form>
  );
};

export default Tasks;
