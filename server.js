const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const connectDB = require("./src/config/db");

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());

// Test route
app.get("/", (req, res) => {
  res.json({ message: "TrackWise API is running..." });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
