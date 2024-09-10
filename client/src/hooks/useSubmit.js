import { useState } from "react";
import { api } from "../utils/api";
import { getToken } from "../utils/jwt";
import { toast } from "react-hot-toast";
const useSubmit = () => {
  const [loading, setLoading] = useState(false);
  const token = getToken();

  const submitScore = async (score, category, quizId) => {
    setLoading(true);
    // Log the payload to check what is being sent
    console.log({
      score,
      category,
      quizId,
    });
    try {
      const response = await fetch(`${api}/api/v1/leaderboard/submitquiz`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Bearer token
        },
        body: JSON.stringify({
          score,
          category,
          quizId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Response data:", data); // Log the response for debugging
        throw new Error(data.message || "Failed to submit quiz score");
      }
      toast.success("Submit Successful");
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { loading, submitScore };
};

export default useSubmit;
