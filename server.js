const express = require("express");
const connectDB = require("./db");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json());

// connect database
connectDB();

// routes
app.use("/api", authRoutes);

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
