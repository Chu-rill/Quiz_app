const express = require("express");
const authRoutes = express.Router();
const { login, signup, deleteUser } = require("../controllers/auth_controller");
const { protect } = require("../middleWare/jwt");
authRoutes.post("/login", login);
authRoutes.post("/signup", signup);
authRoutes.post("/deleteUser/:userId", protect, deleteUser);
module.exports = authRoutes;
