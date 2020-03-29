// call express and body-parser from package.json to use
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
// set the port as 5000
const PORT = process.env.PORT || 5000;
// numberHistory get the value from number_history module
const numberHistory = require("./modules/number_history");
// sent data will be stored in body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("server/public"));
// get the number history through "/numberhistory" route
app.get("/numberhistory", (req, res) => {
  res.send(numberHistory);
});

// when the number input is sent from client.js, do the calculation with the operator
// and update the value of the calculated number
// then push the updated information to numberHistory module.
// send status code 201 to confirm the new input is created.

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

// the application listen through port 5000
app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});
