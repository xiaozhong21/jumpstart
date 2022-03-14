export interface Project {
  project_id: number;
  title: string;
  description: string;
  label: string;
  creator: string;
  image_url: string;
  funding_goal: number;
  total_fundings: number;
  created_at: Date;
}

export interface ProjectCardProps {
  title: string;
  description: string;
  label: string;
  imageUrl: string;
  fundingGoal: number;
  totalFundings: number;
}

export interface AddProjectInput {
  title: string;
  description: string;
  label: string;
  creator: string;
  imageUrl: string;
  fundingGoal: number;
  totalFundings: number;
}

export interface ProgressBarProps {
  fundingGoal: number;
  totalFundings: number;
}
