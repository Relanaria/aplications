import { getMovies } from "./renderMovies.js";
const url = `http://localhost:3030/data/movies`;
export function showHome() {
  document.querySelectorAll("section").forEach((x) => (x.style.display = "none"));
  document.getElementById("home-page").style.display = "block";
  document.getElementById("movie").style.display = "block";

  const userData = JSON.parse(sessionStorage.getItem("user"));
  const userBtn = document.querySelectorAll(".nav-item.user");
  const guestBtn = document.querySelectorAll(".nav-item.guest");
  const addMovieBtn = document.getElementById('add-movie-button');

  if (!userData) {
    userBtn[0].style.display = "none";
    userBtn[1].style.display = "none";
    guestBtn[0].style.display = "inline-block";
    guestBtn[1].style.display = "inline-block";
  }else{
    userBtn[0].textContent = `Welcome, ${userData.email}`;
    guestBtn[0].style.display = "none";
    guestBtn[1].style.display = "none";
    userBtn[0].style.display = "inline-block";
    userBtn[1].style.display = "inline-block";
    addMovieBtn.style.display = 'inline-block';
  }
  getMovies();
}
