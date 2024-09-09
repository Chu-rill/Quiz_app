import React, { useState, useEffect } from "react";
import useGetQuizzes from "../../hooks/useGetQuizzes";

const Home = () => {
  const { loading, quizzes } = useGetQuizzes();
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const [selectedQuizzes, setSelectedQuizzes] = useState([]);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterLevel, setFilterLevel] = useState("");

  let quizArrays = quizzes.quizzes || [];

  const uniqueCategories = quizArrays
    .map((quiz) => quiz.category)
    .filter((category, index, self) => self.indexOf(category) === index);

  const uniqueLevels = quizArrays
    .map((quiz) => quiz.level)
    .filter((level, index, self) => self.indexOf(level) === index);

  // Update filtered quizzes whenever filters change
  useEffect(() => {
    let updatedQuizzes = quizArrays;

    if (filterCategory) {
      updatedQuizzes = updatedQuizzes.filter(
        (quiz) => quiz.category === filterCategory
      );
    }

    if (filterLevel) {
      updatedQuizzes = updatedQuizzes.filter(
        (quiz) => quiz.level === filterLevel
      );
    }

    setFilteredQuizzes(updatedQuizzes);
  }, [quizzes, filterCategory, filterLevel]);

  // Filter by category
  const handleFilterCategory = (category) => {
    setFilterCategory(category);
  };

  // Filter by level
  const handleFilterLevel = (level) => {
    setFilterLevel(level);
  };

  // Handle quiz selection
  const handleSelectQuiz = (quizId) => {
    setSelectedQuizzes((prev) =>
      prev.includes(quizId)
        ? prev.filter((id) => id !== quizId)
        : [...prev, quizId]
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-[500px] mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Select a Quiz to start
        </h1>

        {loading ? (
          <div>
            <p>Loading quizzes...</p>
            <div className="loading loading-dots loading-lg">Loading...</div>
          </div>
        ) : (
          <div>
            {/* Category Filter */}
            <div className="mb-4">
              <h3 className="font-bold mb-2">Filter by Category</h3>
              {uniqueCategories.map((category, idx) => (
                <button
                  key={idx}
                  className={`btn btn-primary w-full mb-2 ${
                    filterCategory === category ? "active" : ""
                  }`}
                  onClick={() => handleFilterCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Level Filter */}
            <div className="mb-4">
              <h3 className="font-bold mb-2">Filter by Level</h3>
              {uniqueLevels.map((level, idx) => (
                <button
                  key={idx}
                  className={`btn btn-secondary w-full mb-2 ${
                    filterLevel === level ? "active" : ""
                  }`}
                  onClick={() => handleFilterLevel(level)}
                >
                  {level}
                </button>
              ))}
            </div>

            {/* Quiz List */}
            <ul className="quiz-list mb-4">
              {filteredQuizzes.length > 0 ? (
                filteredQuizzes.map((quiz) => (
                  <li key={quiz._id} className="mb-2">
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        className="checkbox"
                        checked={selectedQuizzes.includes(quiz._id)}
                        onChange={() => handleSelectQuiz(quiz._id)}
                      />
                      <span className="text-lg">{quiz.title}</span>
                    </label>
                  </li>
                ))
              ) : (
                <li>No quizzes found</li>
              )}
            </ul>

            {/* Start Quiz Button */}
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={selectedQuizzes.length === 0}
            >
              Start Selected Quizzes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
