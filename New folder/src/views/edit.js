import { html, page, render } from "../lib.js";
import { get, del, put } from "../request.js";
import { createSubmitHandler, getUserData } from "../util.js";
const url = `http://localhost:3030/data/events/`;

const editForm = (ev) => html `
<section id="edit">
          <div class="form">
            <h2>Edit Event</h2>
            <form data-id=${ev._id} @submit=${createSubmitHandler(onEdit)} class="edit-form">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Event"
                .value=${ev.name}
              />
              <input
                type="text"
                name="imageUrl"
                id="event-image"
                placeholder="Event Image"
                .value=${ev.imageUrl}
              />
              <input
                type="text"
                name="category"
                id="event-category"
                placeholder="Category"
                .value=${ev.category}
              />


              <textarea
                id="event-description"
                name="description"
                placeholder="Description"
                rows="5"
                cols="50"
                .value=${ev.description}
              ></textarea>
              
              <label for="date-and-time">Event Time:</label>
              <input
              type="text"
              name="date"
              id="date"
              placeholder="When?"
              .value=${ev.date}
            />

              <button type="submit">Edit</button>
            </form>
          </div>
        </section>
`

async function onEdit(data, event){
    const dataId = document.querySelector('form.edit-form').getAttribute('data-id');

    if(!data.name || !data.imageUrl || !data.category || !data.description || !data.date){
        return alert('All field must be filled!');
    };

    await put(url + dataId,data);
    page.redirect(`/events/${dataId}`)
}

export async function showEdit(ctx){
    const id = ctx.params.id;
    const data = await get(url + id);
    render(editForm(data));
}