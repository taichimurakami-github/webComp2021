// const jsdom = require('jsdom');
// const { JSDOM } = jsdom;
// const dom = new JSDOM(`<html><body><div id="aaa">AAA<div></body></html>`);
// const jquery = require('jquery');
// const $ = jquery(dom.window);

import $ from 'jquery';


const createSearchQuery = (info) => {
  const queryData = {
    genre: {},
    bgm: {},
    popular: {},
    keyword: {},
    instrumental: {},
  }
}

async function search(info) {
  const API_KEY = "AIzaSyAJVy80IB8wtbJwWOok9FgmwQfRXGyaBF8";
  const URL = 'https://www.googleapis.com/youtube/v3/videos?id=bHQqvYy5KYo&part=snippet,contentDetails,statistics,status&key=' + API_KEY;
  const URL2 = 'https://www.googleapis.com/youtube/v3/search?part=snippet&order=rating&maxResults=2&key=' + API_KEY + "&q=ジブリ リラックス";

  await fetch(URL2)
    .then(res => {
      console.log(res);
      const s = JSON.stringify(res.body, null, "    ");
      console.log(s);
    })

  // $.ajax({
  //   type: 'GET',
  //   url: URL2,
  //   dataType: 'json',
  //   success: function (data) {
  //     var s = JSON.stringify(data, null, "    ");
  //     console.log(s);
  //   }
  // });

}

export { search as searchYoutube };