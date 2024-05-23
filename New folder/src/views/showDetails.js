import { html, page, render } from "../lib.js";
import { get, del } from "../request.js";
import { getUserData } from "../util.js";

const url = `http://localhost:3030/data/events/`;
let user;

const tempDetails = (ev, btns, goBtn) => html` <section id="details">
  <div id="details-wrapper">
    <img id="details-img" src="${ev.imageUrl}" alt="example1" />
    <p id="details-title">${ev.name}</p>
    <p id="details-category">
      Category: <span id="categories">${ev.category}</span>
    </p>
    <p id="details-date">Date:<span id="date">${ev.date}</span></p>
    <div id="info-wrapper">
      <div id="details-description">
        <span>${ev.description}</span>
      </div>
    </div>

    <h3>Going: <span id="go">0</span> times.</h3>

    <!--Edit and Delete are only for creator-->
    <div id="action-buttons">
    ${btns ? userB(ev) : ""}
    ${goBtn ? userGoing(): ''}
      <!--Bonus - Only for logged-in users ( not authors )-->
      
    </div>
  </div>
</section>`;

function userB(data) {
  return html`
    <a href="/edit/${data._id}" data-id=${data._id} id="edit-btn">Edit</a>
    <a href="" @click=${onDel} data-id=${data._id} id="delete-btn">Delete</a>
  `;
}

function userGoing(){
    return html `
    <a href="" @click=${toggleGoingBtn} display="block" id="go-btn">Going</a>
    `
}

function toggleGoingBtn(event){
    console.log(event.target.style.display);
    const isHidden = event.target.style.display;
    
        event.target.style.display = 'none'
    
}

async function onDel(event){
    const dataId = event.target.getAttribute('data-id');
    await del(url + dataId);
    page.redirect('/events');
}


export async function showDetail(ctx) {
  const id = ctx.params.id;
  const data = await get(url + id);
  user = getUserData();
  const edinDelBtns = data._ownerId == user?._id;
  let goingBtn = false;
  if(user){
    if(data._ownerId != user._id){
        goingBtn = true;
    }
  }
  render(tempDetails(data, edinDelBtns, goingBtn));
}
