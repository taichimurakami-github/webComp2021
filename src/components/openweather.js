export const openWheather = async () => {

  const API_KEY = "69a4ad19c9fe400e6ae157bd37a70024";

  const locationData = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  })
  const lat = locationData.coords.latitude;
  const lon = locationData.coords.longitude;
  const requestURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&lang=ja&exclude=minutely,hourly&appid=${API_KEY}`
  console.log(requestURL);

  await fetch(requestURL)
    .then(res => {
      return res.json();
    })
    .then(result => {
      console.log(JSON.stringify(result));
    })
}