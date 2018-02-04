console.log("sanity check");

function reqListener() {
  console.log("reqListener callback fired");
  const data = JSON.parse(this.responseText);
  console.log(data);

  const person4Name = document.getElementById("person4Name");
  person4Name.innerHTML = "Name: " + data.name;
}

const oReq = new XMLHttpRequest();
oReq.addEventListener("load", reqListener);
oReq.open("GET", "https://swapi.co/api/people/4/");
oReq.send();
