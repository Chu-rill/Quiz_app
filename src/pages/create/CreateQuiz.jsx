import React from "react";
import useCreateQuiz from "../../hooks/useCreateQuiz";
import { useNavigate } from "react-router-dom";
const CreateQuiz = () => {
  const navigate = useNavigate();
  const {
    quizData,
    error,
    loading,
    handleInputChange,
    handleQuestionChange,
    handleOptionChange,
    handleCorrectOptionChange,
    addQuestion,
    submitQuiz,
  } = useCreateQuiz(navigate);

  return (
    <div className=" flex flex-col items-center justify-center min-w-96 mx-auto ">
      <div className=" container overflow-scroll  h-[500px] w-full p-6 rounded-3xl shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className=" text-2xl text-center underline mb-2">
          Create a New Quiz
        </h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className=" mb-3">
            <label>
              Title:
              <input
                type="text"
                name="title"
                className=" w-full input input-bordered h-10 "
                value={quizData.title}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className=" mb-3">
            <label>
              Category:
              <input
                type="text"
                name="category"
                className=" w-full input input-bordered h-10 "
                value={quizData.category}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className=" mb-3">
            <label>
              Level:
              <select
                name="level"
                className="w-full select select-bordered mb-5"
                value={quizData.level}
                onChange={handleInputChange}
              >
                <option value="" disabled>
                  Select a Level
                </option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
                <option value="Advanced">Advanced</option>
              </select>
            </label>
          </div>

          {quizData.questions.map((question, qIndex) => (
            <div key={qIndex} className=" mb-5">
              <h2 className=" mb-2">Question {qIndex + 1}</h2>
              <label>
                <span className=" mb-10"> Question Text:</span>
                <input
                  type="text"
                  name="questionText"
                  className="w-full input input-bordered"
                  value={question.questionText}
                  onChange={(e) => handleQuestionChange(qIndex, e)}
                />
              </label>
              {question.options.map((option, oIndex) => (
                <div key={oIndex} className=" mt-2">
                  <label>
                    Option {oIndex + 1}:
                    <div className=" w-full">
                      <input
                        type="text"
                        name="text"
                        className=" w-[350px] input input-bordered"
                        value={option.text}
                        onChange={(e) => handleOptionChange(qIndex, oIndex, e)}
                      />
                      <label className="ml-2">
                        <input
                          type="radio"
                          name={`isCorrect-${qIndex}`}
                          checked={option.isCorrect}
                          onChange={() =>
                            handleCorrectOptionChange(qIndex, oIndex)
                          }
                        />
                        Correct
                      </label>
                    </div>
                  </label>
                </div>
              ))}
            </div>
          ))}

          <div className="flex justify-between items-center mt-3">
            <button
              type="button"
              className="btn btn-primary"
              onClick={addQuestion}
            >
              Add Question
            </button>
            <button
              type="button"
              className="btn btn-accent"
              onClick={submitQuiz}
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Quiz"}
            </button>
          </div>

          {error && <div style={{ color: "red" }}>{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default CreateQuiz;
