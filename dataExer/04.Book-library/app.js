const form = document.querySelector("form");
const buttonForm = document.querySelectorAll("form button");
const btnLoad = document.getElementById("loadBooks");
const tbody = document.querySelector("table tbody");
const h3 = document.getElementsByTagName("h3");
const url = `http://localhost:3030/jsonstore/collections/books`;
const urlUpdate = `http://localhost:3030/jsonstore/collections/books`;
const inputT = document.getElementsByName("title");
const inputA = document.getElementsByName("author");
let id = '';

function solver() {
  form.addEventListener("submit", createBook);
  btnLoad.addEventListener("click", loadBooks);
}

solver();

async function createBook(event) {
  event.preventDefault();
  if (buttonForm[0].textContent === "Save") {
  const newUrl = url + "/" + id;

  let data = {
    author: inputA[0].value.trim(),
    title: inputT[0].value.trim(),
  };
  try {
    let res = await fetch(newUrl, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      let err = await res.json();
      throw new Error(err.message);
    }
  } catch (error) {
    console.log("Error:", error.message);
  }
  h3[0].textContent = "FORM";
  buttonForm[0].textContent = "Submit";
  } else {
    let data = new FormData(form);
    const { author, title } = Object.fromEntries(data.entries());

    if (!author || !title) {
      throw new Error("Epty fields!");
    }
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ author: author.trim(), title: title.trim() }),
      });
      if (!res.ok) {
        throw new Error("Post denied!");
      }
    } catch (error) {
      console.log("Error:", error.message);
    }
  }
  inputT[0].value = '';
  inputA[0].value = '';
}

async function loadBooks(event) {
  try {
    let res = await fetch(url);

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message);
    }

    let data = await res.json();
    tbody.innerHTML = "";
    for (const [id, book] of Object.entries(data)) {
      createTableRow(book.author, book.title, id);
    }
  } catch (error) {
    console.log("Error:", error);
  }
}

function createTableRow(author, title, id) {
  let row = tbody.insertRow();
  let editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.dataset._id = id;
  editBtn.addEventListener("click", editBook);

  let deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.dataset._id = id;
  deleteBtn.addEventListener("click", deleteBook);

  row.insertCell().textContent = title;
  row.insertCell().textContent = author;
  let cell = row.insertCell();

  cell.appendChild(editBtn);
  cell.appendChild(deleteBtn);
}

async function editBook(event) {
  id = event.target.dataset._id;
  h3[0].textContent = "Edit FORM";
  const tr = event.target.closest("tr");
  const data = tr.querySelectorAll("td");
  inputT[0].value = data[0].textContent;
  inputA[0].value = data[1].textContent;
  buttonForm[0].textContent = "Save";
}

async function deleteBook(event) {
  let id = event.target.dataset._id;
  const tr = event.target.closest("tr");
  tr.remove();
  await fetch(url + "/" + id, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
}

