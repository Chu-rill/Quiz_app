import { useState } from "react";
import { toast } from "react-hot-toast"; // Make sure to install and import toast
import { useAuthContext } from "../context/AuthContext";
import { storeToken } from "../utils/jwt";
import { api } from "../utils/api";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setauthUser } = useAuthContext();

  const signup = async ({ username, password }) => {
    // Trim the inputs before handling errors
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    const success = handleInputErrors({
      username: trimmedUsername,
      password: trimmedPassword,
    });
    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch(`${api}/api/v1/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: trimmedUsername,
          password: trimmedPassword,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        // Extract the token from the response
        const token = data.token;

        // Store the token in session storage or local storage
        storeToken(token);

        // Set user data in context
        setauthUser(data);

        toast.success("Successfully Signed Up");
        console.log(data);
      } else {
        throw new Error(data.error || "Signup failed");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignup;

function handleInputErrors({ username, password }) {
  if (!username || !password) {
    toast.error("Please fill all fields");
    return false;
  }
  if (password.length < 6) {
    toast.error("Password must be more than 6 characters");
    return false;
  }
  return true; // Ensure the function returns true if all checks are passed
}
