import { html, page, render } from "../lib.js";
import { createSubmitHandler } from "../util.js";
import {post} from '../request.js';

const url = `http://localhost:3030/data/events`;

const tempCreate = () => html `
   <section id="create">
          <div class="form">
            <h2>Add Event</h2>
            <form  @submit=${createSubmitHandler(onCreate)} class="create-form">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Event"
              />
              <input
                type="text"
                name="imageUrl"
                id="event-image"
                placeholder="Event Image URL"
              />
              <input
                type="text"
                name="category"
                id="event-category"
                placeholder="Category"
              />


              <textarea
                id="event-description"
                name="description"
                placeholder="Description"
                rows="5"
                cols="50"
              ></textarea>
              
              <input
              type="text"
              name="date"
              id="date"
              placeholder="When?"
            />

              <button type="submit">Add</button>
            </form>
          </div>
        </section>
`;


export function createEvent(){
    render(tempCreate());
}
// {
//   "name": "Relanaria",
//   "imageUrl": "321",
//   "category": "das",
//   "description": "dsa",
//   "date": "1223"
// }

async function onCreate(data){
  if(!data.name || !data.imageUrl || !data.category || !data.description || !data.date){
    return alert('All field must be filled!');
  }
  
 await post(url, data);
 page.redirect('/events');
}