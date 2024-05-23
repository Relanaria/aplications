import { html, render } from "../node_modules/lit-html/lit-html.js";
import { startTemplate } from "./templates.js";

const root = document.querySelector('body');
window.addEventListener('load', onStart)

function onStart(){
    render(startTemplate, root)
}
