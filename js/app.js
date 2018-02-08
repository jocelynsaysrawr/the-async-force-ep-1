console.log("sanity check");

const _request = function(url, callback) {
  const oReq = new XMLHttpRequest();
  oReq.addEventListener("load", function() {
    const data = JSON.parse(this.responseText);
    return callback.bind(this)(data);
  });
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

const reqListenerPerson4 = data => {
  console.log(data);
  document.getElementById("person4Name").innerHTML = "Name: " + data.name;

  const person4Planet = _request(data.homeworld, reqListener2);
  function reqListener2(data2) {
    document.getElementById("person4HomeWorld").innerHTML =
      "Home World: " + data2.name;
  }
};

const oReqPerson4 = _request(
  "https://swapi.co/api/people/4/",
  reqListenerPerson4
);

const reqListenerPerson14 = data => {
  console.log(data);
  document.getElementById("person14Name").innerHTML = "Name: " + data.name;

  const reqListener2 = data2 => {
    document.getElementById("person14Species").innerHTML =
      "Species: " + data2.name;
  };
  const person14Species = _request(data.species, reqListener2);
};

const oReqPerson14 = _request(
  "https://swapi.co/api/people/14/",
  reqListenerPerson14
);

const reqListenerFilms = data => {
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
      const planetNameData = data => {
        const planetName = _createElement("h4", "planetName", data.name);
        planet.appendChild(planetName);
        filmPlanets.appendChild(planet);
      };
      const oReqPlanet = _request(arr, planetNameData);
    });
    createFilmList.appendChild(newFilm);
  });
};

const oReqFilms = _request("https://swapi.co/api/films/", reqListenerFilms);
