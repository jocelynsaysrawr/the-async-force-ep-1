console.log("sanity check");

const oReqPerson4 = new XMLHttpRequest();
oReqPerson4.addEventListener("load", reqListenerPerson4);
oReqPerson4.open("GET", "https://swapi.co/api/people/4/");
oReqPerson4.send();

function reqListenerPerson4() {
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
    person4HomeWorld.innerHTML = "Home World: " + data2.name;
  }
}

const oReqPerson14 = new XMLHttpRequest();
oReqPerson14.addEventListener("load", reqListenerPerson14);
oReqPerson14.open("GET", "https://swapi.co/api/people/14/");
oReqPerson14.send();

function reqListenerPerson14() {
  const data = JSON.parse(this.responseText);
  console.log(data);

  const person14Name = document.getElementById("person14Name");
  person14Name.innerHTML = "Name: " + data.name;

  const oReq2 = new XMLHttpRequest();
  oReq2.addEventListener("load", reqListener2);
  oReq2.open("GET", "https://swapi.co/api/species/1/");
  oReq2.send();

  function reqListener2() {
    const data2 = JSON.parse(this.responseText);

    const person14Species = document.getElementById("person14Species");
    person14Species.innerHTML = "Species: " + data2.name;
  }
}

const oReqFilms = new XMLHttpRequest();
oReqFilms.addEventListener("load", reqListenerFilms);
oReqFilms.open("GET", "https://swapi.co/api/films/");
oReqFilms.send();

function reqListenerFilms() {
  const data = JSON.parse(this.responseText);
  console.log(data);
  console.log(data.results);

  const createfilmList = document.getElementById("filmList");
  data.results.forEach(arr => {
    const newFilm = document.createElement("li");
    newFilm.className = "film";
    createfilmList.appendChild(newFilm);

    const filmTitle = document.createElement("h2");
    filmTitle.className = "filmTitle";
    filmTitle.innerHTML = arr.title;
    newFilm.appendChild(filmTitle);

    const Planets = document.createElement("h3");
    Planets.innerHTML = "Planets";
    newFilm.appendChild(Planets);

    const filmPlanets = document.createElement("ul");
    filmPlanets.className = "filmPlanets";
    newFilm.appendChild(filmPlanets);

    arr.planets.forEach(arr => {
      const planet = document.createElement("li");
      planet.className = "planet";
      const oReqPlanet = new XMLHttpRequest();
      oReqPlanet.addEventListener("load", function(event) {
        const data = JSON.parse(event.target.responseText);
        const planetName = document.createElement("h4");
        planetName.className = "planetName";
        planetName.innerHTML = data.name;
        planet.appendChild(planetName);
        filmPlanets.appendChild(planet);
      });
      oReqPlanet.open("GET", arr);
      oReqPlanet.send();
    });
  });
}
