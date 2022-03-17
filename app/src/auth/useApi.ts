import * as React from "react";

import { Creator, UseApiStates, ProjectFormInput } from "../utils/types";

import useAuth0 from "./useAuth0";

const makeApi = (accessToken: string) => {
  const actions = {
    addOrUpdateUser: (user: Creator) => _post("/api/creators", { user }),
    getCreatorProjects: () => _get(`/api/creators/projects`),
    getProject: async (projectId: string) => _get(`/api/projects/${projectId}`),
    addProject: async (project: ProjectFormInput) =>
      _post("/api/creators/projects", project),
    updateProject: async (projectId: string, project: ProjectFormInput) =>
      _post(`/api/creators/projects/${projectId}`, project),
    deleteProject: async (projectId: number) =>
      _delete(`/api/projects/${projectId}`),
  };

  const _get = async (url: string) => (await _fetch(url)).json();

  const _post = async (url: string, body: any) => {
    const response = await _fetch(url, {
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

  const _delete = (url: string) => _fetch(url, { method: "DELETE" });

  const _fetch = async (url: string, options?: RequestInit | undefined) => {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...(options?.headers ?? {}),
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  };

  return actions;
};

const useApi = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [state, setState] = React.useState<UseApiStates>({
    loading: true,
    error: null,
    apiClient: undefined,
  });

  React.useEffect(() => {
    if (isAuthenticated) {
      (async () => {
        try {
          const accessToken = await getAccessTokenSilently();
          setState({
            loading: false,
            error: null,
            apiClient: makeApi(accessToken),
          });
        } catch (error) {
          setState({ loading: false, error, apiClient: undefined });
        }
      })();
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  return state;
};

export default useApi;
