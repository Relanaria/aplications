import { html, render, page } from "../lib.js";
import { login } from "../users.js";
import {getUserData, createSubmitHandler, checkForUsers} from '../util.js'

const url = ``;
const templateLogin = () => html `
<section @submit=${createSubmitHandler(onLogin)} id="login">
          <div class="form">
            <h2>Login</h2>
            <form class="login-form">
              <input type="text" name="email" id="email" placeholder="email" />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
              />
              <button type="submit">login</button>
              <p class="message">
                Not registered? <a href="/register">Create an account</a>
              </p>
            </form>
          </div>
        </section>
`

export function showLogin(){
    render(templateLogin());
}

async function onLogin(data){

  if(!data.email || !data.password){
    return alert('All fields must be filled!')
  }

  await login(data);
    checkForUsers()
    page.redirect('/')
  }