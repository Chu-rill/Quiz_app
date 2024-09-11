import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { getToken } from "../utils/jwt";
import { api } from "../utils/api";

export default function useGetQuizzes() {
  const [loading, setLoading] = useState(false);
  const [quizzes, setQuizzes] = useState([]);
  const token = getToken();
  // console.log(token);
  useEffect(() => {
    const getQuizzes = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${api}/api/v1/quiz/getquizzes`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP Error: ${res.status} - ${res.statusText}`);
        }

        const data = await res.json();
        // console.log("Data from API:", data);

        if (data.error) {
          throw new Error(data.error);
        }

        setQuizzes(data);
      } catch (error) {
        console.log(error.message);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getQuizzes();
  }, [token]);

  return { loading, quizzes };
}
