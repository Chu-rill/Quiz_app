import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { getToken } from "../utils/jwt";
import { api } from "../utils/api";

const useGetQuiz = (quizId) => {
  const [loading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState([]);
  const token = getToken();

  const getQuiz = async () => {
    if (!quizId) return; // Ensure quizId is provided
    setLoading(true);
    try {
      const res = await fetch(`${api}/api/v1/quiz/getsinglequiz/${quizId}`, {
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
      console.log("data:", JSON.stringify(data, null, 2));
      setQuiz(data); // Set quiz data
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getQuiz(); // Call getQuiz when quizId or token changes
  }, [quizId, token]);

  return { loading, quiz }; // Return getQuiz
};

export default useGetQuiz;
