`use strict`;
window.onload = () => {
  handleEdit();
};
const headers = new Headers({
  "Content-Type": "application/json",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDgxN2M1ZWU3ODE4NzAwMTVjMjY3YTgiLCJpYXQiOjE2NDk5Njc2NjEsImV4cCI6MTY1MTE3NzI2MX0.bJ-a8RydRHuvCgXmMewdmveQbMkVWZnCshZjuA2SYwQ",
});
const movieId = new URLSearchParams(window.location.search).get("id");
const url = "https://striveschool-api.herokuapp.com/api/movies/";
const endpoint = movieId ? url + movieId : url;

method = movieId ? "PUT" : "POST";
const AddMovies = async (event) => {
  event.preventDefault();
  const title = document.getElementById("title").value;
  const movieDescription = document.getElementById("movie-description").value;
  const movieCover = document.getElementById("movie-cover").value;
  const category = document.getElementById("category").value;
  const myMovieObj = {
    name: title,
    description: movieDescription,
    imageUrl: movieCover,
    category: category,
  };
  try {
    const response = await fetch(endpoint, {
      method,
      headers,
      body: JSON.stringify(myMovieObj),
    });
    if (response.ok) {
      const movie = await response.json();
      if (movieId) {
        alert("Movie edited successfully");
        window.location.assign("/");
      } else {
        alert("Movie added successfully");
        window.location.assign("/");
      }
    }
  } catch (error) {
    console.log(error);
  }
};
const handleEdit = async () => {
  try {
    if (movieId) {
      const response = await fetch(endpoint, {
        method,
        headers,
      });
      const { name, category, imageUrl, description } = await response.json();
      document.getElementById("title").value = name;
      document.getElementById("category").value = category;
      document.getElementById("movie-cover").value = imageUrl;
      document.getElementById("movie-description").value = description;
      const delBtn = document.querySelector(".del-btn");
      delBtn.classList.remove("d-none");
      const h1 = (document.querySelector("h1").innerText = "Edit Movie");
      const btnSubmit = document.querySelector("button[type='submit']");
      btnSubmit.innerText = "Edit";
      btnSubmit.className = "btn btn-info";
    }
  } catch (err) {
    console.log(err);
  }
};
const handleDelete = async () => {
  const accepted = confirm("do you want to delete?");

  console.log("Confirmed? ", accepted);
  if (accepted) {
    try {
      const response = await fetch(endpoint, {
        method: "DELETE",
        headers,
      });
      if (response.ok) {
        alert("Movie Successfully Deleted");
        window.location.assign("/");
      }
    } catch (error) {
      console.log(error);
    }
  }
};
const validate = (event) => {
  event.target.form.classList.add("validated");
};
