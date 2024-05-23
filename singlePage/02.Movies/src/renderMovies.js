
const url = `http://localhost:3030/data/movies`;
export async function getMovies() {
  const userList = document.getElementById("movies-list");

  const res = await fetch(url);
  const movies = await res.json();
  userList.replaceChildren(...movies.map(createMovies));
}

function createMovies(data) {
  let li = document.createElement("li");
  li.classList = 'card mb-4';
  li.innerHTML = `
    <img class="card-img-top" src="${data.img}" alt="Card image cap" width="400">
      <div class="card-body">
       <h4 class="card-title">${data.title}</h4>
         <a href="#"></a>
      </div>
    `;

    let div = document.createElement('div');
    div.classList = 'card-footer';
    div.dataset.id = data._id;
    div.dataset.ownerId = data._ownerId;

    let button = document.createElement('button');
    button.classList = 'btn btn-info';
    button.textContent = 'Details';
    button.addEventListener('click', sendToDetails);

    div.appendChild(button);
    li.appendChild(div);

  return li;
}

function hasUser(id){
    const userData = JSON.parse(sessionStorage.getItem("user"));
    return userData != null? userData._id == id : false;
}

async function sendToDetails (event){
    
    document.querySelectorAll("section").forEach((x) => (x.style.display = "none"));
    const movieDetailContainer = document.getElementById('movie-example');
    movieDetailContainer.style.display = 'inline-block';
    movieDetailContainer.innerHTML = '';

    const eventParent = event.target.parentElement;
    const id = eventParent.dataset.id;
    const ownerId = eventParent.dataset.ownerId;
   
    const res = await fetch(url + '/' + id);
    const movie = await res.json();

    const userTrue =  hasUser(ownerId)//sessionStorage id to do
    console.log(userTrue);

    const div = document.createElement('div');
    div.classList = 'container';

    div.innerHTML = `
    <div class="row bg-light text-dark">
            <h1>Movie title: ${movie.title}</h1>

            <div class="col-md-8">
              <img
                class="img-thumbnail"
                src="${movie.img}"
                alt="Movie"
              />
            </div>
            <div class="col-md-4 text-center">
              <h3 class="my-3">Movie Description</h3>
              <p>
                ${movie.description}
              </p>
            </div>
          </div>
    `;

    let aDel = document.createElement('a');
    aDel.classList = 'btn btn-danger';
    aDel.dataset.id = movie._id;
    aDel.dataset.ownerId = movie._ownerId;
    aDel.textContent = 'Delete';

    let aEdit = document.createElement('a');
    aEdit.classList = 'btn btn-warning';
    aEdit.dataset.id = movie._id;
    aEdit.dataset.ownerId = movie._ownerId;
    aEdit.textContent = 'Edit';

    let aLike = document.createElement('a');
    aLike.classList = 'btn btn-primary';
    aLike.dataset.id = movie._id;
    aLike.dataset.ownerId = movie._ownerId;
    aLike.textContent = 'Like';

    let span = document.createElement('span');
    span.classList = 'enrolled-span';
    span.textContent = 'Liked 1';
    

    
    movieDetailContainer.appendChild(div);
    let div1 = document.getElementsByClassName('col-md-4');
    div1[0].appendChild(aDel);
    div1[0].appendChild(aEdit);
    div1[0].appendChild(aLike);
    div1[0].appendChild(span);

    if(userTrue){
        aDel.style.display = 'inline-block';
        aEdit.style.display = 'inline-block';
    }else{
        aDel.style.display = 'none';
        aEdit.style.display = 'none';
    }
    
}