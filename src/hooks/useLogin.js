import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import { storeToken } from "../utils/jwt";
import { api } from "../utils/api";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setauthUser } = useAuthContext();

  // Helper function to store token with expiration
  const storeTokenWithExpiration = (token, data) => {
    const expirationTime = new Date().getTime() + 2 * 60 * 60 * 1000; // 2 hours in milliseconds
    const userData = { ...data, expirationTime };

    sessionStorage.setItem("user", JSON.stringify(userData)); // Store user data with expiration
    storeToken(token); // Store token separately if needed
    setauthUser(userData); // Update context with user data
    console.log("Auth user set:", userData);
  };

  const login = async (username, password) => {
    // Trim the inputs before handling errors
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    const success = handleInputErrors(trimmedUsername, trimmedPassword);

    if (!success) return;
    setLoading(true);
    try {
      const res = await fetch(`${api}/api/v1/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: trimmedUsername,
          password: trimmedPassword,
        }),
      });
      const data = await res.json();

      if (data.message) {
        throw new Error(data.message);
      }
      const token = data.token;

      // Use the function to store the token with expiration time
      storeTokenWithExpiration(token, data);

      toast.success("Login Successful");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;

function handleInputErrors(username, password) {
  if (!username || !password) {
    toast.error("Please fill all fields");
    return false;
  }

  return true; // Ensure the function returns true if all checks are passed
}
