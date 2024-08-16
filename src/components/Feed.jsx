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
import { RepoCardSkeleton } from "./RepoCardSkeleton";
import { ProfileCardSkeleton } from "./ProfileCardSkeleton";
import { FollowCardSkeleton } from "./FollowCardSkeleton";

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

  const [loadingRepos, setLoadingRepos] = useState(true);
  const [loadingFollowers, setLoadingFollowers] = useState(true);
  const [loadingFollowings, setLoadingFollowings] = useState(true);

  const [isFollowersLoaded, setIsFollowersLoaded] = useState(false);
  const [isFollowingLoaded, setIsFollowingLoaded] = useState(false);

  const defaultSearchQuery = "mrnikhilsingh";
  const query = searchQuery || defaultSearchQuery;
  //   const fetchRepos = axios.get(`https://api.github.com/users/${query}/repos`);
  //   const fetchFollowers = axios.get(
  //     `https://api.github.com/users/${query}/followers`,
  //   );
  //   const fetchFollowing = axios.get(
  //     `https://api.github.com/users/${query}/following`,
  //   );

  //   Promise.all([fetchRepos, fetchFollowers, fetchFollowing])
  //     .then(([repoResponse, followersResponse, followingResponse]) => {
  //       setRepoList(repoResponse.data);
  //       setFollowersList(followersResponse.data);
  //       setFollowingList(followingResponse.data);

  //       const forks = repoResponse.data.filter((repo) => repo.fork);
  //       setForkedRepos(forks);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       setError("Failed to load data. Please try again later.");
  //     });
  // }, [searchQuery]);

  useEffect(() => {
    setIsFollowersLoaded(false);
    setIsFollowingLoaded(false);
    setFollowersList([]);
    setFollowingList([]);
    const fetchRepos = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/users/${query}/repos`,
        );
        const data = response.data;

        setRepoList(data);

        // Filter out the forked repositories
        const forks = data.filter((repo) => repo.fork);
        setForkedRepos(forks);
      } catch (err) {
        console.error(err);
        setError("Failed to load repositories. Please try again later.");
      } finally {
        setLoadingRepos(false);
      }
    };

    fetchRepos();
  }, [searchQuery]);

  useEffect(() => {
    if (value === 2 && !isFollowersLoaded) {
      axios
        .get(`https://api.github.com/users/${query}/followers`)
        .then(({ data }) => setFollowersList(data))
        .catch((err) => {
          console.error(err);
          setError("Failed to load followers. Please try again later.");
        })
        .finally(() => {
          setLoadingFollowers(false);
        });

      setIsFollowersLoaded(true);
    }

    if (value === 3 && !isFollowingLoaded) {
      axios
        .get(`https://api.github.com/users/${query}/following`)
        .then(({ data }) => setFollowingList(data))
        .catch((err) => {
          console.error(err);
          setError("Failed to load followings. Please try again later.");
        })
        .finally(() => {
          setLoadingFollowings(false);
        });

      setIsFollowingLoaded(true);
    }
  }, [value, searchQuery]);

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
              <RepoCardSkeleton />
              {repoList.map((repo) => (
                <RepoCard key={repo.id} repo={repo} />
              ))}
            </div>
          ) : (
            <RepoCardSkeleton />
            // <ErrorPage errName={"public repo"} />
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
              <FollowCardSkeleton />
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
