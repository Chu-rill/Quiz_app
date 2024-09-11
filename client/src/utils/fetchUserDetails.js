import { getToken } from "../utils/jwt";
import { api } from "../utils/api";
const token = getToken();
const fetchUserDetails = async () => {
  const response = await fetch(`${api}/api/v1/auth/getUsers`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch user details");
  }
  return response.json();
};
export default fetchUserDetails;
