
const MARVEL_BASE_URL = 'https://gateway.marvel.com:443/v1/public';
const MARVEL_API_KEY = '24e377359e91ec437d1b5963bd2dc195';
const youtubeApiKey = "AIzaSyDC-TEGQQzeXYzTXJNiOI1ckI58hGEqZg4";
const marvelEntertainmentID ="UCvC4D8onUfXzvjTOM-dBfEA";
var searchInputEl = document.querySelector('#superheroName');
var videoListEl = document.querySelector('#video-container');
var maxResults = "5";

var heroBtn = document.querySelector('#search');
const searchResults = document.getElementById("search-results");
let result = "";



function searchCharacters(e,query) {
  e.preventDefault()
  document.getElementById('search-results').innerHTML = ''
   query = document.querySelector("#superheroName").value
  const url = `${MARVEL_BASE_URL}/characters?ts=1&nameStartsWith=${query}&apikey=${MARVEL_API_KEY}&hash=667ae841fa34b73b2b37dd1c1df1e89e`;
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      let characters = data.data.results;
      console.log(characters)
      for (let i = 0; i < characters.length; i++) {
          console.log(characters[i].name);
          console.log(characters[i].description);
          let h1 = document.createElement('h1')
      h1.textContent = characters[i].name
      document.getElementById('search-results').appendChild(h1)
      let h2 = document.createElement('h1')
      h2.textContent = characters[i].description
      document.getElementById('search-results').appendChild(h2)
      let img = document.createElement('img')
      img.src = characters[i].thumbnail.path + '.jpg'
      document.getElementById('search-results').appendChild(img)
      }
      var searchInput = query;
    console.log(searchInput);
    getYoutubeApi();
    addToLocalStorage();
    })
}
function getYoutubeApi(){
  //event.preventDefault();

  //videoListEl.removeChild();
  var searchInput = searchInputEl.value;
  console.log(searchInput);
  var requestUrl = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId='+ marvelEntertainmentID +'&maxResults=' + maxResults +'&q=' + searchInput + '&key=' + youtubeApiKey;
  fetch(requestUrl)
  .then(function(response){
      if(!response.ok){
        throw response.json();
      }
      return response.json();
  })
  .then(function(data){
    console.log(data);
    console.log(data.items.length)

    var child = videoListEl.lastElementChild;
    while (child) {
      videoListEl.removeChild(child);
        child = videoListEl.lastElementChild;
    }
    for (var i = 0; i < data.items.length; i++){
      var videoID = data.items[i].id.videoId;
      var iframeEl = document.createElement('iframe');
      iframeEl.setAttribute("src","https://www.youtube.com/embed/" + videoID);
      iframeEl.setAttribute("allowfullscreen","1");
      iframeEl.setAttribute("height","300px");
      iframeEl.setAttribute("width","600px");
      videoListEl.appendChild(iframeEl)
    }
  })
}

heroBtn.addEventListener('click', searchCharacters);

function addToLocalStorage() {
  var searchInput = document.querySelector("#superheroName").value;
  localStorage.setItem("searchInput", searchInput);
  var storedInput = localStorage.getItem("searchInput");
  document.getElementById("display-input").innerHTML = storedInput;
}
