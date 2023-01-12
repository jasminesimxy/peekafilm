var btnEl = document.querySelector('#search-button');
var searchInputEl = document.querySelector('#search-input');
var heroInputEl = document.getElementById('hero-input');
// (tutor) james says to move this out of the function and into the global scope
var videoListEl = document.querySelector('#video-container')
// chris: history list - retrieve data from local storage - local browser
// get the search form and the search history list
const searchForm = document.getElementById('search-form');
const searchHistoryList = document.getElementById('search-history');


const MARVEL_BASE_URL = 'https://gateway.marvel.com:443/v1/public';
const MARVEL_API_KEY = '24e377359e91ec437d1b5963bd2dc195';



// add a function to add the search term to Local Storage
function addToLocalStorage(searchTerm) {
  // check if Local Storage is supported by the browser
  if (typeof(Storage) !== 'undefined') {
    // get the current search history from Local Storage
    let searchHistory = localStorage.getItem('searchHistory');
    // check if there is a search history in Local Storage
    if (searchHistory !== null) {
      // parse the search history from JSON to an array
      searchHistory = JSON.parse(searchHistory);
    } else {
      // create an empty search history array
      searchHistory = [];
    }
    // add the search term to the search history array
    searchHistory.push(searchTerm);
    // stringify the search history array and add it to Local Storage
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  } else {
    // display an error message if Local Storage is not supported
    searchHistoryList.innerHTML = '<li>Sorry, your browser does not support Local Storage</li>';
  }};


// harry: information list - fetch data from marvel api with api KeyboardEvent


function searchCharacters(query) {
  const url = `${MARVEL_BASE_URL}/characters?ts=1&nameStartsWith=${query}&apikey=${MARVEL_API_KEY}&hash=667ae841fa34b73b2b37dd1c1df1e89e`;
  return fetch(url)
    .then(response => response.json())
}

const searchResults = document.getElementById("search-results")
let result = "";



// chenghao: videolist - fetch data from youtube api with api key

function getYoutubeApi(){
  videoListEl.replaceChildren();
  console.log(('inside getYoutubeApi'));
    var heroStr = heroInputEl.value;
    console.log(heroStr);
    // james: is this API endpoint correctly fetching the data you want?
    var requestUrl = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCvC4D8onUfXzvjTOM-dBfEA&maxResults=5&order=date&q=' + heroStr + '&key=AIzaSyDC-TEGQQzeXYzTXJNiOI1ckI58hGEqZg4';
    
    fetch(requestUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);

        var videoID = data.items[0].id.videoId;
        console.log(videoID) //videoId

        var videoImage = data.items[0].snippet.thumbnails.default.url;
        console.log(videoImage) //image src

        var videoEl = document.createElement('a');
        var videoImageEl = document.createElement('img');
        videoImageEl.src = videoImage;

        //videoEl.setAttribute("href","https://www.youtube.com/watch?v=" + videoID);
        videoEl.setAttribute("href","https://www.youtube.com/embed/" + videoID);

        //videoEl.setAttribute("href","https://www.googleapis.com/youtube/v3/videos?part=player&id=" + videoID + "&key=AIzaSyDC-TEGQQzeXYzTXJNiOI1ckI58hGEqZg4");
        
        videoEl.append(videoImageEl);
       
        console.log(videoEl);
        console.log(videoListEl);
        console.log(videoImageEl);

        videoListEl.appendChild(videoEl);

        // now run the searchCharacter function?
        searchCharacters(heroStr)
        .then(function(data) {
          console.log('Marvel data is', data);
        });
    })
}

btnEl.addEventListener('click',getYoutubeApi);
// add an event listener to the search form
searchForm.addEventListener('submit', (event) => {
  // prevent the form from submitting
  event.preventDefault();



  // get the input field
  const inputField = event.target.elements['0'];
  // get the search term
  const searchTerm = inputField.value;

  // check if the search term is not empty
  if (searchTerm.trim() !== '') {
    // add the search term to the search history list
    searchHistoryList.innerHTML += `<li>${searchTerm}</li>`;

    // add the search term to Local Storage
    addToLocalStorage(searchTerm);
  }
});
// add an event listener to the search history list
searchHistoryList.addEventListener('click', (event) => {
    // get the clicked element
    const clickedElement = event.target;
    // check if the clicked element is a list item
    if (clickedElement.tagName === 'LI') {
      // get the text of the list item
      const searchTerm = clickedElement.textContent;
      // display the search term in an alert
      displaySearchInfo(searchTerm);
      // you can retrieve and display the information of the search term here
    }
});