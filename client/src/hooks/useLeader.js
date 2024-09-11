import { useState, useEffect } from "react";
import { getToken } from "../utils/jwt";
import { api } from "../utils/api";
const useLeader = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = getToken();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${api}/api/v1/leaderboard/quizscore`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch quiz");
        }

        setLeaderboard(data);
      } catch (err) {
        console.log("An error occurred while fetching leaderboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return { leaderboard, loading };
};

export default useLeader;
