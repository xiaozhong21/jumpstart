import * as React from "react";

import LoyaltyTwoToneIcon from "@mui/icons-material/LoyaltyTwoTone";
import {
  Box,
  Button,
  Typography,
  Modal,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
} from "@mui/material";

import { convertNumToThousandths, timestampFormatter } from "../utils/helpers";
import { FundingHistoryModalProps } from "../utils/types";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const FundingHistoryModal = ({ projectFundings }: FundingHistoryModalProps) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Button
        aria-label="click to see all past fundings for this project"
        onClick={handleOpen}
      >
        See all fundings
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Funding History:
          </Typography>
          <List>
            {projectFundings &&
              projectFundings.map(
                ({ funding_id, contributor, amount, created_at }) => (
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
                ),
              )}
          </List>
        </Box>
      </Modal>
    </Box>
  );
};

export default FundingHistoryModal;
