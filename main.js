console.log("started");

function calculateSeconds() {
  finalInSeconds = endDate.getTime() / 1000;
  currentInSeconds = new Date().getTime() / 1000;

  let remaining = finalInSeconds - currentInSeconds;

  return `${remaining.toFixed(1)} seconds remaining`;
}

function calculatePercentage() {
  startInSeconds = startDate.getTime() / 1000;
  finalInSeconds = endDate.getTime() / 1000;
  currentInSeconds = new Date().getTime() / 1000;

  let remaining =
    ((finalInSeconds - currentInSeconds) / (finalInSeconds - startInSeconds)) *
    100;

  return `${remaining.toFixed(6)}% of the year remaining`;
}

function calculateDays() {
  finalInSeconds = endDate.getTime() / 1000;
  currentInSeconds = new Date().getTime() / 1000;

  remaining = (finalInSeconds - currentInSeconds) / 60 / 60 / 24;

  return `${remaining.toFixed(1)} days remaining`;
}

function calculateMonths() {
  currentMonth = new Date().getMonth();

  remaining = 11 - currentMonth;

  return `${remaining.toFixed(1)} months remaining`;
}

function updateOutput() {
  let parent = document.querySelector(".output");
  let oldP = document.querySelector(".output p");
  if (oldP) {
    oldP.parentElement.removeChild(oldP);
  }

  let remaining = "";
  if (updateType === "ptage") {
    remaining = calculatePercentage();
  } else if (updateType === "seconds") {
    remaining = calculateSeconds();
  } else if (updateType === "days") {
    remaining = calculateDays();
  } else if (updateType === "months") {
    remaining = calculateMonths();
  }

  // adding to dom
  let p = document.createElement("p");
  p.appendChild(document.createTextNode(`${remaining}`));
  parent.appendChild(p);
}

// global variables
let updateType = "ptage";
let endDate = new Date("2021/01/01");
let startDate = new Date("2020/01/01");
let globalIntervalId = 0;
let globalIntervalRunner = "ptage";
let intervalObj = {
  ptage: 0,
  seconds: 0,
  days: 0,
  months: 0,
};
let intervalList = [0, 0, 0, 0];

let availabelButtons = document.querySelectorAll("#buttons .btn");
// console.log(availabelButtons);

updateOutput();
globalIntervalId = setInterval(updateOutput, 1000);

availabelButtons.forEach((btn) => {
  btn.addEventListener("click", (x) => {
    updateType = x.target.id;

    if (globalIntervalId) {
      if (intervalObj[updateType] === globalIntervalId) {
        // console.log("already my updating");
        return;
      } else {
        // console.log("clearing global id");
        clearInterval(globalIntervalId);
        intervalObj[globalIntervalRunner] = 0;
      }
    }

    updateOutput();
    globalIntervalId = setInterval(updateOutput, 1000);
    globalIntervalRunner = updateType;

    intervalObj[updateType] = globalIntervalId;
    // console.log(globalIntervalId);
  });
});
/* 

Creating Event listeners for each button
*/

// pbutton.addEventListener("click", (x) => {
//   console.log("my", intervalObj.percentage, "global", globalIntervalId);

//   if (globalIntervalId) {
//     if (intervalObj.percentage === globalIntervalId) {
//       console.log("already my updating");
//       return;
//     } else {
//       console.log("clearing global id");
//       clearInterval(globalIntervalId);
//       intervalObj.percentage = 0;
//     }
//   }
//   updatePercentage();
//   globalIntervalId = setInterval(updatePercentage, 1000);
//   intervalObj.percentage = globalIntervalId;
//   console.log(globalIntervalId);
// });
