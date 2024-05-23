import { html, page, render } from "../lib.js";
import { getUserData } from "../util.js";
import {
  getCharByID,
  delChar,
  getLikes,
  getUserLike,
  likeCharById,
} from "../data/getDetails.js";

let user;

const tempDetails = (char, btns, goBtn, likes) => html`
  <section id="details">
    <div id="details-wrapper">
      <img id="details-img" src="${char.imageUrl}" alt="example1" />
      <div>
        <p id="details-category">${char.category}</p>
        <div id="info-wrapper">
          <div id="details-description">
            <p id="description">${char.description}</p>
            <p id="more-info">${char.moreInfo}</p>
          </div>
        </div>
        <h3>Is This Useful:<span id="likes">${likes}</span></h3>
        ${btns ? userB(char) : null} 
        ${goBtn ? userLike(char) : null}
      </div>
    </div>
  </section>
`;

function userB(data) {
  return html`
    <div id="action-buttons">
      <a href="/edit/${data._id}" data-id=${data._id} id="edit-btn">Edit</a>
      <a href="" @click=${onDel} data-id=${data._id} id="delete-btn">Delete</a>
    </div>
  `;
}

function userLike(data) {
    return html`
      <div id="action-buttons">
        <a href="javascript:void(0)" @click=${toggleGoingBtn} display="block" id="like-btn" data-charId=${data._id}>Like</a>
      </div>
    `;
}

async function toggleGoingBtn(event) {
  const charId = event.target.getAttribute('data-charId');
  await likeCharById(charId);
  page.redirect(`/characters/${charId}`);
}

async function onDel(event) {
  const dataId = event.target.getAttribute("data-id");
  const confirmDel = confirm("Are you sure you want to delete char?");
  if (confirmDel) {
    await delChar(dataId);
    page.redirect("/characters");
  }
}

export async function showDetail(ctx) {
  const id = ctx.params.id;
  const data = await getCharByID(id);
  const numberOfLikes = await getLikes(id);
  user = getUserData();

  
  const edinDelBtns = data._ownerId == user?._id;
  let likeBtn = false;
  if (user) {
    let userLike = await getUserLike(id, user._id);
    if (data._ownerId != user._id && userLike == 0) {
      likeBtn = true;
    }
  }
  render(tempDetails(data, edinDelBtns, likeBtn, numberOfLikes));
}
