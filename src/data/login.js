import { templateHome } from './templates.js';
import { saveUserData, getUserData } from './util.js';
import { html, render } from '/node_modules/lit-html/lit-html.js';

const url = `http://localhost:3030/jsonstore/`
export function onLogin(data){
  const root = document.querySelector('main');
  saveUserData(data);
  render(templateHome, root)
  const userData = getUserData();
    
if (userData) {
    document.getElementsByClassName("user")[0].style.display = "block";
    document.getElementsByClassName("guest")[0].style.display = "none";
  } else {
    document.getElementsByClassName("user")[0].style.display = "none";
    document.getElementsByClassName("guest")[0].style.display = "block";
  }
}