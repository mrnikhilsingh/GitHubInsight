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
import { ErrorPage } from "./NoResults";
import { RepoCardSkeleton } from "./RepoCardSkeleton";
import { FollowCardSkeleton } from "./FollowCardSkeleton";
import Pagination from "@mui/material/Pagination";
import { Loader } from "./Loader";
import { useParams } from "react-router-dom";
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

export default function Feed({ width, isDark }) {
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

  const [totalPages, setTotalPages] = useState(1); // for Repo
  const [currentPage, setCurrentPage] = useState(1); // for Repo
  const [allReposFetched, setAllReposFetched] = useState(false); // for Repo

  const [currentRepos, setCurrentRepos] = useState([]); // for Repo
  const [visitedPages, setVisitedPages] = useState(new Set()); // Track visited pages

  const [followerPage, setFollowerPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const { username } = useParams();
  const defaultSearchQuery = "mrnikhilsingh";
  const query = username || defaultSearchQuery;

  // Function to fetch repos
  async function fetchRepos(page = 1) {
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

  // Handle function when page is change for Repo Section
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
    setValue(0);
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
    setFollowerPage(1);

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
        }
      } catch (error) {
        console.error("Error fetching repos:", error);
      }
    }

    fetchRepos();
    fetchTotalRepos();
  }, [username]);

  const handleScroll = () => {
    console.log("scrolling");
    const innerHeight = window.innerHeight;
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;

    if (scrollTop + innerHeight + 1 >= scrollHeight) {
      console.log("reached bottom");
      setFollowerPage((prev) => prev + 1);
      setLoading(true);
      setIsFollowersLoaded(false);
    }
  };

  async function fetchFollowers(page) {
    try {
      const response = await axios.get(
        `https://api.github.com/users/${query}/followers?per_page=30&page=${page}`,
      );
      setFollowersList((prev) => [...prev, ...response.data]);
      setIsFollowersLoaded(true);
      // Stop loading if the data is less than the requested amount (end of data)
      // if (response.data.length < 30) {
      //   setIsFollowersLoaded(true);
      // }
    } catch (err) {
      console.error(err);
      setError("Failed to load data. Please try again later.");
    } finally {
      setLoadingFollowers(false);
      setLoading(false);
    }
  }

  async function fetchFollowings() {
    try {
      const response = await axios.get(
        `https://api.github.com/users/${query}/following?per_page=40`,
      );
      setFollowingList(response.data);
      setIsFollowingLoaded(true);
    } catch (err) {
      console.error(err);
      setError("Failed to load data. Please try again later.");
    } finally {
      setLoadingFollowings(false);
    }
  }

  useEffect(() => {
    if (value === 2 && !isFollowersLoaded) {
      fetchFollowers(followerPage);
    }
    if (value === 3 && !isFollowingLoaded) {
      fetchFollowings();
    }
  }, [value, followerPage]);

  useEffect(() => {
    if (value === 2) {
      window.addEventListener("scroll", handleScroll);
    }
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <section id="feed-section" className="flex-1">
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant={isWideScreen ? "fullWidth" : "scrollable"}
            aria-label="scrollable auto tabs example"
            sx={{
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Tab
              sx={isDark ? { color: "white" } : { color: "default" }}
              label="Repositories"
              {...a11yProps(0)}
            />
            <Tab
              sx={isDark ? { color: "white" } : { color: "default" }}
              label="Forked"
              {...a11yProps(1)}
            />
            <Tab
              sx={isDark ? { color: "white" } : { color: "default" }}
              label="Followers"
              {...a11yProps(2)}
            />
            <Tab
              sx={isDark ? { color: "white" } : { color: "default" }}
              label="Followings"
              {...a11yProps(3)}
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          {loadingRepos ? (
            <div id="public-repo" className="grid grid-cols-autoFill gap-4">
              <RepoCardSkeleton />
            </div>
          ) : repoList.length ? (
            <div id="public-repo" className="grid grid-cols-autoFill gap-4">
              {currentRepos.map((repo, index) => (
                <RepoCard key={index} repo={repo} />
              ))}
            </div>
          ) : !error ? (
            <ErrorPage name="public repositories" />
          ) : (
            error
          )}
          {!(repoList.length < 40) && (
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "0.6rem",
                "& .MuiPaginationItem-root": {
                  color: isDark ? "white" : "", // or any other color you want
                },
              }}
            />
          )}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          {forkedRepos.length ? (
            <div id="forked-repo" className="grid grid-cols-autoFill gap-4">
              {forkedRepos.map((repo) => (
                <RepoCard key={repo.id} repo={repo} />
              ))}
            </div>
          ) : !error ? (
            <ErrorPage name="fork repositories" />
          ) : (
            error
          )}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          {loadingFollowers ? (
            <div id="followers-card" className="grid grid-cols-autoFill gap-4">
              <FollowCardSkeleton />
            </div>
          ) : followersList.length ? (
            <div id="followers-card" className="grid grid-cols-autoFill gap-4">
              {followersList.map((followers) => (
                <FollowerCard key={followers.id} followers={followers} />
              ))}
            </div>
          ) : !error ? (
            <ErrorPage name="followers" />
          ) : (
            error
          )}
          {loading && <Loader />}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          {loadingFollowings ? (
            <div id="following-card" className="grid grid-cols-autoFill gap-4">
              <FollowCardSkeleton />
            </div>
          ) : followingList.length ? (
            <div id="following-card" className="grid grid-cols-autoFill gap-4">
              {followingList.map((follows) => (
                <FollowCard key={follows.id} follows={follows} />
              ))}
            </div>
          ) : !error ? (
            <ErrorPage name="followings" />
          ) : (
            error
          )}
        </CustomTabPanel>
      </Box>
    </section>
  );
}
