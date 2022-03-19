import { Control, SubmitHandler, UseFormHandleSubmit } from "react-hook-form";

export interface Project {
  project_id: number;
  title: string;
  description: string;
  label: string;
  image_url: string;
  funding_goal: number;
  total_fundings: number;
  created_at: Date;
}

export interface ProjectFunding {
  funding_id: number;
  project_id: number;
  contributor: string;
  amount: number;
  created_at: Date;
}

export interface ProjectCardProps {
  projectId: number;
  title: string;
  description: string;
  label: string;
  imageUrl: string;
  fundingGoal: number;
  totalFundings: number;
  isAuthenticated?: boolean;
  loadCreatorProjects?: () => void;
}

export interface ProgressBarProps {
  fundingGoal: number;
  totalFundings: number;
}

export interface FundingFormInput {
  contributor: string;
  amount: number;
}

export interface FundingDetails {
  projectId: number;
  contributor: string;
  amount: number;
}

export interface ProjectFormInput {
  title: string;
  description: string;
  label: string;
  imageUrl: string;
  fundingGoal: number;
  user: any;
}

export interface Creator {
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  sub: string;
}

export interface UseApiStates {
  loading: boolean;
  error: any;
  apiClient: any;
}

export interface ProtectedRouteProps {
  component: any;
}

export interface FundingHistoryModalProps {
  projectFundings: ProjectFunding[];
}

export interface DashboardViewProps {
  creatorProjects: Project[];
  isAuthenticated: boolean;
  loadCreatorProjects: () => void;
}

export interface FundingFormViewProps {
  handleFormSubmit: SubmitHandler<FundingFormInput>;
  formSubmitted: boolean;
  error: string | null;
  handleChange: (event: any) => Promise<void>;
  succeeded: boolean;
  disabled: boolean;
  processing: boolean | undefined;
  control: Control<FundingFormInput, any>;
  handleSubmit: UseFormHandleSubmit<FundingFormInput>;
}

export interface ProjectDetailsViewProps {
  project: Project | undefined;
  projectFundings: ProjectFunding[];
  error: boolean;
  errorMessage: string;
}
