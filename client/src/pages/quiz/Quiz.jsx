import React, { useState } from "react";
import useGetQuiz from "../../hooks/useGetQuiz";

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const quizId = "66ddeb506a3ee0943dfff4f4";
  const { loading, quiz } = useGetQuiz(quizId);

  const questions = quiz?.quiz?.questions || [];
  const title = quiz?.quiz?.title || "Quiz";

  // Update the function to get the correct answer value
  const handleAnswerClick = (isCorrect, index) => {
    console.log(`Selected option isCorrect: ${isCorrect}`); // Log the isCorrect value
    setSelectedAnswerIndex(index);
    setIsAnswered(true);
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const goToNextQuestion = () => {
    setSelectedAnswerIndex(null);
    setIsAnswered(false);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const restartQuiz = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setSelectedAnswerIndex(null);
    setIsAnswered(false);
    setShowResults(false);
  };

  if (loading) {
    return (
      <div>
        <div>Loading questions...</div>
        <span className="loading loading-dots loading-md ml-16"></span>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
        <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
          <h1>{title}</h1>
          <p>
            Your score: {score}/{questions.length}
          </p>
          <div className=" flex justify-between items-center p-3">
            <button className="btn btn-secondary" onClick={restartQuiz}>
              Play Again
            </button>
            <button className="btn btn-accent">Submit</button>
          </div>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
        <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
          <h1 className="text-center">{title}</h1>
          <div className="text-center">No questions available</div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1>{title}</h1>
        <div className="question">
          <h2>
            {currentQuestionIndex + 1}. {currentQuestion.questionText}
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-2 w-full">
          {currentQuestion.options?.map((option, index) => {
            const isCorrect = option.isCorrect;
            const isSelected = selectedAnswerIndex === index;

            // Determine button color based on state
            let buttonColor = "bg-blue-500"; // default color
            if (isAnswered) {
              if (isCorrect) {
                buttonColor = "bg-green-500"; // correct answer
              } else if (isSelected) {
                buttonColor = "bg-red-500"; // wrong answer
              }
            }

            return (
              <button
                key={index}
                className={`btn p-4 ${buttonColor} text-white font-bold rounded-lg hover:shadow-lg transition duration-300`}
                onClick={() =>
                  !isAnswered && handleAnswerClick(isCorrect, index)
                }
                // disabled={isAnswered}
              >
                {option.text}
              </button>
            );
          })}
        </div>
        {isAnswered && (
          <div className="flex justify-center items-center">
            <button
              className="btn mt-4 bg-purple-500 text-white p-2 rounded-lg"
              onClick={goToNextQuestion}
            >
              {currentQuestionIndex < questions.length - 1
                ? "Next Question"
                : "See Results"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
