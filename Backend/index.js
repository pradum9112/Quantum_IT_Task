require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ["POST", "GET", "PUT", "DELETE"],
  })
);

// Available routes
app.use(express.json());

// Connect to MongoDB
require("./db")();

app.use("/api/user", require("./routes/userAuthRouter"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start the server
const server = app.listen(port, () => {
  console.log(`server start on port ${port}`);
});
