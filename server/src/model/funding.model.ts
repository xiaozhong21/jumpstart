import { FundingDetails } from "../utils/types";
import { db } from "../service/dbConnection";

export const getProjectFundings = (projectId: string) =>
  db.any(
    "SELECT * FROM fundings WHERE project_id=$<projectId> ORDER BY created_at DESC",
    {
      projectId,
    },
  );

export const addProjectFunding = ({
  projectId,
  contributor,
  amount,
}: FundingDetails) => {
  db.one(
    "INSERT INTO fundings(project_id, contributor, amount) VALUES($<projectId>, $<contributor>, $<amount>) RETURNING *",
    { projectId, contributor, amount },
  );
  db.one(
    "UPDATE projects SET total_fundings=(total_fundings + $<amount>) WHERE project_id=$<projectId> RETURNING *",
    { projectId, amount },
  );
};
