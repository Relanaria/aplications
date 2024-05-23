function solve() {
  const departBtn = document.getElementById("depart");
  const arriveBtn = document.getElementById("arrive");
  const infoDisplay = document.querySelector("#info span");
  const stop = {
    current: '',
    nextStop: 'depot'
  }

  async function depart() {
    try {
      let url = `http://localhost:3030/jsonstore/bus/schedule/${stop.nextStop}`;

      
      const response = await fetch(url);
      const data = await response.json();
      
      stop.current = data.name;
      stop.nextStop = data.next;
      infoDisplay.textContent = `Next stop ${data.name}`;
      
      arriveBtn.disabled = false;
      departBtn.disabled = true;
    } catch (error) {
      arriveBtn.disabled = true;
      departBtn.disabled = true;
      infoDisplay.textContent = "Error";
    }
  }

  function arrive() {
    arriveBtn.disabled = true;
    departBtn.disabled = false;

    infoDisplay.textContent = `Ariving at ${stop.current}`;
  }

  return {
    depart,
    arrive,
  };
}

let result = solve();
