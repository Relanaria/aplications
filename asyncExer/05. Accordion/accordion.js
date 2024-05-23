function solution() {
  const url = `http://localhost:3030/jsonstore/advanced/articles/list`;
  const mainSection = document.getElementById("main");
  window.addEventListener("load", createArticles);

  async function getArticles(url) {
    try {
      let res = await fetch(url);
      if (!res.ok) {
        let err = await res.json();
        throw new Error(err.message);
      }
      let data = await res.json();
      return data;
    } catch (error) {
      console.log("Error:", error.message);
    }
  }

  async function createArticles() {
    const url1 = `http://localhost:3030/jsonstore/advanced/articles/details/`;
    const articles = await getArticles(url);
    mainSection.innerHTML = "";
    for (const arti of Object.values(articles)) {
      let div = document.createElement("div");
      div.className = "accordion";

      let div1 = document.createElement("div");
      div1.className = "head";

      let span = document.createElement("span");
      span.textContent = arti.title;

      let button = document.createElement("button");
      button.className = "button";
      button.dataset.id = arti._id;
      button.textContent = "MORE";
      button.addEventListener("click", showHiddenInfo);

      let hiddenDiv = document.createElement("div");
      hiddenDiv.className = "extra";

      let context = await getArticles(url1 + arti._id);
      console.log(context);
      let p = document.createElement("p");
      p.textContent = context.content;

      hiddenDiv.appendChild(p);

      div1.appendChild(span);
      div1.appendChild(button);
      div1.appendChild(hiddenDiv);

      div.appendChild(div1);
      mainSection.appendChild(div);
    }
  }

  function showHiddenInfo(event) {
    let b = event.target;
    const headDiv = b.closest("div");
    const hiddenDiv = headDiv.lastChild;
    hiddenDiv.style.display = "block";
    b.textContent = "LESS";
    b.removeEventListener("click", showHiddenInfo);
    b.addEventListener("click", hideHiddenInfo);
  }
  
  function hideHiddenInfo(event) {
    let b = event.target;
    const headDiv = b.closest("div");
    const hiddenDiv = headDiv.lastChild;
    hiddenDiv.style.display = "none";
    b.textContent = "MORE";
    b.removeEventListener("click", hideHiddenInfo);
    b.addEventListener("click", showHiddenInfo);
  }
}

solution();
