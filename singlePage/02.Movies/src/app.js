import { showHome } from "./home.js";
import { login } from "./login.js";
import { logOut } from "./logout.js";
import { register } from "./register.js";
import { addMovie } from "./addMovie.js";
const url = `http://localhost:3030/data/movies`;

const userData = JSON.parse(sessionStorage.getItem('user'));
const userBtn = document.querySelectorAll(".nav-item.user");
const guestBtn = document.querySelectorAll(".nav-item.guest");
const addBtnMovie = document.getElementsByClassName("btn btn-warning");

showHome()
addBtnMovie[0].addEventListener('click', addMovie);
guestBtn[0].addEventListener('click',login);
guestBtn[1].addEventListener('click', register);
userBtn[1].addEventListener('click', logOut);

