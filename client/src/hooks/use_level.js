import { useEffect, useState } from "react";

const useFetchQuizzesByCategory = (category) => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/v1/quiz/category?category=${category}`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch quizzes: ${response.statusText}`);
        }
        const data = await response.json();
        setQuizzes(data.quizzes || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [category]);

  return { quizzes, loading, error };
};

const QuizzesByCategory = ({ category }) => {
  const { quizzes, loading, error } = useFetchQuizzesByCategory(category);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Quizzes in {category} category:</h2>
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz._id}>{quiz.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default QuizzesByCategory;
