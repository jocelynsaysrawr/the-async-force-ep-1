console.log("sanity check");

const _request = function(url, callback) {
  const oReq = new XMLHttpRequest();
  oReq.addEventListener("load", callback);
  oReq.open("GET", url);
  oReq.send();
  return oReq;
};

const _createElement = function(element, className, innerHTML) {
  let elementType = document.createElement(element);

  if (className) {
    elementType.className = className;
  }
  if (innerHTML) {
    elementType.innerHTML = innerHTML;
  }
  return elementType;
};

const oReqPerson4 = _request(
  "https://swapi.co/api/people/4/",
  reqListenerPerson4
);

function reqListenerPerson4() {
  const data = JSON.parse(this.responseText);
  console.log(data);
  document.getElementById("person4Name").innerHTML = "Name: " + data.name;

  const person4Planet = _request(data.homeworld, reqListener2);
  function reqListener2() {
    const data2 = JSON.parse(this.responseText);
    document.getElementById("person4HomeWorld").innerHTML =
      "Home World: " + data2.name;
  }
}

const oReqPerson14 = _request(
  "https://swapi.co/api/people/14/",
  reqListenerPerson14
);

function reqListenerPerson14() {
  const data = JSON.parse(this.responseText);
  console.log(data);
  document.getElementById("person14Name").innerHTML = "Name: " + data.name;

  const person14Species = _request(data.species, reqListener2);
  function reqListener2() {
    const data2 = JSON.parse(this.responseText);
    document.getElementById("person14Species").innerHTML =
      "Species: " + data2.name;
  }
}

const oReqFilms = _request("https://swapi.co/api/films/", reqListenerFilms);

function reqListenerFilms() {
  const data = JSON.parse(this.responseText);
  console.log(data);
  console.log(data.results);

  const createFilmList = document.getElementById("filmList");
  data.results.forEach(arr => {
    const newFilm = _createElement("li", "film");

    const filmTitle = _createElement("h2", "filmTitle", arr.title);
    newFilm.appendChild(filmTitle);

    const Planets = _createElement("h3", false, "Planets");
    newFilm.appendChild(Planets);

    const filmPlanets = _createElement("ul", "filmPlanets");
    newFilm.appendChild(filmPlanets);

    arr.planets.forEach(arr => {
      const planet = _createElement("li", "planet");
      const oReqPlanet = _request(arr, planetNameData);
      function planetNameData() {
        const data = JSON.parse(this.responseText);
        const planetName = _createElement("h4", "planetName", data.name);
        planet.appendChild(planetName);
        filmPlanets.appendChild(planet);
      }
    });
    createFilmList.appendChild(newFilm);
  });
}
