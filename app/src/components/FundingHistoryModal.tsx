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
    <div>
      <Button onClick={handleOpen}>See all</Button>
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
                  <>
                    <Divider />
                    <ListItem key={funding_id}>
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
                  </>
                ),
              )}
          </List>
          {/* {projectFundings}
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
        </Box>
      </Modal>
    </div>
  );
};

export default FundingHistoryModal;
