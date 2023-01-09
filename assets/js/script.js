// jasmine: landing page - search button - event listener 

// jasmine: hide landing page - show content page

// chris: history list - retrieve data from local storage - local browser

// harry: information list - fetch data from marvel api with api KeyboardEvent

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

        videoEl.setAttribute("href","https://www.youtube.com/watch?v=" + videoID);
        
        videoEl.append(videoImageEl);
       

        console.log(videoEl);
        console.log(videoListEl);
        console.log(videoImageEl);

        videoListEl.appendChild(videoEl);
        
    })
}


btnEl.addEventListener('click',getApi);