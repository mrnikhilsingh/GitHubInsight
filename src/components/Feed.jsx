import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { RepoCard } from "./RepoCard";
import { FollowerCard } from "./FollowerCard";
import { useMediaQuery } from "@mui/material";
import axios from "axios";
import { FollowCard } from "./FollowCard";
import { ErrorPage } from "./ErrorPage";

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
      {value === index && <Box sx={{ px: 0.5, py: 3 }}>{children}</Box>}
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

export default function Feed({ width, searchQuery }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const isWideScreen = useMediaQuery((theme) => theme.breakpoints.up(599));

  const [repoList, setRepoList] = useState([]);
  const [followersList, setFollowersList] = useState([]);
  const [followingList, setFollowingList] = useState([]);
  const [forkedRepos, setForkedRepos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const defaultSearchQuery = "mrnikhilsingh";
    const query = searchQuery || defaultSearchQuery;

    const fetchRepos = axios.get(`https://api.github.com/users/${query}/repos`);
    const fetchFollowers = axios.get(
      `https://api.github.com/users/${query}/followers`,
    );
    const fetchFollowing = axios.get(
      `https://api.github.com/users/${query}/following`,
    );

    Promise.all([fetchRepos, fetchFollowers, fetchFollowing])
      .then(([repoResponse, followersResponse, followingResponse]) => {
        setRepoList(repoResponse.data);
        setFollowersList(followersResponse.data);
        setFollowingList(followingResponse.data);

        const forks = repoResponse.data.filter((repo) => repo.fork);
        setForkedRepos(forks);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load data. Please try again later.");
      });
  }, [searchQuery]);

  // useEffect(() => {
  //   axios
  //     .get("https://api.github.com/users/codewithsadee/repos")
  //     .then(({ data }) => {
  //       setRepoList(data);

  //       const forkedRepos = data.filter((repo) => repo.fork);
  //       setForkedRepos(forkedRepos);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  // useEffect(() => {
  //   const defaultSearchQuery = "mrnikhilsingh";
  //   const url = `https://api.github.com/users/${searchQuery || defaultSearchQuery}/repos`;
  //   console.log("repo url:", url);

  //   axios
  //     .get(url)
  //     .then(({ data }) => {
  //       setRepoList(data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [searchQuery]);

  // useEffect(() => {
  //   const defaultSearchQuery = "mrnikhilsingh";
  //   const url = `https://api.github.com/users/${searchQuery || defaultSearchQuery}/followers`;
  //   console.log("followers url:", url);

  //   axios
  //     .get(url)
  //     .then(({ data }) => {
  //       setFollowersList(data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [searchQuery]);

  // useEffect(() => {
  //   const defaultSearchQuery = "mrnikhilsingh";
  //   const url = `https://api.github.com/users/${searchQuery || defaultSearchQuery}/following`;
  //   console.log("following url:", url);

  //   axios
  //     .get(url)
  //     .then(({ data }) => {
  //       setFollowingList(data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [searchQuery]);

  return (
    <section id="feed-section" className="flex-1">
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant={isWideScreen ? "fullWidth" : "scrollable"}
            aria-label="scrollable auto tabs example"
            sx={{ width: "100%", justifyContent: "space-between" }}
          >
            <Tab label="Repositories" {...a11yProps(0)} />
            <Tab label="Forked" {...a11yProps(1)} />
            <Tab label="Followers" {...a11yProps(2)} />
            <Tab label="Followings" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          {repoList.length != 0 ? (
            <div id="public-repo" className="grid grid-cols-autoFill gap-4">
              {repoList.map((repo) => (
                <RepoCard key={repo.id} repo={repo} />
              ))}
            </div>
          ) : (
            <ErrorPage errName={"public repo"} />
          )}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          {forkedRepos.length != 0 ? (
            <div id="forked-repo" className="grid grid-cols-autoFill gap-4">
              {forkedRepos.map((repo) => (
                <RepoCard key={repo.id} repo={repo} />
              ))}
            </div>
          ) : (
            <ErrorPage errName={"fork repo"} />
          )}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          {followersList.length != 0 ? (
            <div id="followers-card" className="grid grid-cols-autoFill gap-4">
              {followersList.map((followers) => (
                <FollowerCard key={followers.id} followers={followers} />
              ))}
            </div>
          ) : (
            <ErrorPage errName={"followers"} />
          )}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          {followingList.length != 0 ? (
            <div id="following-card" className="grid grid-cols-autoFill gap-4">
              {followingList.map((follows) => (
                <FollowCard key={follows.id} follows={follows} />
              ))}
            </div>
          ) : (
            <ErrorPage errName={"followings"} />
          )}
        </CustomTabPanel>
      </Box>
    </section>
  );
}
