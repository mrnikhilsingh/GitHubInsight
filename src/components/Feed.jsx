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
import { FollowCardSkeleton } from "./FollowCardSkeleton";
import Pagination from "@mui/material/Pagination";
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

  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [allReposFetched, setAllReposFetched] = useState(false);

  const [currentRepos, setCurrentRepos] = useState([]);
  const [visitedPages, setVisitedPages] = useState(new Set()); // Track visited pages

  const defaultSearchQuery = "mrnikhilsingh";
  const query = searchQuery || defaultSearchQuery;

  console.log(repoList);

  // Function to fetch repos
  async function fetchRepos(page = 1) {
    console.log("fetching repos");

    try {
      const response = await axios.get(
        `https://api.github.com/users/${query}/repos`,
        {
          params: { per_page: 40, page },
        },
      );
      const data = response.data;
      setRepoList((prevRepos) => [...prevRepos, ...data]);
      setCurrentRepos(data);

      // Filter out the forked repositories
      const forks = data.filter((repo) => repo.fork);
      setForkedRepos((prevForks) => [...prevForks, ...forks]);

      // Mark the page as visited
      setVisitedPages((prev) => new Set(prev).add(page));

      if (data.length < 40) {
        setAllReposFetched(true);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load repositories. Please try again later.");
    } finally {
      setLoadingRepos(false);
    }
  }

  // Handle function when page is change
  const handlePageChange = (event, page) => {
    setCurrentPage(page);

    // Only fetch more repos if not all repos are fetched
    if (!allReposFetched && page > currentPage && !visitedPages.has(page)) {
      setLoadingRepos(true);
      fetchRepos(page);
    }

    const lastCardIndex = page * 40;
    const firstCardIndex = lastCardIndex - 40;
    setCurrentRepos(repoList.slice(firstCardIndex, lastCardIndex));
  };

  useEffect(() => {
    // reset all state
    setRepoList([]);
    setForkedRepos([]);
    setFollowersList([]);
    setFollowingList([]);
    setLoadingRepos(true);
    setLoadingFollowers(true);
    setLoadingFollowings(true);
    setIsFollowersLoaded(false);
    setIsFollowingLoaded(false);
    setCurrentPage(1);
    setTotalPages(1);
    setAllReposFetched(false);
    setCurrentRepos([]);
    setVisitedPages(new Set());

    // Function to calculate totalRepos Count
    async function fetchTotalRepos() {
      try {
        const response = await axios.get(
          `https://api.github.com/users/${query}/repos`,
          {
            params: { per_page: 40 },
          },
        );

        // Check if the 'Link' header is present
        const linkHeader = response.headers.link;
        if (linkHeader) {
          // Parse the 'Link' header
          const links = linkHeader.split(",").reduce((acc, link) => {
            const [urlPart, relPart] = link.split(";");
            const url = urlPart.trim().slice(1, -1);
            const rel = relPart.trim().slice(5, -1);
            acc[rel] = url;
            return acc;
          }, {});

          // Determine total pages from 'last' link
          if (links.last) {
            const lastPageUrl = new URL(links.last);
            const totalPages = lastPageUrl.searchParams.get("page");

            setTotalPages(Number(totalPages));
          }
        } else {
          console.log("No pagination, all items received:");
        }
      } catch (error) {
        console.error("Error fetching repos:", error);
      }
    }

    fetchRepos();
    fetchTotalRepos();
  }, [searchQuery]);

  // useEffect(() => {
  //   if (value === 2 && !isFollowersLoaded) {
  //     axios
  //       .get(`https://api.github.com/users/${query}/followers`)
  //       .then(({ data }) => setFollowersList(data))
  //       .catch((err) => {
  //         console.error(err);
  //         setError("Failed to load followers. Please try again later.");
  //       })
  //       .finally(() => {
  //         setLoadingFollowers(false);
  //       });

  //     setIsFollowersLoaded(true);
  //   }

  //   if (value === 3 && !isFollowingLoaded) {
  //     axios
  //       .get(`https://api.github.com/users/${query}/following`)
  //       .then(({ data }) => setFollowingList(data))
  //       .catch((err) => {
  //         console.error(err);
  //         setError("Failed to load followings. Please try again later.");
  //       })
  //       .finally(() => {
  //         setLoadingFollowings(false);
  //       });

  //     setIsFollowingLoaded(true);
  //   }
  // }, [value]);

  useEffect(() => {
    const fetchFollowersAndFollowing = async () => {
      try {
        if (value === 2 && !isFollowersLoaded) {
          // setLoadingFollowers(true);
          const response = await axios.get(
            `https://api.github.com/users/${query}/followers`,
          );
          setFollowersList(response.data);
          console.log("follower", response.data);

          setIsFollowersLoaded(true);
        }

        if (value === 3 && !isFollowingLoaded) {
          // setLoadingFollowings(true);
          const response = await axios.get(
            `https://api.github.com/users/${query}/following`,
          );
          setFollowingList(response.data);
          console.log("following", response.data);

          setIsFollowingLoaded(true);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load data. Please try again later.");
      } finally {
        if (value === 2) setLoadingFollowers(false);
        if (value === 3) setLoadingFollowings(false);
      }
    };

    fetchFollowersAndFollowing();
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
          {loadingRepos ? (
            <div id="public-repo" className="grid grid-cols-autoFill gap-4">
              <RepoCardSkeleton />
            </div>
          ) : repoList.length != 0 ? (
            <div id="public-repo" className="grid grid-cols-autoFill gap-4">
              {currentRepos.map((repo, index) => (
                <RepoCard key={index} repo={repo} />
              ))}
            </div>
          ) : (
            <ErrorPage errName="public repositories" />
          )}
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "0.6rem",
            }}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          {loadingRepos ? (
            <div id="public-repo" className="grid grid-cols-autoFill gap-4">
              <RepoCardSkeleton />
            </div>
          ) : forkedRepos.length != 0 ? (
            <div id="forked-repo" className="grid grid-cols-autoFill gap-4">
              {forkedRepos.map((repo) => (
                <RepoCard key={repo.id} repo={repo} />
              ))}
            </div>
          ) : (
            <ErrorPage errName="fork repositories" />
          )}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          {loadingFollowers ? (
            <div id="followers-card" className="grid grid-cols-autoFill gap-4">
              <FollowCardSkeleton />
            </div>
          ) : followersList.length != 0 ? (
            <div id="followers-card" className="grid grid-cols-autoFill gap-4">
              {followersList.map((followers) => (
                <FollowerCard key={followers.id} followers={followers} />
              ))}
            </div>
          ) : (
            <ErrorPage errName="followers" />
          )}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          {loadingFollowings ? (
            <div id="following-card" className="grid grid-cols-autoFill gap-4">
              <FollowCardSkeleton />
            </div>
          ) : followingList.length != 0 ? (
            <div id="following-card" className="grid grid-cols-autoFill gap-4">
              {followingList.map((follows) => (
                <FollowCard key={follows.id} follows={follows} />
              ))}
            </div>
          ) : (
            <ErrorPage errName="followings" />
          )}
        </CustomTabPanel>
      </Box>
    </section>
  );
}
