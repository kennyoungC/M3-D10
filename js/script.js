`use strict`;
window.onload = () => {
  all();
};
const all = () => {
  displayMovies("horror");
  // displayMovies("comedy");
  displayMovies("romantic");
  // displayMovies("sports");
  displayMovies("action");
};
const headers = new Headers({
  "Content-Type": "application/json",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjU2YmZhNWE5MDIzOTAwMTVkOTY1ZGIiLCJpYXQiOjE2NDk4NTIzMjUsImV4cCI6MTY1MTA2MTkyNX0.byIP9sGJBEu1KNeVEtoF2tsWgEOtohWDDZd-GgY2rUQ",
});
// const headers = new Headers({
//   "Content-Type": "application/json",
//   Authorization:
//     "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDgxN2M1ZWU3ODE4NzAwMTVjMjY3YTgiLCJpYXQiOjE2NDk5Njc2NjEsImV4cCI6MTY1MTE3NzI2MX0.bJ-a8RydRHuvCgXmMewdmveQbMkVWZnCshZjuA2SYwQ",
// });
const url = "https://striveschool-api.herokuapp.com/api/movies/";
const displayMovies = async (genre) => {
  try {
    const response = await fetch(url + genre, {
      method: "GET",
      headers,
    });
    const movies = await response.json();
    console.log(movies);
    const movieGenre = document.querySelector(`.${genre}`);
    const h3 = document.querySelector(`.${genre}-header`);
    h3.classList.add("text-capitalize");
    h3.innerText = genre;
    const row = document.querySelectorAll(".row");
    row.forEach((r) => {
      r.classList.remove("justify-content-center");
    });
    movieGenre.innerHTML = ``;
    movies.forEach((movie) => {
      movieGenre.innerHTML += `

      <div class="col-12 col-sm-6 col-md-4 mb-3 position-relative">
      <div class="card">
      <a href="details.html?id=${movie._id}"><img src="${movie.imageUrl}" class="card-img-top  " alt="..."></a>
      </div>
      <p class="mb-0 position-absolute title"><a class="text-decoration-none text-light" href="details.html?id=${movie._id}">${movie.name}</a></p>
       </div>
     `;
    });
  } catch (error) {
    console.log(error);
  }
};

const dropDown = document.querySelector(".genre-dropdown");
dropDown.onclick = (e)=>{
  if (e.target.classList.contains("dropdown")) {
    const genre = e.target.innerText.toLowerCase();
    console.log(genre);
    const movieUrl =
      "https://striveschool-api.herokuapp.com/api/movies/" + genre;
    const response = await fetch(movieUrl, {
      method: "GET",
      headers,
    });
    const movies = await response.json();
    console.log(movies);
    const main = document.querySelector("main");
    main.innerHTML = ``;
    const section = document.createElement("section");
    section.classList.add("container-fluid");

    const h3 = document.createElement("h3");
    h3.innerText = genre;
    h3.classList.add("text-capitalize");
    section.appendChild(h3);
    const row = document.createElement("div");
    row.classList.add("row");
    movies.forEach((movie) => {
      row.innerHTML += `

      <div class="col-12 col-sm-6 col-md-4 mb-3 position-relative">
      <div class="card">
      <a href="details.html?id=${movie._id}"><img src="${movie.imageUrl}" class="card-img-top  " alt="..."></a>
      </div>
      <p class="mb-0 position-absolute title"><a class="text-decoration-none text-light" href="details.html?id=${movie._id}">${movie.name}</a></p>
      </div>

      `;
      section.appendChild(row);
    });
    main.appendChild(section);
  }
}
dropDown.addEventListener("click", async (e) => {
  if (e.target.classList.contains("dropdown")) {
    const genre = e.target.innerText.toLowerCase();
    console.log(genre);
    const movieUrl =
      "https://striveschool-api.herokuapp.com/api/movies/" + genre;
    const response = await fetch(movieUrl, {
      method: "GET",
      headers,
    });
    const movies = await response.json();
    console.log(movies);
    const main = document.querySelector("main");
    main.innerHTML = ``;
    const section = document.createElement("section");
    section.classList.add("container-fluid");

    const h3 = document.createElement("h3");
    h3.innerText = genre;
    h3.classList.add("text-capitalize");
    section.appendChild(h3);
    const row = document.createElement("div");
    row.classList.add("row");
    movies.forEach((movie) => {
      row.innerHTML += `

      <div class="col-12 col-sm-6 col-md-4 mb-3 position-relative">
      <div class="card">
      <a href="details.html?id=${movie._id}"><img src="${movie.imageUrl}" class="card-img-top  " alt="..."></a>
      </div>
      <p class="mb-0 position-absolute title"><a class="text-decoration-none text-light" href="details.html?id=${movie._id}">${movie.name}</a></p>
      </div>

      `;
      section.appendChild(row);
    });
    main.appendChild(section);
  }
});

const displayAll = document.querySelector(".all");
displayAll.addEventListener("click", () => {
  window.location.assign("/");
});
