const form = document.querySelector("form");
const url = `http://localhost:3030/jsonstore/collections/myboard/posts`;
const sendButton = document.getElementsByClassName("public");
const cancelButton = document.getElementsByClassName('cancel')
const main = document.querySelector("main");
const topicName = document.getElementById("topicName");
const userName = document.getElementById("username");
const comment = document.getElementById("postText");

form.addEventListener("click", preventEvent);
function preventEvent(event) {
  event.preventDefault();
}

sendButton[0].addEventListener("click", sendPost);
cancelButton[0].addEventListener('click', delContent);

function delContent() {
  topicName.value = '';
  userName.value = '';
  comment.value = '';
}

async function sendPost() {
  if (!topicName.value || !userName.value || !comment.value) {
    return;
  }

  let data = {
    topicName: topicName.value,
    username: userName.value,
    postText: comment.value,
  };
  try {
    let res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "applicaiton/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      let er = res.message;
      throw new Error(er);
    }
    let d = await res.json();
    let time = currentTime();
    console.log(time);
    let topic = createTopic(
      topicName.value,
      userName.value,
      d._id,
      time
    );
    main.appendChild(topic);
    topicName.value = "";
    userName.value = '';
    comment.value = '';
  } catch (error) {
    console.log("Error:", error.message);
  }
}

function createTopic(topicName, username, id, timeZone) {
  let borderDiv = document.createElement("div");
  borderDiv.className = 'new-topic-border'

  let outerDiv = document.createElement("div");
  outerDiv.className = "topic-title";
  outerDiv.dataset._id = id;

  let innerDiv = document.createElement("div");
  innerDiv.className = 'topic-container'

  let h2 = document.createElement('h2');
  h2.className = 'topic-name';
  h2.textContent = topicName;

  let p1 = document.createElement('p');
  p1.textContent = `Date: ${timeZone}`;
  let p2 = document.createElement('p');
  p2.textContent = `Username: ${username}`;

    outerDiv.appendChild(h2);
    innerDiv.appendChild(p1);
    innerDiv.appendChild(p2);
    outerDiv.appendChild(innerDiv);
    borderDiv.appendChild(outerDiv);

  return borderDiv;
}

function currentTime(){

  let date = new Date();
  const day = date.getDate();
  const year = date.getFullYear();
  const month = date.getMonth();
  const hours = date.getHours();
  const min = date.getMinutes();
  const mili = date.getMilliseconds();

  let string = `${year}-${day}-${month+1}T${hours}:${min}:${mili}Z`
  return string;
}