import { showHome } from "./home.js";
const url = `http://localhost:3030/users/register`;
export function register(){
    document.querySelectorAll("section").forEach((x) => (x.style.display = "none"));
    const registerView = document.getElementById("form-sign-up");
    registerView.style.display = "block";

    const registerFrom = document.getElementById('register-form');
    registerFrom.addEventListener('submit', onRegister);
}

async function onRegister(event){
    event.preventDefault();

    const formData = new FormData(event.target);
    const regData = Object.fromEntries(formData.entries());
    const data = {
        email: regData.email,
        password: regData.password
    }
   
       
    if(!data.email || !data.password || !regData.repeatPassword){
        return  alert('All field must be filled!');
    }

    if(data.password.length < 6 || regData.repeatPassword < 6){
      return alert ('Password must be atleast 6 digits!')
    }

    if(data.password != regData.repeatPassword){
      return alert ('Password don\'t match!');
    }

    try {
        
        const res = await fetch(url, {
            method: 'POST',
            headers:  {"Content-type": "application/json"},
            body: JSON.stringify(data)
        })

        if(!res.ok){
            const err = await res.json()
            throw new Error(err.message);
        }
        const returnData = await res.json();
        sessionStorage.setItem('user', JSON.stringify(returnData));
        showHome()
    } catch (error) {
        alert(error.message);
    }
}