// const jsdom = require('jsdom');
// const { JSDOM } = jsdom;
// const dom = new JSDOM(`<html><body><div id="aaa">AAA<div></body></html>`);
// const jquery = require('jquery');
// const $ = jquery(dom.window);

import $ from 'jquery';


const createSearchQuery = (info) => {

}

async function search() {
  const API_KEY = "AIzaSyAJVy80IB8wtbJwWOok9FgmwQfRXGyaBF8";
  const URL = 'https://www.googleapis.com/youtube/v3/videos?id=bHQqvYy5KYo&part=snippet,contentDetails,statistics,status&key=' + API_KEY;
  const URL2 = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=4K&order=rating&maxResults=2&key=' + API_KEY;


  $.ajax({
    type: 'GET',
    url: URL2,
    dataType: 'json',
    success: function (data) {
      var s = JSON.stringify(data, null, "    ");
      console.log(s);
    }
  })

}

export { search as searchYoutube };