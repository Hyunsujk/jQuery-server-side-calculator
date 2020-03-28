let history;
let mathematical_operation = "";
let number_output = 0;
let operation_sign;

$(document).ready(init);

function init() {
  getHistory();
  $(".js-btn-add").on("click", addNumber);
  $(".js-btn-subtract").on("click", subtractNumber);
  $(".js-btn-multiply").on("click", multiplyNumber);
  $(".js-btn-divide").on("click", divideNumber);
  $(".js-btn-equal").on("click", getInput);
  // $(".js-btn-clear").on("click", emptyInputField);
}

//
//EVENT HANDLER
//---------------

function getInput() {
  const numberInput = {
    number_one: parseInt($(".js-number-input-1").val()),
    number_two: parseInt($(".js-number-input-2").val()),
    operation_sign: "",
    number_output: ""
  };
  if (mathematical_operation === "add") {
    numberInput.operation_sign = "+";
  } else if (mathematical_operation === "subtract") {
    numberInput.operation_sign = "-";
  } else if (mathematical_operation === "multiply") {
    numberInput.operation_sign = "*";
  } else if (mathematical_operation === "divide") {
    numberInput.operation_sign = "/";
  }

  saveInput(numberInput);
}

function addNumber() {
  mathematical_operation = "add";
  console.log(mathematical_operation);
}

function subtractNumber() {
  mathematical_operation = "subtract";
  console.log(mathematical_operation);
}

function multiplyNumber() {
  mathematical_operation = "multiply";
  console.log(mathematical_operation);
}

function divideNumber() {
  mathematical_operation = "divide";
  console.log(mathematical_operation);
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
    // const lastIndex = history.length - 1;
    // $(".js-number-output").text(`
    // <p>${result[lastIndex].number_output}</p>`);
    //   $(".js-number-history").append(`
    //     <li>${result.number_one}${result.operation_sign}${result.number_two}=${result.number_output}</li>
    //     `);
  }
}

// function emptyInputField() {
//   $(".js-number-input-1").val("");
//   $(".js-number-input-2").val("");
//   number_output = 0;
// }