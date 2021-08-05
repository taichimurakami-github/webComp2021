import { searchDataList as words } from "./search-data";
import { openWeather } from "./openweather";

const createSearchQuery = async (info) => {
  const weather = await openWeather();
  const emotion = info.userData.faceAttributes.emotion.analyzed;
  const lyrics = info.options.lyrics;
  const queryData = {
    genre: "",
    environment: {
      season: "",
      time: "",
    },
    baseword: "",
    subwords: "",
    options: {
      instrumental: "",
    }
  }

  /**
   * 配列を受け取り、その中の要素をランダムで返す
   * @param {array} t 
   * @returns {number}
   */
  const getRandomValueFromArray = (arr) => {
    if (!Array.isArray(arr)) {
      console.log("arg is not array: ", arr);
      throw new Error("An Error has occured at getRandomValueFromArray(): arg is not array");
    }
    const max = arr.length - 1;
    const min = 0;
    //index を乱数で決定
    let i = (max === 0) ? 0 : Math.floor(Math.random() * (max - min) + min);

    return arr[i];
  }

  //genreをゲット
  const selected_emotion = getRandomValueFromArray(emotion);
  queryData.genre = getRandomValueFromArray(words.emotion[selected_emotion]);
  console.log("genre this time:", queryData.genre);

  //疑似ランダム用配列
  const boolean_array = [true, true, false, true, false, true, true, false, false, true];// 60%の確率
  const boolean_array_2 = [true, false, true, true, true, false, true, true, false, true];// 70%の確率

  console.log("availability checker", words.genre[queryData.genre]);

  queryData.baseword = getRandomValueFromArray(words.genre[queryData.genre].keyword);

  //environmentをゲット
  if (words.genre[queryData.genre].availability.season && getRandomValueFromArray(boolean_array)) {
    //seasonをゲット
    queryData.environment.season = getRandomValueFromArray(words.environment.season[weather.season]);
  }

  if (words.genre[queryData.genre].availability.time && getRandomValueFromArray(boolean_array)) {
    //timeをゲット
    queryData.environment.time = getRandomValueFromArray(words.environment.time[weather.time]);
  }

  //instrumentalをゲット
  if (words.genre[queryData.genre].availability.instrumental && !info.options.lyrics) {
    queryData.options.instrumental = getRandomValueFromArray(words.options.instrumental);
  }

  //randomをゲット
  if (words.genre[queryData.genre].availability.random.artist && getRandomValueFromArray(boolean_array_2)) {
    console.log("artist random insert mode")

    if (queryData.genre === "pops") {
      const random_selector = getRandomValueFromArray(["jpop", "kpop"])

      queryData.subwords
        = getRandomValueFromArray(words.random.artist[queryData.genre][random_selector]);
    } else {
      queryData.options.subwords = getRandomValueFromArray(words.random.artist[queryData.genre]);
    }


  }

  console.log("selected query data result:", queryData);
  return (
    queryData.baseword + " "
    + queryData.environment.season + " "
    + queryData.environment.time + " "
    + queryData.subwords + " "
    + queryData.options.instrumental);
}

const search = async (info) => {
  const API_KEY = "AIzaSyAJVy80IB8wtbJwWOok9FgmwQfRXGyaBF8";
  const MAX_RESULTS = 10;
  const QUERY = await createSearchQuery(info);

  if (typeof (QUERY) !== "string") {
    console.log("invalid query type : ", typeof (QUERY));
    throw new Error("An error has occured when creating search query string");
  }

  const URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&order=relevance&maxResults=${MAX_RESULTS}&key=${API_KEY}&q=${QUERY}`;
  const searchResult = await fetch(URL)
    .then(res => {
      return res.json();
    })
    .then(result => {
      return JSON.parse(JSON.stringify(result));
    });

  console.log("search url:", URL);
  console.log(searchResult);
  return {
    result: searchResult,
    keyword: QUERY
  }
}

export { search as searchYoutube };