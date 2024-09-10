// import React from "react";
// import { Link } from "react-router-dom";

// const LeaderBoard = () => {
//   return (
//     <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
//       <div className="container overflow-scroll  h-[500px] w-full p-6 rounded-3xl shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
//         <Link to="/">
//           <p className=" underline text-purple-500">Back</p>
//         </Link>
//         <h1 className=" text-center text-2xl">LeaderBoard </h1>
//       </div>
//     </div>
//   );
// };

// export default LeaderBoard;
import React, { useState } from "react";
import { Link } from "react-router-dom";

const LeaderBoard = () => {
  // Sample data for leaderboard
  const leaderboardData = [
    {
      id: 1,
      name: "Alice",
      points: 100,
      category: "Math",
      profilePic: "https://via.placeholder.com/40",
    },
    {
      id: 2,
      name: "Bob",
      points: 90,
      category: "Science",
      profilePic: "https://via.placeholder.com/40",
    },
    {
      id: 3,
      name: "Charlie",
      points: 85,
      category: "Math",
      profilePic: "https://via.placeholder.com/40",
    },
    {
      id: 4,
      name: "David",
      points: 75,
      category: "Science",
      profilePic: "https://via.placeholder.com/40",
    },
  ];

  const [filter, setFilter] = useState("All");

  // Filter leaderboard data based on selected category
  const filteredData =
    filter === "All"
      ? leaderboardData
      : leaderboardData.filter((entry) => entry.category === filter);

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="container overflow-scroll h-[500px] w-full p-6 rounded-3xl shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <Link to="/">
          <p className="underline text-purple-500">Back</p>
        </Link>
        <h1 className="text-center text-2xl mb-4">LeaderBoard</h1>

        {/* Filter buttons */}
        <div className="flex justify-center mb-4 space-x-4">
          <button
            className={`btn ${filter === "All" ? "btn-active" : ""}`}
            onClick={() => setFilter("All")}
          >
            All
          </button>
          <button
            className={`btn ${filter === "Math" ? "btn-active" : ""}`}
            onClick={() => setFilter("Math")}
          >
            Math
          </button>
          <button
            className={`btn ${filter === "Science" ? "btn-active" : ""}`}
            onClick={() => setFilter("Science")}
          >
            Science
          </button>
        </div>

        {/* Leaderboard Section */}
        <div className="grid grid-cols-1 gap-4">
          {filteredData.length > 0 ? (
            filteredData.map((entry, index) => (
              <div
                key={entry.id}
                className="flex items-center justify-between p-4 border border-gray-300 rounded-lg  hover:bg-gray-200 transition-colors duration-200"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={entry.profilePic}
                    alt={`${entry.name}'s profile`}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-bold">{entry.name}</p>
                    <p className="text-sm text-gray-600">
                      Category: {entry.category}
                    </p>
                  </div>
                </div>
                <p className="font-semibold">{entry.points} Points</p>
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
