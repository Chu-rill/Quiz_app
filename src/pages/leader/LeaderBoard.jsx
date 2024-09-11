import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import useLeader from "../../hooks/useLeader";
import fetchUserDetails from "../../utils/fetchUserDetails";

const LeaderBoard = () => {
  const { leaderboard, loading } = useLeader();
  const [filter, setFilter] = useState("All");
  const [userNames, setUserNames] = useState({});

  const leader = leaderboard?.score || [];

  useEffect(() => {
    const fetchUserNames = async () => {
      try {
        const userData = await fetchUserDetails();
        const data = userData.data;

        const names = {};
        leader.forEach((entry) => {
          const user = data.find((user) => user._id === entry.user);
          if (user) {
            names[entry.user] = user.username;
          } else {
            console.log(`User with ID ${entry.user} not found`);
          }
        });

        setUserNames(names);
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };

    if (leader.length > 0) {
      fetchUserNames();
    }
  }, [leader]);

  // Extract unique categories from leaderboard data using useMemo for optimization
  const categories = useMemo(() => {
    const uniqueCategories = new Set();
    leader.forEach((entry) => {
      entry.categoryScores.forEach((score) => {
        uniqueCategories.add(score.category);
      });
    });
    return ["All", ...Array.from(uniqueCategories)]; // Add "All" option
  }, [leader]);

  // Filter leaderboard data based on selected category
  const filteredData = useMemo(() => {
    const filtered =
      filter === "All"
        ? leader
        : leader.filter((entry) =>
            entry.categoryScores.some((score) => score.category === filter)
          );

    // Sort by generalHighScore in descending order
    return filtered.sort((a, b) => b.generalHighScore - a.generalHighScore);
  }, [filter, leader]);

  // Handle loading state
  if (loading) {
    return (
      <div>
        <h1 className="text-center">Loading leaderboard...</h1>
        <span className="loading loading-dots loading-md"></span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="container overflow-scroll h-[500px] w-full p-6 rounded-3xl shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <Link to="/">
          <p className="underline text-purple-500">Back</p>
        </Link>
        <h1 className="text-center text-2xl mb-4">LeaderBoard</h1>

        {/* Dropdown for category filter */}
        <div className="flex justify-center mb-4">
          <select
            className="select select-bordered w-full"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Leaderboard Section */}
        <div className="grid grid-cols-1 gap-4">
          {filteredData.length > 0 ? (
            filteredData.map((entry) => (
              <div
                key={entry._id}
                className="flex flex-col p-4 border rounded-lg bg-base-100 shadow-xl"
              >
                <div className="flex items-center justify-between space-x-4">
                  <p className="font-bold">
                    {userNames[entry.user] || "Unknown User"}
                  </p>
                  <p className="font-semibold">
                    {entry.generalHighScore} Points
                  </p>
                </div>

                {/* Category and Score Section */}
                <div className="flex flex-col space-y-2 mt-4">
                  {entry.categoryScores.map((score) => (
                    <div
                      key={score._id}
                      className="flex justify-between items-center"
                    >
                      <p className="text-sm text-gray-600">
                        Category: {score.category}
                      </p>
                      <p className="font-semibold">{score.highScore} Points</p>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-red-500">No data available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
