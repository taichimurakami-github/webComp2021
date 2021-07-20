import { environmentDataList as ev } from "./search-data";

export const openWeather = async () => {

  const getWheatherName = (d) => {
    //百の位を抽出し、各グループ群で処理
    switch (Math.floor(d * 0.01)) {
      case 2:
        return ev.weather.thunderstorm;//雷雨

      case 3:
        return ev.weather.drizzle;//霧雨

      case 5:
        return ev.weather.rain;

      case 6:
        return ev.weather.snow;

      case 7:
        return ev.weather.atmosphere;//煙い、きり、竜巻、等の特殊気象条件下の時

      case 8:
        return (d === 800) ? ev.weather.clear : ev.weather.clouds;//d=800のときのみ晴れ、それ以外は曇り

      default:
        throw new Error("Error at getWheatherName() in opehwheather.js");
    }
  }

  /**
   * 今の季節を取得する関数
   */
  const getSeasonalData = () => {
    const now = new Date();
    const month = now.getMonth() + 1;

    if (4 <= month && month <= 5) return ev.season.spring;
    if (6 <= month && month <= 8) return ev.season.summer;
    if (9 <= month && month <= 11) return ev.season.autumn;

    return ev.season.winter;
  }

  /**
   * 今の時間帯情報を取得する関数
   */
  const getTimeData = () => {
    const now = new Date();
    const hours = now.getHours();

    if (0 <= hours && hours < 5) return ev.time.midnight;
    if (5 <= hours && hours < 9) return ev.time.morning;
    if (9 <= hours && hours < 12) return ev.time.beforenoon;
    if (12 <= hours && hours < 16) return ev.time.afternoon;
    if (16 <= hours && hours < 20) return ev.time.evening;
    if (20 <= hours) return ev.time.night;
  }

  const API_KEY = "69a4ad19c9fe400e6ae157bd37a70024";

  const locationData = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  })
  const lat = locationData.coords.latitude;
  const lon = locationData.coords.longitude;
  const requestURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&lang=ja&exclude=daily,hourly,minutely&appid=${API_KEY}`;

  //現在地付近の現在の天気情報を返す
  const weatherDataFromAPI = await fetch(requestURL)
    .then(res => {
      //responseを受け取る
      return res.json();
    })
    .then(result => {
      //responceをオブジェクトに変換
      return JSON.parse(JSON.stringify(result, null, "    "));
    });

  const environmentData = {
    weather: getWheatherName(weatherDataFromAPI.current.weather[0].id),
    season: getSeasonalData(),
    time: getTimeData()
  };
  console.log("環境情報取得結果:", environmentData);
  return environmentData;
}