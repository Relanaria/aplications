import { html, render } from "../lib.js";
import { get } from "../request.js";


const tempEvents = (events) => html `
<section id="dashboard">
          <!-- Display a div with information about every post (if any)-->
          ${events.map(createEvent)};
</section>
`;

const createEvent = (ev) => html `
<div class="event">
            <img src="${ev.imageUrl}" alt="example1" />
            <p class="title">
              ${ev.name}
            </p>
            <p class="date">${ev.date}</p>
            <a class="details-btn" href="/events/${ev._id}">Details</a>
          </div>
`;

const getNoEventsTemplate = () => html `
<section id="dashboard">
 <h2>Current Events</h2>
</section>
 <h4>No Events yet.</h4>
`

export async function showEvents(){

    let events = await get('http://localhost:3030/data/events?sortBy=_createdOn%20desc');
    
    if(events.length == 0){
      render(getNoEventsTemplate());
    }else{
      render(tempEvents(events))
    }
}