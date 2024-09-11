export default function getAuthUser() {
  const userData = JSON.parse(sessionStorage.getItem("user"));
  // console.log("Fetched user data from session:", userData);

  if (userData) {
    const currentTime = new Date().getTime();
    console.log(
      "Current time:",
      currentTime,
      "Expiration time:",
      userData.expirationTime
    );

    if (currentTime > userData.expirationTime) {
      // Session expired
      sessionStorage.removeItem("user");
      console.log("Session expired, clearing user data");
      return null;
    }
    return userData;
  }
  // console.log("No user data found");
  return null;
}
