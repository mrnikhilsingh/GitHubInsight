import React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { RepoCard } from "./RepoCard";
import { FollowerCard } from "./FollowerCard";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Feed({ width }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <section id="feed-section" className="w-[80%]">
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Repositories" {...a11yProps(0)} />
            <Tab label="Forked" {...a11yProps(1)} />
            <Tab label="Followers" {...a11yProps(2)} />
            <Tab label="Followings" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <div className="grid-cols-autoFill grid gap-4">
            <RepoCard />
            <RepoCard />
            <RepoCard />
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <div className="grid-cols-autoFill grid gap-4">
            <RepoCard />
            <RepoCard />
            <RepoCard />
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <div className="grid-cols-autoFill grid gap-4">
            <FollowerCard />
            <FollowerCard />
            <FollowerCard />
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <div className="grid-cols-autoFill grid gap-4">
            <FollowerCard />
            <FollowerCard />
            <FollowerCard />
          </div>
        </CustomTabPanel>
      </Box>
    </section>
  );
}
