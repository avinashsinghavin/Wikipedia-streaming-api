var loop = true;
var initalval;

var WikiData = {AllData:[]};

function myFunction() {
  var person = prompt("Enter your Key");
  if (person != null) {
    // console.log(person);
    document.getElementById("demo").innerHTML = person;
    callApi();
  }
}

async function callApi() {
  const proxy = "https://cors-anywhere.herokuapp.com/";
  const url = "https://wikipediaapi.avinashsingh7.repl.co";
  fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json'}})
    .then((response) => response.text())
    .then((contents) => fetchApiData(contents)) //fetchApiData(contents))
    .catch((e) =>{
      console.log(e);
    }
    );

}

function fetchApiData(data) {
  var JsonString = JSON.stringify(data.substring(2));
  WikiData["AllData"].push(JSON.parse(JsonString));
  document.getElementById("result").innerText=data;
  initalval = data;
  // console.log(JSON.parse(data.trim('\\', '')));
  // var json_data = getData();
  // console.log(data, json_data);
  if (loop) {
    printValue();
    loop = false;
  }
  initalval = data;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function printValue() {
  while (true) {
    console.log("initalval");
    await sleep(5000);
  }
}
printValue();