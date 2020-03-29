let history;
let operator;

$(document).ready(init);

function init() {
  getHistory();
  $(".js-btn-operator").on("click", function() {
    operator = event.target.innerHTML;
  });
  $(".js-btn-equal").on("click", getInput);
  $(".js-btn-clear").on("click", emptyInputField);

  //
  // stretch goal
  //---------------------------------
  $(".js-btn-stretch").on("click", stretchGoalCalculator);
}

//
//EVENT HANDLER
//---------------

function getInput() {
  const numberInput = {
    number_one: parseInt($(".js-number-input-1").val()),
    number_two: parseInt($(".js-number-input-2").val()),
    operation_sign: operator,
    number_output: ""
  };

  saveInput(numberInput);
}

function emptyInputField() {
  $(".js-number-input-1").val("");
  $(".js-number-input-2").val("");
  $(".js-number-output").text(`0`);
}

//
// API INTERACTIONS / AJAX CALLS
//------------------------------

function saveInput(input) {
  $.ajax({
    method: "POST",
    url: "/numberhistory",
    data: input
  })
    .then(response => {
      console.log(response);
      getHistory();
    })
    .catch(err => {
      console.warn("Oops! couldn't save the output");
    });
}

function getHistory() {
  console.log("in get history");
  $.ajax({
    type: "GET",
    url: "/numberhistory"
  })
    .then(response => {
      history = response;
      console.log(history);
      render();
    })
    .catch(err => {
      console.warn("Oops! something went wrong");
    });
}

//
// RENDER
// -----------------------------------

function render() {
  console.log("in render");
  $(".js-number-history").empty();
  for (let i = 0; i < history.length; i++) {
    const result = history[i];
    console.log(result);
    $(".js-number-history").append(`
    <li>${result.number_one}${result.operation_sign}${result.number_two}=${result.number_output}</li>
    `);
  }
  const last_history = history[history.length - 1];
  if (last_history != undefined) {
    $(".js-number-output").text(`
    ${last_history.number_output}`);
  }
}

//
// stretch goal
//---------------------------------

let result = 0;
let prevEntry = 0;
let currentEntry = "0";
let operation = null;

function stretchGoalCalculator(event) {
  let btnPressed = event.target.innerHTML;
  console.log(btnPressed);

  if (btnPressed == "C") {
    result = 0;
    currentEntry = "0";
  } else if (btnPressed == ".") {
    currentEntry += ".";
  } else if (isNumber(btnPressed)) {
    if (currentEntry == "0") {
      currentEntry = btnPressed;
    } else {
      currentEntry = currentEntry + btnPressed;
    }
  } else if (isOperator(btnPressed)) {
    prevEntry = parseFloat(currentEntry);
    operation = btnPressed;
    currentEntry = "";
  } else if (btnPressed == "=") {
    currentEntry = operate(prevEntry, currentEntry, operation);
    operation = null;
  }

  updateScreen(currentEntry);
}

function updateScreen(displayValue) {
  displayValue = displayValue.toString();
  $(".screen").html(displayValue.substring(0, 10));
}

function isNumber(value) {
  return !isNaN(value);
}

function isOperator(value) {
  return value == "/" || value == "*" || value == "+" || value == "-";
}

function operate(a, b, operation) {
  a = parseFloat(a);
  b = parseFloat(b);
  console.log(a, b, operation);
  if (operation == "+") {
    return a + b;
  } else if (operation == "-") {
    return a - b;
  } else if (operation == "*") {
    return a * b;
  } else if (operation == "/") {
    return a / b;
  }
}
