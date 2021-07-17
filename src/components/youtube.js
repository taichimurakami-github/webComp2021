import { searchKeywords as words } from "./searchKeywords";


const createSearchQuery = (info) => {
  console.log(info);
  const emotion = words.categolize.emotion.neutral;
  const lyrics = info.options.lyrics;

  const generateIndex = (min, max) => {
    let r = Math.floor(Math.random() * (max + 1 - min)) + min;
    return (r > max) ? r - 1 : r;
  }

  let min = 1;
  let max = emotion.genre.length;
  let num = Math.floor(Math.random() * (max + 1 - min)) + min;
  if (num > max) num--;
  const chosenGenre = words.genre[emotion.genre[num]].keyword[0];

  console.log("genre chosen", chosenGenre);
  // let a = chosenGenre.keyword[0];
  // console.log(a, generateIndex(1, chosenGenre.keyword.length));
  return chosenGenre;
}

const search = async (info) => {
  const API_KEY = "AIzaSyAJVy80IB8wtbJwWOok9FgmwQfRXGyaBF8";
  // const URL = 'https://www.googleapis.com/youtube/v3/videos?id=bHQqvYy5KYo&part=snippet,contentDetails,statistics,status&key=' + API_KEY;
  let URL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&order=rating&maxResults=2&key=' + API_KEY + "&q=" + createSearchQuery(info);

  let result;
  await fetch(URL)
    .then(res => {
      console.log(res);
      console.log(res.body);
      result = JSON.stringify(res.body, null, "    ");
      console.log(result);
    });
  return result;
}

export { search as searchYoutube };