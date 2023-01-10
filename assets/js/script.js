var landingContainer = document.getElementById("landing");
var contentContainer = document.getElementById("contentpage")

// jasmine: landing page - search button - event listener 


// jasmine: second page 

function displayContent () {
    //hide landing page 
    landingContainer.style.display="none";
    contentContainer.style.display="block";

    
}


// get the search form and the search history list
const searchForm = document.getElementById('search-form');
const searchHistoryList = document.getElementById('search-history');

// add an event listener to the search form
searchForm.addEventListener('submit', (event) => {
  // prevent the form from submitting
  event.preventDefault();


// chenghao: video list - fetch data from youtube api with api key 

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
      // retrieve and display the information of the search term 
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

// chenghao: videolist - fetch data from youtube api with api key

