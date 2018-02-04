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
  data.results.map((arr, i) => {
    const newFilm = document.createElement("li");
    newFilm.className = "film";
    createfilmList.appendChild(newFilm);
  });

  const getFilmList = document.getElementsByClassName("film");
  console.log(getFilmList);
  Array.prototype.forEach.call(getFilmList, (arr, i) => {
    const filmTitle = document.createElement("h2");
    filmTitle.className = "filmTitle";
    filmTitle.innerHTML = data.results[i].title;
    console.log(filmTitle.innerHTML);
    getFilmList[i].appendChild(filmTitle);

    const Planets = document.createElement("h3");
    Planets.innerHTML = "Planets";
    getFilmList[i].appendChild(Planets);

    const filmPlanets = document.createElement("ul");
    filmPlanets.className = "filmPlanets";
    getFilmList[i].appendChild(filmPlanets);

    const getPlanetList = document.getElementsByClassName("filmPlanets");
    const planet = document.createElement("li");
    planet.className = "planet";
    getPlanetList[i].appendChild(planet);
  });
}
