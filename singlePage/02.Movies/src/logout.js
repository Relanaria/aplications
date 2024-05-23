import { showHome } from "./home.js";

export async function logOut(){
    const url = "http://localhost:3030/users/logout";
    const userData = JSON.parse(sessionStorage.getItem("user"));

    const header = {
        method: `GET`,
        headers: {
            "Content-type": "application/json",
            "X-Authorization": userData.accessToken
        }
    }
    const response = await fetch(url, header);
    sessionStorage.clear();
    showHome();
}