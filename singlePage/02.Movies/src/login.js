import { showHome } from "./home.js";
const userBtn = document.querySelectorAll(".nav-item.user");
const guestBtn = document.querySelectorAll(".nav-item.guest");

export function login() {
  document.querySelectorAll("section").forEach((x) => (x.style.display = "none"));
  const loginForm = document.getElementById("form-login");
  loginForm.style.display = "block";
  loginForm.addEventListener('submit',onLogin);
}
const url = `http://localhost:3030/users/login`;

async function onLogin(event) {
  event.preventDefault();

  const userData = new FormData(event.target);
  const data = Object.fromEntries(userData.entries());
 
  if(!data.email || !data.password){
    return alert('All field fust be filled!');
  }

  const options = {
    method: 'POST',
    headers:{
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }

  try {
    const res = await fetch(url, options);

    if(!res.ok){
        const err = await res.json();
        throw new Error(err.message);
    }

    const userData = await res.json();
    sessionStorage.setItem('user', JSON.stringify(userData))
    showHome();
  } catch (error) {
    alert(error.message);
  }
}
