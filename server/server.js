const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 5000;

const numberHistory = require("./modules/number_history");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("server/public"));

app.get("/numberhistory", (req, res) => {
  res.send(numberHistory);
});

app.post("/numberhistory", (req, res) => {
  const numbers = req.body;
  const operator = numbers.operation_sign;
  const num1 = parseFloat(numbers.number_one);
  const num2 = parseFloat(numbers.number_two);
  if (operator == "+") {
    numbers.number_output = num1 + num2;
  } else if (operator == "-") {
    numbers.number_output = num1 - num2;
  } else if (operator == "*") {
    numbers.number_output = num1 * num2;
  } else if (operator == "/") {
    numbers.number_output = num1 / num2;
  }
  console.log(numbers.number_output);
  numberHistory.push(numbers);
  console.log(numberHistory);

  res.sendStatus(201);
});

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});
