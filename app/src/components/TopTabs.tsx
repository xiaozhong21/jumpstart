import { Box, Tab, Tabs, Typography } from "@mui/material";
import PropTypes from "prop-types";

import { TabProps } from "../utils/types";

const TopTabs = ({ value, handleChange }: TabProps) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="page top tabs to filter through project labels"
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
        >
          <Tab label="All" {...a11yProps(0)} />
          <Tab label="Arts" {...a11yProps(1)} />
          <Tab label="Food and Craft" {...a11yProps(2)} />
          <Tab label="Tech and Design" {...a11yProps(3)} />
          <Tab label="Games" {...a11yProps(4)} />
          <Tab label="Music" {...a11yProps(5)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}></TabPanel>
      <TabPanel value={value} index={1}></TabPanel>
      <TabPanel value={value} index={2}></TabPanel>
      <TabPanel value={value} index={3}></TabPanel>
      <TabPanel value={value} index={4}></TabPanel>
      <TabPanel value={value} index={5}></TabPanel>
    </Box>
  );
};

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default TopTabs;
