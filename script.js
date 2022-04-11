// JavaScript Final Project by Marisol D Rodriguez - Making an Interactive Map
// All criteria met with the exception of the final one (rendering markers for businesses closest to the user). Comments have been left below to explain my thought process.

// Test the script file is properly linked to the HTML file
// function loadPage (){

//     console.log('Hello World!')
// }
// loadPage()

// geolocation
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert(`Geolocation is not supported by this browser.`);
  }
}

async function showPosition(position) {
  console.log(
    "Latitude: " +
      position.coords.latitude +
      "   Longitude: " +
      position.coords.longitude
  );
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  // create map
  // let myMap = L.map("map").setView([position.coords.latitude, position.coords.longitude], 13);
  let myMap = L.map("map").setView([latitude, longitude], 13);

  // add openstreetmap tiles
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    minZoom: "10",
  }).addTo(myMap);

  // create and main add geolocation marker
  const marker = L.marker([
    position.coords.latitude,
    position.coords.longitude,
  ]);
  marker.addTo(myMap).bindPopup("<p1><b>You are here!</b></p1>").openPopup();

  // Fetch data for coffee shops using Foursquare API. You'll will find data to user location in console according to line 61

  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: "fsq3oQ0P37mHjcsuE2Yzjj77eMGjCYBOBAAYW6EVi5+9vNo=",
    },
  };

  await fetch(
    `https://api.foursquare.com/v3/places/search?query=coffee-shop&ll=${latitude}%2C${longitude}&limit=5`,
    options
  )
    .then((response) => response.json())
    .then((response) => console.log(response))
    // const cS1 = console.log(response.results[0].name);
    // console.log(
    //   response.results[1].name,
    //   response.results[1].geocodes.main.latitude,
    //   response.results[1].geocodes.main.longitude)

    .catch((err) => console.error(err));

  // add event listener to select/option dropdown and marker rendition code
  // I've successfully added an event listener to the select options and rendered markers specific to my location. Still need to pull out data from fetch to make this dynamic. I get an error when I substitute:
  // response.results[1].name,
  //   response.results[1].geocodes.main.latitude,
  //   response.results[1].geocodes.main.longitude

  const businesses = document.getElementById("business");
  // console.log(businesses);
  businesses.addEventListener("change", async (event) => {
    const cS1 = L.marker([35.326911, -80.647904]).bindPopup(
      "Rocky River Coffee Co."
    );
    const cS2 = L.marker([35.282833, -80.669491]).bindPopup("Starbucks");
    const cS3 = L.marker([35.315318, -80.674616]).bindPopup("Starbucks");
    const cS4 = L.marker([35.322188, -80.644918]).bindPopup("Chick-Fil-A");
    const cS5 = L.marker([35.321531, -80.659629]).bindPopup(
      "Sunflour Baking Company"
    );

    const coffeeShops = L.layerGroup([cS1, cS2, cS3, cS4, cS5]).addTo(myMap);
  });

  // Fetch data for restaurants using Foursquare API. You'll will find data to user location in console according to line 106
  const optionsR = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: "fsq3oQ0P37mHjcsuE2Yzjj77eMGjCYBOBAAYW6EVi5+9vNo=",
    },
  };

  fetch(
    `https://api.foursquare.com/v3/places/search?query=restaurant&ll=${latitude}%2C${longitude}&limit=5`,
    optionsR
  )
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));

  // Fetch data for hotel using Foursquare API. You'll will find data to user location in console according to line 123
  const optionsH = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: " fsq3oQ0P37mHjcsuE2Yzjj77eMGjCYBOBAAYW6EVi5+9vNo=",
    },
  };

  fetch(
    `https://api.foursquare.com/v3/places/search?query=hotel&ll=${latitude}%2C${longitude}&limit=5`,
    optionsH
  )
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));

  // Fetch data for supermarkets using Foursquare API. You'll will find data to user location in console according to line 140
  const optionsS = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: " fsq3oQ0P37mHjcsuE2Yzjj77eMGjCYBOBAAYW6EVi5+9vNo=",
    },
  };

  fetch(
    `https://api.foursquare.com/v3/places/search?query=supermarket&ll=${latitude}%2C${longitude}&limit=5`,
    optionsS
  )
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}

// Unable to extract the business data. This is what the function should look like.
function getBusinessData() {
  let businesses = data.map((element) => {
    let markerLocation = {
      name: element.name,
      lat: element.geocodes.main.latitude,
      long: element.geocodes.main.longitude,
    };
    console.log(markerLocation);
  });
  console.log(businesses);
}
