import { html, render } from "../node_modules/lit-html/lit-html.js";

const root = document.getElementById('root');
const form = document.querySelector('form');


form.addEventListener('submit',(event) =>{
   event.preventDefault();

   const towns = document.getElementById('towns').value;
   const arrayOfTowns = towns.split(', ');
   render(template(arrayOfTowns), root)
   form.reset();
})

const template = (towns) => html `
<ul>

    ${towns.map((t) => html `<li> ${t}</li>`)}

</ul>
`