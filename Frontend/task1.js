var sec = 60;

var WikiData = { AllData: [] };


window.onload = function() {
  printValue();
}

function UpdateSecond(val){
  document.getElementById("timer").innerHTML = "Fetching next value in "+val+" min &nbsp; &nbsp;";
  sec = val * 60;
}


function clearHtml() {
  document.getElementById("task1-header").innerHTML = "";
  document.getElementById("task1-content").innerHTML = "";
  document.getElementById("task2-header").innerHTML = "";
  document.getElementById("task2-content").innerHTML = "";
  console.clear();
}

function checkName(getUrl) {
  if (getUrl.includes("wikipedia")) return true;
  return false;
}

function myFunction() {
  clearHtml();
  callApi();
}

async function callApi() {
  const url = "https://wikipediaapi.avinashsingh7.repl.co/";
  fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.text())
    .then((contents) => callAllFunction(contents))
    .catch((e) => {
      console.log(e);
    });
}

function callAllFunction(data){
  getUpdatedPageCount(JSON.parse(data));
  fetchApiData(JSON.parse(data));
}

function fetchApiData(data) {
  JsonArray = {};
  WikiData["AllData"] = [];
  WikiData["AllData"].push(data);
  for (var i = 0; i < WikiData.AllData[0].length; i++) {
    if (checkName(WikiData.AllData[0][i].meta.domain)) {
      JsonArray[WikiData.AllData[0][i].meta.domain] =
        1 | (JsonArray[WikiData.AllData[0][i].meta.domain] + 1);
    }
  }

  // Creating Dictionary Array
  var dictArray;
  dictArray = Object.keys(JsonArray).map(function (key) {
    return [key, JsonArray[key]];
  });
  //sorting Dictionary Array
  dictArray.sort(function (first, second) {
    return second[1] - first[1];
  });

  console.log("Toatal number of Wikipedia Domain Updated: " + dictArray.length);
  document.getElementById("task1-header").innerText =
    "Toatal number of Wikipedia Domain Updated: " + dictArray.length;
  var divInsert = "<table>";
  for (var i = 0; i < dictArray.length; i++) {
    if (dictArray[i][1] > 1) {
      divInsert +=
        "<tr><td>" +
        dictArray[i][0] +
        ":</td><td> " +
        dictArray[i][1] +
        "</td><td> Pages Updated</td></tr>";
      console.log(dictArray[i][0] + ": " + dictArray[i][1] + " pages updated");
    } else {
      divInsert +=
        "<tr><td>" +
        dictArray[i][0] +
        ":</td><td> " +
        dictArray[i][1] +
        "</td><td> Page Updated</td></tr>";
      console.log(dictArray[i][0] + ": " + dictArray[i][1] + "Page Updated");
    }
  }
  document.getElementById("task1-content").innerHTML += divInsert + "</table>";
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function printValue() {
  while (true) {
    myFunction();
    await sleep(sec * 1000);
  }
}
