import { html, render } from "../node_modules/lit-html/lit-html.js";
import { get, post, del, put } from "./request.js";

const url = `http://localhost:3030/jsonstore/collections/books`;
const root = document.querySelector('body');
const startTemplate = html`
  <button @click=${loadBooks} id="loadBooks">LOAD ALL BOOKS</button>
  <table>
    <thead>
      <tr>
        <th>Title</th>
        <th>Author</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody></tbody>
  </table>

  <form @submit=${addBooks} id="add-form">
    <h3>Add book</h3>
    <label>TITLE</label>
    <input type="text" name="title" placeholder="Title..." />
    <label>AUTHOR</label>
    <input type="text" name="author" placeholder="Author..." />
    <input type="submit" value="Submit" />
  </form>
`;

const editForm = (book) => html `
  <button @click=${loadBooks} id="loadBooks">LOAD ALL BOOKS</button>
  <table>
    <thead>
      <tr>
        <th>Title</th>
        <th>Author</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody></tbody>
  </table>
<form id="edit-form">
        <input type="hidden" name="id">
        <h3>Edit book</h3>
        <label>TITLE</label>
        <input .value=${book.title} type="text" name="title" placeholder="Title...">
        <label>AUTHOR</label>
        <input .value=${book.author} type="text" name="author" placeholder="Author...">
        <input @click=${onEdit} id=${book._id} type="submit" value="Save">
    </form>
`

const tableLoadBooks = (books) => html`
  <tr>
    <td>${books[1].title}</td>
    <td>${books[1].author}</td>
    <td>
      <button id=${books[0]} @click=${renderEdit}>Edit</button>
      <button id=${books[0]} @click=${delBook}>Delete</button>
    </td>
  </tr>
`;

async function onEdit(event){
  event.preventDefault();
  const id = event.target.id;
  const form = document.getElementById('edit-form');
 
  const book = new FormData(form);
  const data = {
    author: book.get("author").trim(),
    title: book.get("title").trim(),
  };

  await put(url + `/${id}`, data);
  render(startTemplate, root);
  loadBooks();
}

 async function renderEdit(event) {
  const id = event.target.id;
  const curBook = await get(url +'/' + id);
  render(editForm(curBook), root);
  loadBooks();
}

async function delBook(event){
  const btnID = event.target.id;
  await del(url + '/' + btnID);
  loadBooks();
}

async function loadBooks() {
  const books = Object.entries(await get(url));
  const bookRoot = document.querySelector("table tbody");
  render(books.map(tableLoadBooks), bookRoot);
}

async function addBooks(event) {
  event.preventDefault();
  const book = new FormData(event.target);
  const data = {
    author: book.get("author").trim(),
    title: book.get("title").trim(),
  };
 
  if(data.author == '' || data.title == ''){
    return;
  }
  await post(url, data);
  event.target.reset();
}

export { startTemplate };
