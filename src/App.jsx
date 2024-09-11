import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Home from "./pages/home/Home";
import Quiz from "./pages/quiz/Quiz";
import LeaderBoard from "./pages/leader/LeaderBoard";
import CreateQuiz from "./pages/create/CreateQuiz";

function App() {
  const { authUser } = useAuthContext();

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/quiz"
          element={authUser ? <Quiz /> : <Navigate to="/login" />} // Allow authenticated users to access Quiz
        />
        <Route
          path="/create"
          element={authUser ? <CreateQuiz /> : <Navigate to="/login" />} // Allow authenticated users to access Quiz
        />
        <Route
          path="/leader"
          element={authUser ? <LeaderBoard /> : <Navigate to="/login" />} // Allow authenticated users to access Quiz
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <Signup />}
        />
      </Routes>
    </div>
  );
}

export default App;
