const dataApI = 'https://www.omdbapi.com/?apikey=914235e5';

var search = document.getElementById('search-bar');

search.addEventListener('keyup', function (event) {
    var searchData = event.target.value;
    var APIUrl = dataApI + "&s=" + searchData;
    if(searchData.length > 2){
        searchInAPI(APIUrl);
    }
})
async function searchInAPI(APIUrl) {
    let moviesData = await fetch(APIUrl);
    if(moviesData.status == 200){
        // console.log(moviesData.json().Search);
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

            var movieDiv = document.createElement('div');
            movieDiv.id = "movie";
            moviesSection.appendChild(movieDiv)
            console.log(moviesSection);

            moviesData.Search.forEach(movie => {
                var movieDetails = fillDetails(movie)
                movieDiv.appendChild(movieDetails)
            })
        }
        readyDoc();
}

function fillDetails(movie){
    console.log(movie)
    var movieContent = document.createElement('div');
    movieContent.className = "movie-container";
    movieContent.id = movie.imdbID;

    let isFav = localStorage.getItem("movies");
    let moviesArray = JSON.parse(isFav);
    let fav_class = "";

    if(moviesArray.includes(movie.imdbID)){
        fav_class = "fav isFav";
    }else{
        fav_class = "fav";
    }

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

function readyDoc(){
    $(document).ready(function() {
        $(".fav").click(function(event) {
           console.log(event.target.parentNode.parentNode.id);
           let ID = event.target.parentNode.parentNode.id;
           let isFav = localStorage.getItem("movies");
           let moviesArray = JSON.parse(isFav);
           if(!moviesArray.includes(ID)){
               // Add it to fav
               console.log("Add to Fav")
               moviesArray.push(ID)
               $(this).addClass("isFav");
           }else {
                console.log("remove from Fav")
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

document.addEventListener('click', (event) => {

    if(event.target.id == "image-container"){
        localStorage.setItem('currentImage', event.target.parentNode.parentNode.id);
        window.open('./details.html');
    }
});


function isLocal(){
    if (localStorage.getItem('movies')==null){
        var movies = [];
        localStorage.setItem('movies', JSON.stringify(movies));
    }
}

isLocal();