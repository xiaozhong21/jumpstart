import { AddProjectInput, FundingDetails } from "../utils/types";

export const getProjects = async () => _get("/api/projects");

export const getProject = async (projectId: string) =>
  _get(`/api/projects/${projectId}`);

export const getProjectFundings = async (projectId: string) =>
  _get(`/api/projects/${projectId}/fundings`);

export const addProject = async (project: AddProjectInput) =>
  _post("/api/projects", project);

export const addProjectFunding = async (fundingDetails: FundingDetails) =>
  _post(`/api/projects/${fundingDetails.projectId}/fundings`, fundingDetails);

const _get = async (url: RequestInfo) => (await fetch(url)).json();

const _post = async (
  url: RequestInfo,
  body: AddProjectInput | FundingDetails,
) => {
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
