export function getUserData() {
  return JSON.parse(sessionStorage.getItem("user"));
}

export function saveUserData(data) {
  sessionStorage.setItem("user", JSON.stringify(data));
}

export function clearUserData() {
  sessionStorage.clear();
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