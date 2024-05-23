import { html, render } from "../lib.js";
import { getAllChars } from "../data/getDetails.js";


const tempChars = (chars) => html `
<section id="characters">
          <!-- Display a div with information about every post (if any)-->
          ${chars.map(createChar)};
</section>
`;

const createChar = (char) => html `
          <div class="character">
            <img src="${char.imageUrl}" alt="example1" />
            <div class="hero-info">
              <h3 class="category">${char.category}</h3>
              <p class="description">${char.description}</p>
              <a class="details-btn" href="/characters/${char._id}">More Info</a>
            </div>  
`;

const getNoCharactersTemplate = () => html `
  <h2>Characters</h2>
<h2>No added Heroes yet.</h2>
`;

export async function showChars(ctx){

    let chars = await getAllChars();
    if(chars.length == 0){
      render(getNoCharactersTemplate());
    }else{
      render(tempChars(chars))
    }
}