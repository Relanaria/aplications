import { getUserData } from "./util.js";
import { showHome } from "./views/home.js";
import { page } from "./lib.js";


page('/', showHome);
page.start();
// const userData = getUserData();
// if (userData) {
//   document.getElementsByClassName("user")[0].style.display = "block";
//   document.getElementsByClassName("guest")[0].style.display = "none";
// } else {
//   document.getElementsByClassName("user")[0].style.display = "none";
//   document.getElementsByClassName("guest")[0].style.display = "block";
// }
