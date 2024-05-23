import { logout } from "../users.js";
import { page } from "../lib.js";
import { checkForUsers } from "../util.js";
const logoutRef  = document.querySelector('a[data-id="logout"]');

logoutRef.addEventListener('click',async function (){

    await logout();
    checkForUsers();
    page.redirect('/')
})