import { html, render, page } from "../lib.js";
import { login } from '../data/users.js'
import { getUserData, createSubmitHandler, checkForUsers } from "../util.js";

const templateLogin = () => html`
  <section id="login">
          <div class="form">
            <img class="border" src="./images/border.png" alt="">
            <h2>Login</h2>
            <form  @submit=${createSubmitHandler(onLogin)} class="login-form">
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
            <img class="border" src="./images/border.png" alt="">
          </div>
        </section>
`;

export function showLogin(ctx) {
  render(templateLogin());
}

async function onLogin(data) {
  if (!data.email || !data.password) {
    return alert("All fields must be filled!");
  }

  await login(data);
  checkForUsers();
  page.redirect("/");
}
