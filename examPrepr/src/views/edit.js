import { html, page, render } from "../lib.js";
import { getCharByID, updateChar } from "../data/getDetails.js";
import { createSubmitHandler, getUserData } from "../util.js";


const editForm = (char) => html `
<section id="edit">
          <div class="form">
            <img class="border" src="./images/border.png" alt="">
            <h2>Edit Character</h2>
            <form @submit=${createSubmitHandler(onEdit)} class="edit-form" data-id=${char._id}>
              <input
              type="text"
              name="category"
              id="category"
              placeholder="Character Type"
              .value=${char.category}
            />
            <input
              type="text"
              name="image-url"
              id="image-url"
              placeholder="Image URL"
              .value=${char.imageUrl}
            />
            <textarea
            id="description"
            name="description"
            placeholder="Description"
            rows="2"
            cols="10"
            .value=${char.description}
          ></textarea>
          <textarea
            id="additional-info"
            name="additional-info"
            placeholder="Additional Info"
            rows="2"
            cols="10"
            .value=${char.moreInfo}
          ></textarea>
              <button type="submit">Edit</button>
            </form>
            <img class="border" src="./images/border.png" alt="">
          </div>
        </section>
`

async function onEdit(data, event){
    const dataId = document.querySelector('form.edit-form').getAttribute('data-id');
    if(!data.category || !data['image-url'] || !data.description || !data['additional-info']){
      return alert('All field must be filled!');
    }
  
    const charData = {
      category: data.category,
      imageUrl: data['image-url'],
      description: data.description,
      moreInfo: data['additional-info']
    }
    await updateChar(dataId, charData);
    page.redirect(`/characters/${dataId}`)
}

export async function showEdit(ctx){
    const id = ctx.params.id;
    const data = await getCharByID(id);
    render(editForm(data));
}