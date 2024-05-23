import { showDetail } from "./views/showDetails.js";
import { showRegister } from "./views/register.js";
import { createEvent } from "./views/addEvent.js";
import { showEvents } from "./views/events.js";
import { showLogin } from "./views/login.js";
import { showHome } from "./views/home.js";
import { showEdit } from "./views/edit.js";
import { checkForUsers } from "./util.js";
import { page } from "./lib.js";
import './views/logout.js';


page.redirect('/');
page('/', showHome, checkForUsers);
page('/login', showLogin);
page('/register', showRegister);
page('/events', showEvents);
page('/addEvent', createEvent);
page('/events/:id', showDetail);
page('/edit/:id', showEdit);

page.start();



