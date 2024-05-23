
const templateHome = html `
<section id="home">
<div class="home-intro">
  <h1 class="fancy">Welcome to our community-driven events website! We believe that the best events
    come from the community.</h1>
     
     <p>So why wait? Join our community today and start 
       discovering and sharing the best events in your area!</p>
       <a class="event-btn" href="#">To Events</a>       
</div>
<img class="party-img" src="./images/party people.png" alt="event">
</section>
`;

const templateReg = html `
        <section id="register">
          <div class="form">
            <h2>Register</h2>
            <form class="register-form">
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
              <p class="message">Already registered? <a href="#">Login</a></p>
            </form>
          </div>
        </section>
`

const templateLogin = html `
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
                Not registered? <a href="#">Create an account</a>
              </p>
            </form>
          </div>
        </section>
`

const tempEvents = html `
<section id="dashboard">
          <!-- Display a div with information about every post (if any)-->
          <div class="event">
            <img src="./images/large_deniroparty_marquee.jpg" alt="example1" />
            <p class="title">
              Robert De Niro Themed Party
            </p>
            <p class="date">15.04.2023 from 17:00</p>
            <a class="details-btn" href="">Details</a>
          </div>
          <div class="event">
            <img src="./images/pexels-run-ffwpu-2530130 (1).jpg" alt="example1" />
            <p class="title">
              Fun Run
            </p>
            <p class="date">19.04.2023 from 13:00</p>
            <a class="details-btn" href="">Details</a>
          </div><div class="event">
            <img src="./images/pexels-victoria-akvarel-4873622.jpg" alt="example1" />
            <p class="title">
            Art & Wine
            </p>
            <p class="date">17.04.2023 from 18:00</p>
            <a class="details-btn" href="">Details</a>
          </div>
        </section>
`
const tempCreate = html `
   <section id="create">
          <div class="form">
            <h2>Add Event</h2>
            <form class="create-form">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Event"
              />
              <input
                type="text"
                name="imageUrl"
                id="event-image"
                placeholder="Event Image URL"
              />
              <input
                type="text"
                name="category"
                id="event-category"
                placeholder="Category"
              />


              <textarea
                id="event-description"
                name="description"
                placeholder="Description"
                rows="5"
                cols="50"
              ></textarea>
              
              <input
              type="text"
              name="date"
              id="date"
              placeholder="When?"
            />

              <button type="submit">Add</button>
            </form>
          </div>
        </section>
`
