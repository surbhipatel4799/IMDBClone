const dataApI = 'https://www.omdbapi.com/?apikey=914235e5';

var search = document.getElementById('search-bar');

// Add listener to search-bar to get the data
search.addEventListener('keyup', function (event) {
    // searchData => data entered by user to search
    var searchData = event.target.value;
    var APIUrl = dataApI + "&s=" + searchData;
    if(searchData.length > 2){
        searchInAPI(APIUrl);
    }
})

// Search using API with param => search Data
async function searchInAPI(APIUrl) {
    let moviesData = await fetch(APIUrl);
    if(moviesData.status == 200){
        // if response from API is success add data to page
        moviesContent(await moviesData.json());
    }
}

function moviesContent(moviesData){
        console.log(moviesData.Search);
        if(moviesData.Search.length > 0){
            var movieDiv = document.getElementById('movie');
            var moviesSection = document.getElementById('movies-section');
            // distroy old rendered movies
            movieDiv.remove();

            // create a new movie-div section to render fetched movie content
            var movieDiv = document.createElement('div');
            movieDiv.id = "movie";
            moviesSection.appendChild(movieDiv);

            moviesData.Search.forEach(movie => {
                // to add movie individual content to a div and append it to movieDiv
                var movieDetails = fillDetails(movie)
                movieDiv.appendChild(movieDetails)
            })
        }
        readyDoc();
}

// Add content to an individual movie section
function fillDetails(movie){
    var movieContent = document.createElement('div');
    movieContent.className = "movie-container";
    movieContent.id = movie.imdbID;

    // check if the current movie section have been added to fav using local storage
    let isFav = localStorage.getItem("movies");
    let moviesArray = JSON.parse(isFav);
    let fav_class = "";

    // if current movie section is added to fav => append class = isFav
    if(moviesArray.includes(movie.imdbID)){
        fav_class = "fav isFav";
    }else{
        fav_class = "fav";
    }

    // Html code to display current movie section
    movieContent.innerHTML = `
        <div class="movie-image" >
            <img src="${movie.Poster}" alt="" id="image-container">
            <div class="${fav_class}">
            </div>
        </div>
        <div class="movie-details">
            <div class="movie-title">
                ${movie.Title}
            </div>
            <div class="movie-de">
                <span>Year : ${movie.Year}</span>
                <span>Type : ${movie.Type}</span>
            </div>
        </div>
    `
    return movieContent;
}

// function to monitor if user clicks movie as favourite
function readyDoc(){
    $(document).ready(function() {
        $(".fav").click(function(event) {
           console.log(event.target.parentNode.parentNode.id);
           let ID = event.target.parentNode.parentNode.id;
           let isFav = localStorage.getItem("movies");
           let moviesArray = JSON.parse(isFav);
           if(!moviesArray.includes(ID)){
               // Add it to fav
               moviesArray.push(ID)
               $(this).addClass("isFav");
           }else {
                const index = moviesArray.indexOf(ID);
                if (index > -1) {
                    moviesArray.splice(index, 1);
                }
                $(this).removeClass("isFav");
           }
           localStorage.setItem('movies', JSON.stringify(moviesArray));
        });
    });
}

readyDoc();

// Click event listener on movie image to redirect it to details page for currenttly selected movie
document.addEventListener('click', (event) => {

    if(event.target.id == "image-container"){
        localStorage.setItem('currentImage', event.target.parentNode.parentNode.id);
        window.open('./details.html');
    }
});

// set the local storage of browser
function isLocal(){
    if (localStorage.getItem('movies')==null){
        var movies = [];
        localStorage.setItem('movies', JSON.stringify(movies));
    }
}

isLocal();