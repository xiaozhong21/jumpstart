export const getTasks = () => _get("/api/tasks");

export const addTask = (name: string) => _post("/api/tasks", { name });

const _get = async (url: RequestInfo) => (await fetch(url)).json();

const _post = async (url: RequestInfo, body: { name: string }) => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  let result;
  try {
    result = await response.json();
  } catch {}

  return result;
};
