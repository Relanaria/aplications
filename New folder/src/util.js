export function getUserData() {
  return JSON.parse(sessionStorage.getItem("user"));
}

export function saveUserData(data) {
  sessionStorage.setItem("user", JSON.stringify(data));
}

export function clearUserData() {
  sessionStorage.clear();
}

export function checkForUsers(){
  const user = getUserData();
  if(user){
    document.querySelector('div .guest').style.display = 'none';
    document.querySelector('div .user').style.display = 'block';
  }else{
    document.querySelector('div .guest').style.display = 'block';
    document.querySelector('div .user').style.display = 'none';
  }
}

export function createSubmitHandler(callback){

    return function (event){
        event.preventDefault();

        const formData = new FormData(event.target);
        const entries = [...formData.entries()].map(([k,v]) =>  [k, v.trim()]);
        const data = Object.fromEntries(entries);

        callback(data);
    }

}