import LabelIcon from "@mui/icons-material/Label";
import LoyaltyTwoToneIcon from "@mui/icons-material/LoyaltyTwoTone";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import {
  Grid,
  Typography,
  CardMedia,
  Box,
  Button,
  Card,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";

import FundingHistoryModal from "../../components/FundingHistoryModal";
import ProgressBar from "../../components/ProgressBar";
import {
  convertNumToThousandths,
  timestampFormatter,
} from "../../utils/helpers";
import { ProjectDetailsViewProps } from "../../utils/types";

const ProjectDetailsView = ({
  project,
  projectFundings,
  error,
  errorMessage,
}: ProjectDetailsViewProps) =>
  error === true ? (
    <p>{errorMessage}</p>
  ) : !project ? (
    <p>Loading...</p>
  ) : (
    <>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h5">{project.title}</Typography>
      </Box>
      <Grid container spacing={4} mt={1} sx={{ justifyContent: "center" }}>
        <Grid item xs={12} md={7}>
          <Card>
            <CardMedia
              component="img"
              height="300"
              image={project.image_url}
              alt={project.title}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "space-between",
              gap: "15px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 2,
              }}
            >
              <LabelIcon sx={{ color: "#00807b" }} />
              <Typography sx={{ color: "#00807b", fontSize: "small" }}>
                {project.label}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant="body1"
                component="div"
                sx={{ fontSize: "x-large", fontWeight: "900" }}
              >
                ${convertNumToThousandths(project.total_fundings)}
              </Typography>
              <Typography>
                <span style={{ fontSize: "small", color: "grey" }}>
                  raised of ${convertNumToThousandths(project.funding_goal)}{" "}
                  goal
                </span>
              </Typography>
            </Box>

            <ProgressBar
              fundingGoal={project.funding_goal}
              totalFundings={project.total_fundings}
            />
            {projectFundings.length !== 0 ? (
              <Box
                sx={{ display: "flex", justifyContent: "flex-start", gap: 2 }}
              >
                <TrendingUpIcon sx={{ color: "#00807b" }} />
                <Typography
                  sx={{
                    color: "#00807b",
                    fontSize: "small",
                    fontStyle: "italic",
                  }}
                >
                  {projectFundings.length === 1
                    ? "1 total funding"
                    : `${projectFundings.length} total fundings`}{" "}
                </Typography>
              </Box>
            ) : (
              <Box
                sx={{ display: "flex", justifyContent: "flex-start", gap: 2 }}
              >
                <TrendingUpIcon sx={{ color: "#00807b" }} />
                <Typography
                  sx={{
                    color: "#00807b",
                    fontSize: "small",
                    fontStyle: "italic",
                  }}
                >
                  Be the first to contribute to its initial seed funding!
                </Typography>
              </Box>
            )}

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: "30px",
              }}
            >
              <Link to={`/projects/${project.project_id}/fund`}>
                <Button
                  aria-label="click the button to fund this project"
                  variant="contained"
                  sx={{
                    color: "black",
                    fontWeight: "900",
                    backgroundImage:
                      "linear-gradient(rgb(253, 185, 51) 35.42%, rgb(245, 129, 49) 139.58%)",
                  }}
                >
                  Fund It Now
                </Button>
              </Link>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={4} mt={1} sx={{ justifyContent: "center" }}>
        <Grid item xs={12} md={7}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <Typography variant="h6" sx={{ color: "#00807b" }}>
              Project Description
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 400 }}>
              {project.description}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          {projectFundings.length !== 0 ? (
            <Box>
              <Typography variant="h6" sx={{ color: "#00807b" }}>
                Funding History
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "space-between",
                }}
              >
                <List>
                  {projectFundings
                    .slice(0, 3)
                    .map(({ funding_id, contributor, amount, created_at }) => (
                      <Box key={funding_id}>
                        <Divider />
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar>
                              <LoyaltyTwoToneIcon sx={{ color: "white" }} />
                            </Avatar>
                          </ListItemAvatar>
                          {contributor ? (
                            <ListItemText
                              primary={`$${convertNumToThousandths(
                                amount,
                              )} from ${contributor}`}
                              secondary={timestampFormatter(created_at)}
                            />
                          ) : (
                            <ListItemText
                              primary={`$${convertNumToThousandths(amount)}`}
                              secondary={timestampFormatter(created_at)}
                            />
                          )}
                        </ListItem>
                      </Box>
                    ))}
                </List>
                <FundingHistoryModal projectFundings={projectFundings} />
              </Box>
            </Box>
          ) : null}
        </Grid>
      </Grid>
    </>
  );

export default ProjectDetailsView;
