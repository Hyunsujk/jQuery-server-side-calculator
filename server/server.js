const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

const numberHistory = require("./modules/number_history");
// const numberHistory = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("server/public"));

app.get("/numberHistory", (req, res) => {
  res.send(numberHistory);
});

app.post("/numberHistory", (req, res) => {
  const newNumber = req.body;
  console.log(newNumber);
  numberHistory.push(newNumber);

  res.sendStatus(201);
});

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});
