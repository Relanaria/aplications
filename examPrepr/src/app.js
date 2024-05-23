import { createCharTemp } from './views/addChar.js';
import { showDetail } from './views/showDetails.js';
import { showRegister } from './views/register.js';
import { showChars } from './views/characters.js';
import { showLogin } from './views/login.js';
import { showEdit } from './views/edit.js';
import { showHome } from './views/home.js';
import { checkForUsers } from './util.js';
import { logout } from './data/users.js';
import {page} from './lib.js'

import * as api from './data/getDetails.js'
// remove this imports after testing 
// to here

window.api = api

page('/', showHome, checkForUsers);
page('/login', showLogin);
page('/register', showRegister);
page('/characters', showChars)
page('/addChar', createCharTemp)
page('/characters/:id', showDetail)
page('/edit/:id', showEdit)

page.start();

const logoutRef  = document.querySelector('a[data-id="logout"]');

logoutRef.addEventListener('click',async function (){

    await logout();
    checkForUsers();
    page.redirect('/')
})



