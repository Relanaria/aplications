import { clearUserData, getUserData } from "./util.js";
import { templateHome } from './templates.js';
import { html, render } from '/node_modules/lit-html/lit-html.js';

const root = document.querySelector('main');
export function onLogout(){
    clearUserData()
    render(templateHome, root);
    const userData = getUserData();
    if (userData) {
        document.getElementsByClassName("user")[0].style.display = "block";
        document.getElementsByClassName("guest")[0].style.display = "none";
      } else {
        document.getElementsByClassName("user")[0].style.display = "none";
        document.getElementsByClassName("guest")[0].style.display = "block";
      }
}