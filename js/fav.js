const dataApI = 'https://www.omdbapi.com/?apikey=914235e5';

favourites();

// get the favourites list from local storage
async function favourites(){
    let isFav = localStorage.getItem("movies");
    let moviesArray = JSON.parse(isFav);

    if(moviesArray.length > 0){
        document.getElementById('movie').innerHTML = '';
        await moviesArray.forEach (movie => {
            let APIUrl = dataApI + "&i=" + movie;
            searchInAPI(APIUrl);
        })
    }
}

// fetch the data for the favourite movie item
async function searchInAPI(APIUrl) {
    let moviesData = await fetch(APIUrl);
    if(moviesData.status == 200){
        moviesContent(await moviesData.json());
    }
}

// Append Html code and content to it using fetched data
async function moviesContent(moviesData){
    let movieContent = document.createElement('div');
    movieContent.className = "movie-container";
    movieContent.id = moviesData.imdbID;

    // check if the current movie section have been added to fav using local storage
    let isFav = localStorage.getItem("movies");
    let moviesArray = JSON.parse(isFav);
    let fav_class = "";

    // if current movie section is added to fav => append class = isFav
    if(moviesArray.includes(moviesData.imdbID)){
        fav_class = "isFav";
    }else{
        fav_class = "";
    }

    // Html code to display current movie section
    movieContent.innerHTML = `
        <div class="movie-image">
            <img src="${moviesData.Poster}" alt=""  id="image-container">
            <div class="${fav_class}" id="fav">
            </div>
        </div>
        <div class="movie-details">
            <div class="movie-title">
                ${moviesData.Title}
            </div>
            <div class="movie-de">
                <span>Year : ${moviesData.Year}</span>
                <span>Type : ${moviesData.Type}</span>
            </div>
        </div>
    `
    document.getElementById('movie').appendChild(movieContent);
}

document.addEventListener('click', (event) => {
    // Click event listener on movie image to redirect it to details page for currenttly selected movie
    if(event.target.id == "image-container"){
        localStorage.setItem('currentImage', event.target.parentNode.parentNode.id);
        window.open('./details.html');
    }
    // Clcick event listener to monitor if user clicks movie as favourite
    if(event.target.id == "fav"){
        console.log(event.target.parentNode.parentNode.id);
           let ID = event.target.parentNode.parentNode.id;
           let isFav = localStorage.getItem("movies");
           let moviesArray = JSON.parse(isFav);
           if(!moviesArray.includes(ID)){
               // Add it to fav
               moviesArray.push(ID)
               event.target.classList.add("isFav");
           }else {
                event.target.classList.remove("isFav");
                const index = moviesArray.indexOf(ID);
                if (index > -1) {
                    moviesArray.splice(index, 1);
                }
           }
           localStorage.setItem('movies', JSON.stringify(moviesArray));
           favourites();
    }
})