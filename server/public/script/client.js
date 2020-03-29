let history;
let operator;

$(document).ready(init);

function init() {
  //get history of the calculation
  getHistory();
  // when the operator button is clicked, store the operation to the variable operator
  $(".js-btn-operator").on("click", function() {
    operator = event.target.innerHTML;
  });
  // when equals button is clicked, get input values from input field
  $(".js-btn-equal").on("click", getInput);
  // when clear button is clicked, empty the input field
  $(".js-btn-clear").on("click", emptyInputField);

  //
  // stretch goal
  //---------------------------------
  //when stretch goal calculator button is clicked, do the calculation
  $(".js-btn-stretch").on("click", stretchGoalCalculator);
}

//
//EVENT HANDLER
//---------------

function getInput() {
  // store the input values and operator in the numberInput object
  const numberInput = {
    number_one: parseInt($(".js-number-input-1").val()),
    number_two: parseInt($(".js-number-input-2").val()),
    operation_sign: operator,
    number_output: ""
  };
  // save the numberInput
  saveInput(numberInput);
}

function emptyInputField() {
  // empty the input field
  $(".js-number-input-1").val("");
  $(".js-number-input-2").val("");
  $(".js-number-output").text(`0`);
}

//
// API INTERACTIONS / AJAX CALLS
//------------------------------

function saveInput(input) {
  // post the input value to the server using "/numberhistory" route
  $.ajax({
    method: "POST",
    url: "/numberhistory",
    data: input
  })
    .then(response => {
      // then get the updated calculation history
      console.log(response);
      getHistory();
    })
    .catch(err => {
      // if there is an error, let user know
      console.warn("Oops! couldn't save the output");
    });
}

function getHistory() {
  console.log("in get history");
  // get the calculation history through "/numberhisotry" route
  $.ajax({
    type: "GET",
    url: "/numberhistory"
  })
    .then(response => {
      // store the response in the history then render the calculation history to the DOM
      history = response;
      console.log(history);
      render();
    })
    .catch(err => {
      // if there is an error, let user know
      console.warn("Oops! something went wrong");
    });
}

//
// RENDER
// -----------------------------------

function render() {
  console.log("in render");
  // empty the history DOM
  $(".js-number-history").empty();
  // loop through each index in history array, and append each of them in unlisted order format
  for (let i = 0; i < history.length; i++) {
    const result = history[i];
    console.log(result);
    $(".js-number-history").append(`
    <li>${result.number_one}${result.operation_sign}${result.number_two}=${result.number_output}</li>
    `);
  }
  // if last history is not undefined, display the number output of last index in the history to DOM
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
  // btnPressed stores the value of the button pressed
  let btnPressed = event.target.innerHTML;
  console.log(btnPressed);

  if (btnPressed == "C") {
    //if the btnPressed is C, result and currentEntry are set to 0
    result = 0;
    currentEntry = "0";
  } else if (btnPressed == ".") {
    // if btnPressed is "." add to the currentEntry
    currentEntry += ".";
  } else if (isNumber(btnPressed)) {
    // if btnPressed is number and currentEntry is 0, btnPressed is the new currentEntry
    if (currentEntry == "0") {
      currentEntry = btnPressed;
    } else {
      // else, currentEntry is updated to currentEntry concatenated with the btnPressed value
      currentEntry = currentEntry + btnPressed;
    }
  } else if (isOperator(btnPressed)) {
    // if btnPress is an operator, store the currentEntry as prevEntry, and set operation to the pressed operator
    // then set currentEntry as an empty string
    prevEntry = parseFloat(currentEntry);
    operation = btnPressed;
    currentEntry = "";
  } else if (btnPressed == "=") {
    // if the button pressed is "=", do the operate function with the values, and set the currentEntry with the calculated value
    // then set the operation as null
    currentEntry = operate(prevEntry, currentEntry, operation);
    operation = null;
  }
  // update the screen with currentEntry
  updateScreen(currentEntry);
}

function updateScreen(displayValue) {
  //display value is a string of number, and display up to 10 digits in the screen
  displayValue = displayValue.toString();
  $(".screen").html(displayValue.substring(0, 10));
}
// if the value is not 'Not a Number', return the value
function isNumber(value) {
  return !isNaN(value);
}
// if the value matches with one of the four operators, return the operator
function isOperator(value) {
  return value == "/" || value == "*" || value == "+" || value == "-";
}
// do the calculation according to the operation
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
