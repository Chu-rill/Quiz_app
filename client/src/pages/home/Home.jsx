import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import useGetQuizzes from "../../hooks/useGetQuizzes";
import { useAuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { loading, quizzes } = useGetQuizzes();
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const [selectedQuizzes, setSelectedQuizzes] = useState([]);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterLevel, setFilterLevel] = useState("");
  const { authUser } = useAuthContext();
  const navigate = useNavigate(); // Initialize navigate

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

  // Handle quiz selection
  const handleSelectQuiz = (quizId) => {
    setSelectedQuizzes((prev) =>
      prev.includes(quizId)
        ? prev.filter((id) => id !== quizId)
        : [...prev, quizId]
    );
  };

  // Handle starting quiz and navigation
  const handleStartQuiz = () => {
    // Pass the selected quiz ID(s) via state to the Quiz page
    if (selectedQuizzes.length > 0) {
      navigate("/quiz", { state: { selectedQuizzes } });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="container overflow-scroll  h-[500px] w-full p-6 rounded-3xl shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Select a Quiz to Start
        </h1>
        <div className=" flex justify-between items-center">
          <Link
            to="/leader"
            className=" underline text-xl mt-2 inline-block mb-2 ml-3 hover:text-blue-600 "
          >
            View Leader-Board
          </Link>
          <Link to="/leader">
            <button className="btn btn-accent">Create Quiz</button>
          </Link>
        </div>

        {loading ? (
          <div>
            <p>Loading quizzes...</p>
            <div className="loading loading-dots loading-lg">Loading...</div>
          </div>
        ) : (
          <div>
            {/* Dropdown Filters */}
            <div className="mb-4 flex space-x-4">
              {/* Category Filter Dropdown */}
              <div>
                <label className="block font-bold mb-2">
                  Filter by Category
                </label>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="select select-bordered w-full"
                >
                  <option value="">All Categories</option>
                  {uniqueCategories.map((category, idx) => (
                    <option key={idx} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Level Filter Dropdown */}
              <div>
                <label className="block font-bold mb-2">Filter by Level</label>
                <select
                  value={filterLevel}
                  onChange={(e) => setFilterLevel(e.target.value)}
                  className="select select-bordered w-full"
                >
                  <option value="">All Levels</option>
                  {uniqueLevels.map((level, idx) => (
                    <option key={idx} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Quiz Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredQuizzes.length > 0 ? (
                filteredQuizzes.map((quiz) => (
                  <div
                    key={quiz._id}
                    className={`card bg-base-100 shadow-xl p-4 ${
                      selectedQuizzes.includes(quiz._id)
                        ? "border-2 border-blue-500"
                        : ""
                    }`}
                    onClick={() => handleSelectQuiz(quiz._id)}
                  >
                    <h2 className="card-title text-lg font-bold mb-2">
                      {quiz.title}
                    </h2>
                    <p className="mb-2">
                      <strong>Category:</strong> {quiz.category}
                    </p>
                    <p className="mb-2">
                      <strong>Level:</strong> {quiz.level}
                    </p>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">
                        {quiz.questions.length} questions
                      </span>
                      <input
                        type="checkbox"
                        className="checkbox"
                        checked={selectedQuizzes.includes(quiz._id)}
                        readOnly
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full">
                  <p>No quizzes found</p>
                </div>
              )}
            </div>

            {/* Start Quiz Button */}
            <button
              type="submit"
              className="btn btn-primary w-full mt-6"
              disabled={selectedQuizzes.length === 0}
              onClick={handleStartQuiz} // Start the quiz when clicked
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
