console.log("sanity check");

const oReq = new XMLHttpRequest();
oReq.addEventListener("load", reqListener);
oReq.open("GET", "https://swapi.co/api/people/4/");
oReq.send();

function reqListener() {
  console.log("reqListener callback fired");
  const data = JSON.parse(this.responseText);
  console.log(data);

  const person4Name = document.getElementById("person4Name");
  person4Name.innerHTML = "Name: " + data.name;

  const oReq2 = new XMLHttpRequest();
  oReq2.addEventListener("load", reqListener2);
  oReq2.open("GET", "https://swapi.co/api/planets/1/");
  oReq2.send();

  function reqListener2() {
    console.log("reqListener2 callback fired");
    const data2 = JSON.parse(this.responseText);

    const person4HomeWorld = document.getElementById("person4HomeWorld");
    person4HomeWorld.innerHTML = "Home World: " + data.name;
  }
}
