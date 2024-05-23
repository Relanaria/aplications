import {getUserData, createSubmitHandler} from '../util.js'
import { html, render, page } from "../lib.js";
import { register } from "../users.js";

const templateReg = () => html `
        <section id="register">
          <div class="form">
            <h2>Register</h2>
            <form @submit=${createSubmitHandler(onRegister)} class="register-form">
              <input
                type="text"
                name="email"
                id="register-email"
                placeholder="email"
              />
              <input
                type="password"
                name="password"
                id="register-password"
                placeholder="password"
              />
              <input
                type="password"
                name="re-password"
                id="repeat-password"
                placeholder="repeat password"
              />
              <button type="submit">register</button>
              <p class="message">Already registered? <a href="/login">Login</a></p>
            </form>
          </div>
        </section>
`;

export function showRegister(){
    render(templateReg());
}

async function onRegister(data){
  if(!data.email || !data.password){
    return alert('All field must be filled!')
  };

  if(data.password != data['re-password']){
    return alert('Passwords don\'t match!')
  };
  await register(data);
  page.redirect('/');
}