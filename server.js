const express = require("express");
const connectToDB = require("./config/dbcon");

const app = express();
connectToDB();
app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.send("Welcome to user registration and login api with jwt");
});
app.use("/api/v1/users", require("./routes/api/user"));
app.use("/api/v1/users", require("./routes/api/auth"));

app.listen(PORT, () => {
  console.log(`server started at port ${PORT}`);
});
