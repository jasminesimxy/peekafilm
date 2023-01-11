// jasmine: landing page - search button - event listener 
var landingContainer = document.getElementById("landing");
var contentContainer = document.getElementById("contentpage")

// jasmine: landing page - search button - event listener 




// jasmine: second page 

function displayContent () {
    //hide landing page 
    landingContainer.style.display="none";
    contentContainer.style.display="block";

}

// jasmine: hide landing page - show content page

// chris: history list - retrieve data from local storage - local browser
// get the search form and the search history list
const searchForm = document.getElementById('search-form');
const searchHistoryList = document.getElementById('search-history');

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


const MARVEL_BASE_URL = 'https://gateway.marvel.com:443/v1/public';
const MARVEL_API_KEY = '24e377359e91ec437d1b5963bd2dc195';



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

    var requestUrl = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCvC4D8onUfXzvjTOM-dBfEA&maxResults=5&order=date&q=' + searchInput + '&key=AIzaSyDC-TEGQQzeXYzTXJNiOI1ckI58hGEqZg4';
    
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

        var videoListEl = document.querySelector('#video-container')
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

        document.getElementById('search-results').appendChild(videoEl);
        
    })
     
     
  });
}
var heroBtn = document.querySelector('#search')
heroBtn.addEventListener('click', searchCharacters)

// searchCharacters('spider')
//   .then(characters => console.log(characters));



  





// chenghao: videolist - fetch data from youtube api with api key

var btnEl = document.querySelector('.button');
var searchInputEl = document.querySelector('#search-input');



function getApi(){

    var searchInput = searchInputEl.value;
    console.log(searchInput);

    var requestUrl = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCvC4D8onUfXzvjTOM-dBfEA&maxResults=5&order=date&q=' + searchInput + '&key=AIzaSyDC-TEGQQzeXYzTXJNiOI1ckI58hGEqZg4';
    
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

        var videoListEl = document.querySelector('#video-container')
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
        
    })
}


 btnEl.addEventListener('click',getApi);
