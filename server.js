const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const routes = require("./routes"); // central index.js
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "BookMyShow API Documentation",
      version: "1.0.0",
      description: "This is the API documentation for BookMyShow backend using Swagger",
    },
    servers: [
      {
        url: "http://localhost:5000/api",
        description: "Local Server",
      },
    ],
  },
  apis: ["./routes/*.js"], // ✅ Important
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// ✅ Swagger UI route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Base route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to BookMyShow Backend API" });
});

// 🔹 Mount all routes
app.use("/api", routes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: "Something went wrong!", error: err.message });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📘 Swagger Docs available at http://localhost:${PORT}/api-docs`);
});
