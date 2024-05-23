function attachEvents() {
  const inputLocation = document.getElementById("location");
  const getWeather = document.getElementById("submit");
  const current = document.getElementById("current");
  const upcoming = document.getElementById('upcoming');
  const forecast = document.getElementById("forecast");

  const icon = {
    Sunny: "☀",
    Partly_sunny: "⛅",
    Overcast: "☁",
    Rain: "☂",
    Degrees: "°",
    display: forecast,
  };

  getWeather.addEventListener("click", async function () {
    const valueLocation = inputLocation.value;
    const code = await reqWeather(valueLocation);
    const todaytWethr = await todayWether(code);
    const upcomingWeth = await upcomingWether(code);
    createTodaySpan(todaytWethr, current, icon);
    createUpcomingSpan(upcomingWeth, upcoming, icon)
  });
}
// request todays wether
async function todayWether(code) {
    try {
        const response = await fetch(
            `http://localhost:3030/jsonstore/forecaster/today/${code}`
          );
          const data = await response.json();
          return data;
    } catch (error) {
        console.log('Error');
    }
  }

//request upcoming wether
async function upcomingWether(code) {
    try {
        
        const response = await fetch(
            `http://localhost:3030/jsonstore/forecaster/upcoming/${code}`
          );
          const data = await response.json();
          return data;
    } catch (error) {
        console.log('Error');
    }
}

// request location check
async function reqWeather(location) {
  try {
    const response = await fetch(
      "http://localhost:3030/jsonstore/forecaster/locations"
    );
    const data = await response.json();

    for (const token of Object.entries(data)) {
      if (token[1].name === location) {
        return token[1].code;
      }
    }
  } catch (error) {
    console.log("error");
  }
}

// crate upcoming span wether
function createUpcomingSpan({ forecast, name }, reference, icon) {
    let div = document.createElement('div');
    div.className = 'forecast-info';
    console.log(forecast);
    div.replaceChildren(...forecast.map(spanFromArray(icon)))// TODO
    reference.appendChild(div);
}

function spanFromArray([conditon, high, low], icon) {
    console.log(conditon, high,low);
    let upcomingSpan = document.createElement("span");
    upcomingSpan.className = "upcoming";

    let upcomingSybolSpan = document.createElement("span");
    upcomingSybolSpan.textContent = forecast.condition == "Partly sunny" ? icon.Partly_sunny : icon[forecast.condition];
    upcomingSybolSpan.className = "condition symbol";

    let span2 = document.createElement("span");
    span2.textContent = `${low}${icon.Degrees}/${high}${icon.Degrees}`
      span2.className = 'forecast-data';
  
    let span3 = document.createElement("span");
    span3.textContent = conditon;
    span3.className = 'forecast-data';

    upcomingSpan.appendChild(upcomingSybolSpan)
    upcomingSpan.appendChild(span2)
    upcomingSpan.appendChild(span3)

    return upcomingSpan;
    
}

// span generator
function createSpans({ forecast, name }, reference, icon) {
    let conditionSpan = document.createElement("span");
  conditionSpan.className = "condition";

  let span1 = document.createElement("span");
  span1.textContent = name;
  span1.className = 'forecast-data';

  let span2 = document.createElement("span");
  span2.textContent = `${forecast.low}${icon.Degrees}/${forecast.high}${icon.Degrees}`
    span2.className = 'forecast-data';

  let span3 = document.createElement("span");
  span3.textContent = forecast.condition;
  span3.className = 'forecast-data';

  conditionSpan.appendChild(span1)
  conditionSpan.appendChild(span2)
  conditionSpan.appendChild(span3)
  reference.appendChild(conditionSpan)

}
// created todays span wether
function createTodaySpan({ forecast, name }, reference, icon) {
  let conditionSpanSymbol = document.createElement("span");
  conditionSpanSymbol.textContent = forecast.condition == "Partly sunny" ? icon.Partly_sunny : icon[forecast.condition];
  conditionSpanSymbol.className = "condition symbol";
  reference.replaceChildren(conditionSpanSymbol);

  createSpans({ forecast, name }, reference, icon);
  
  icon.display.style.display = "block";
}
attachEvents();
