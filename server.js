// server.js

// 1️⃣ Import packages
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

// 2️⃣ Load environment variables
dotenv.config();

// 3️⃣ Import DB connection
const connectDB = require("./config/db");

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// 6️⃣ Middleware
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// 7️⃣ Routes
// Example basic route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to BookMyShow Backend API" });
});

// Import your routes here
// const authRoutes = require("./routes/authRoutes");
// const movieRoutes = require("./routes/movieRoutes");
// app.use("/api/auth", authRoutes);
// app.use("/api/movies", movieRoutes);

// 8️⃣ Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!", error: err.message });
});

// 9️⃣ Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
