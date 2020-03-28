const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 5000;

const numberHistory = require("./modules/number_history");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("server/public"));

let operator;
let num1;
let num2;
let numOutput;

app.get("/numberHistory", (req, res) => {
  res.send(numberHistory);
});

app.post("/numberHistory", (req, res) => {
  const numbers = req.body;
  numberHistory.push(numbers);
  console.log(numbers);
  for (let i = 0; i < numberHistory.length; i++) {
    operator = numberHistory[i].operation_sign;
    num1 = parseFloat(numberHistory[i].number_one);
    num2 = parseFloat(numberHistory[i].number_two);
    numOutput = numberHistory[i].number_output;
    console.log(operator, num1, num2);
    if (operator == "+") {
      numOutput = num1 + num2;
    } else if (operator == "-") {
      numOutput = num1 - num2;
    } else if (operator == "*") {
      numOutput = num1 * num2;
    } else if (operator == "/") {
      numOutput = num1 / num2;
    }
    console.log(numOutput);
  }

  res.sendStatus(201);
});

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});
