// let parent = document.querySelector(".output");

// let p = document.createElement("p");

// let tnode = document.createTextNode("hello");
// p.appendChild(tnode);
// console.log(p);
// parent.appendChild(p);
// console.log(parent);

function updatePercentage() {
  let parent = document.querySelector(".output");
  let oldP = document.querySelector(".output p");
  if (oldP) {
    oldP.parentElement.removeChild(oldP);
  }

  // calculation
  startInSeconds = startDate.getTime() / 1000;
  finalInSeconds = endDate.getTime() / 1000;
  currentInSeconds = new Date().getTime() / 1000;

  let remaining =
    ((finalInSeconds - currentInSeconds) / (finalInSeconds - startInSeconds)) *
    100;
  // console.log(startInSeconds, finalInSeconds, currentInSeconds);

  // adding to dom
  let p = document.createElement("p");
  p.appendChild(
    document.createTextNode(`${remaining.toFixed(6)} % of the year remaining`)
  );
  parent.appendChild(p);

  //   console.log(finalInSeconds);
}

console.log("started");
// global variables
let endDate = new Date("2021/01/01");
let startDate = new Date("2020/01/01");
let globalIntervalId = 0;
let intervalObj = {
  percentage: 0,
  seconds: 0,
  days: 0,
  months: 0,
};

function updateSeconds() {}
function updateDays() {}
function updateMonths() {}

// getting buttons
let pbutton = document.querySelector("#buttons #ptage");
let sbutton = document.querySelector("#buttons #seconds");
let dbutton = document.querySelector("#buttons #days");
let mbutton = document.querySelector("#buttons #months");

/* 
Creating Event listeners for each button
*/

pbutton.addEventListener("click", (x) => {
  console.log("my", intervalObj.percentage, "global", globalIntervalId);

  if (globalIntervalId) {
    if (intervalObj.percentage === globalIntervalId) {
      console.log("already my updating");
      return;
    } else {
      console.log("clearing global id");
      clearInterval(globalIntervalId);
      intervalObj.percentage = 0;
    }
  }
  updatePercentage();
  globalIntervalId = setInterval(updatePercentage, 1000);
  intervalObj.percentage = globalIntervalId;
  console.log(globalIntervalId);
});
