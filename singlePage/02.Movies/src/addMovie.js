import { showHome } from "./home.js";
const addMovieSection = document.getElementById("add-movie");
const addMovieForm = document.getElementById("add-movie-form");

const url = `http://localhost:3030/data/movies`;

addMovie();
export function addMovie() {
  document
    .querySelectorAll("section")
    .forEach((x) => (x.style.display = "none"));
  addMovieSection.style.display = "block";
  addMovieForm.addEventListener("submit", createMovie);
 
}

async function createMovie(event) {
  event.preventDefault();
  const userData = JSON.parse(sessionStorage.getItem("user"));
  const formData = new FormData(addMovieForm);

  const movData = Object.fromEntries(formData.entries());

  if (!movData.title || !movData.description || !movData.img) {
    return alert("All fields must be filled!");
  }

  const movieData = {
    _ownerId: userData._id,
    title: movData.title,
    description: movData.description,
    img: movData.img,
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "X-Authorization": userData.accessToken,
      },
      body: JSON.stringify(movieData),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message);
    }
    const returnData = await res.json();
    showHome();
    return returnData
  } catch (error) {
    return alert(error.message);
  }
}
