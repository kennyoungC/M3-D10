`use strict`;
window.onload = () => {
  displayMovies("horror");
  displayMovies("comedy");
  displayMovies("evil");
};
const headers = new Headers({
  "Content-Type": "application/json",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDgxN2M1ZWU3ODE4NzAwMTVjMjY3YTgiLCJpYXQiOjE2NDk5Njc2NjEsImV4cCI6MTY1MTE3NzI2MX0.bJ-a8RydRHuvCgXmMewdmveQbMkVWZnCshZjuA2SYwQ",
});
const url = "https://striveschool-api.herokuapp.com/api/movies/";
const displayMovies = async (genre) => {
  try {
    const response = await fetch(url + genre, {
      method: "GET",
      headers,
    });
    const movies = await response.json();
    const movieGenre = document.querySelector(`.${genre}`);
    const h3 = document.querySelector(`.${genre}-header`);
    h3.classList.add("text-capitalize");
    h3.innerText = genre;

    movieGenre.innerHTML = ``;
    movies.forEach((movie) => {
      movieGenre.innerHTML += `
    
    <div class="col-12 col-sm-6 col-md-4 mb-3">
    <div class="card">
  <img src="${movie.imageUrl}" class="card-img-top  " alt="...">
 
</div>
</div>
`;
    });
  } catch (error) {
    console.log(error);
  }
};
