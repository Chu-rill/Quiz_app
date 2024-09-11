import { useState } from "react";
import { toast } from "react-hot-toast";
import { getToken } from "../utils/jwt";
import { api } from "../utils/api";

const useCreateQuiz = () => {
  const [quizData, setQuizData] = useState({
    title: "",
    category: "",
    level: "",
    questions: [],
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = getToken();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuizData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleQuestionChange = (index, e) => {
    const { name, value } = e.target;
    setQuizData((prevData) => {
      const updatedQuestions = [...prevData.questions];
      updatedQuestions[index] = {
        ...updatedQuestions[index],
        [name]: value,
      };
      return { ...prevData, questions: updatedQuestions };
    });
  };

  const handleOptionChange = (qIndex, oIndex, e) => {
    const { name, value } = e.target;
    setQuizData((prevData) => {
      const updatedQuestions = [...prevData.questions];
      const updatedOptions = [...updatedQuestions[qIndex].options];
      updatedOptions[oIndex] = {
        ...updatedOptions[oIndex],
        [name]: value,
      };
      return {
        ...prevData,
        questions: updatedQuestions.map((question, index) =>
          index === qIndex ? { ...question, options: updatedOptions } : question
        ),
      };
    });
  };

  const handleCorrectOptionChange = (qIndex, oIndex) => {
    setQuizData((prevData) => {
      const updatedQuestions = [...prevData.questions];
      updatedQuestions[qIndex].options.forEach((option, index) => {
        option.isCorrect = index === oIndex; // Set the correct option
      });
      return { ...prevData, questions: updatedQuestions };
    });
  };

  const addQuestion = () => {
    setQuizData((prevData) => ({
      ...prevData,
      questions: [
        ...prevData.questions,
        {
          questionText: "",
          options: [
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
          ],
        },
      ],
    }));
  };

  const submitQuiz = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${api}/api/v1/quiz/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quizData),
      });

      if (!response.ok) {
        throw new Error("Failed to create quiz");
      }
      toast.success("Quiz Created");
      setQuizData({
        title: "",
        category: "",
        level: "",
        questions: [],
      }); // Reset quiz data after successful submission
    } catch (err) {
      toast.error(err.message); // Use the caught error message
    } finally {
      setLoading(false);
    }
  };

  return {
    quizData, // Expose quizData
    error, // Expose error
    loading, // Expose loading state
    handleInputChange, // Expose input change handler
    handleQuestionChange, // Expose question change handler
    handleOptionChange, // Expose option change handler
    handleCorrectOptionChange, // Expose correct option change handler
    addQuestion, // Expose add question function
    submitQuiz, // Expose submit function
  };
};

export default useCreateQuiz;
