const dataApI = 'https://www.omdbapi.com/?apikey=914235e5';

details();

function details(){
    let movieId = localStorage.getItem('currentImage');
    let APIUrl = dataApI + "&i=" + movieId;
    searchInAPI(APIUrl);
}

async function searchInAPI(APIUrl) {
    let moviesData = await fetch(APIUrl);
    if(moviesData.status == 200){
        moviesContent(await moviesData.json());
    }
}

async function moviesContent(moviesData){
    console.log(moviesData);
    let movieContent = document.createElement('div');
    movieContent.className = "movie-section-container";

    movieContent.innerHTML = `
        <div class="movie-image-container">
            <img src="${moviesData.Poster}" alt="">
        </div>
        <div class="movie-container-details">
            <div class="movie-container-title">
                <p>${moviesData.Title}</p>
            </div>
            <div class="add-detail-container">
                <p>Plot : ${moviesData.Plot}</p>
                <p>Language : ${moviesData.Language}</p>
                <p>Genre : ${moviesData.Genre}</p>
                <p>Director : ${moviesData.Director}</p>
                <p>Writer : ${moviesData.Writer}</p>
                <p>Actors : ${moviesData.Actors}</p>
            </div>
        </div>
    `
    console.log(movieContent)
    document.getElementById('movie-detail-container').appendChild(movieContent);
}