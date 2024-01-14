//fetching HomePage Movies

fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=2c655d8ba9041898c7beb9d20076cbfd')
    .then((response) => response.json())
    .then((data) => {
        showMovies(data.results, "dash_main");
    })
    .catch((error) => { return });

let currentPage = 1;
let loading = false;

window.addEventListener('scroll', function () {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        InfiniteScroll();
        filterScroll();
    }
});

function showFilter() {
    const filterBox = document.getElementById("filter_box");
    filterBox.style.display = "flex";
}

function hideFilter() {
    const filterBox = document.getElementById("filter_box");
    filterBox.style.display = "none";
}

let id = "top_rated";
let filterParameter = 'with_original_language=bn';

addClass()

function addClass() {
    let current = document.getElementById(id);
    current.classList.add("currentSection");
}
function removeClass() {
    let current = document.getElementById(id);
    current.classList.remove("currentSection");
}

function addClass2() {
    let current = document.getElementById(id);
    current.classList.add("currentFilter");
}
function removeClass2() {
    let current = document.getElementById(id);
    current.classList.remove("currentFilter");
}

function ChangeMovies(keyword) {
    removeClass();
    removeClass2();
    id = keyword;
    addClass();
    let card = document.getElementsByClassName("movie_card")
    for (let i = 0; i < card.length; i++) {
        card[i].style.display = "none";
    }
    fetch(`https://api.themoviedb.org/3/movie/${keyword}?api_key=2c655d8ba9041898c7beb9d20076cbfd`)
        .then((response) => response.json())
        .then((data) => {
            showMovies(data.results, "dash_main");
        })
        .catch((error) => { return });
}

function displayFilters(value, keyword) {
    removeClass();
    removeClass2();
    filterParameter = value;
    id = keyword;
    addClass2();
    let card = document.getElementsByClassName("movie_card")
    for (let i = 0; i < card.length; i++) {
        card[i].style.display = "none";
    }
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=2c655d8ba9041898c7beb9d20076cbfd&${value}`)
        .then((response) => response.json())
        .then((data) => {
            showMovies(data.results, "dash_main");
        })
        .catch((error) => { return });
}

let search = document.getElementById("search");
let form = document.getElementById("form");

search.addEventListener("focus", function () {
    lazyLoad("script1.js", "script1");
})

function lazyLoad(url, scriptId) {
    // Check if the script with the specified ID already exists
    if (!document.getElementById(scriptId)) {
        let script = document.createElement("script");
        script.id = scriptId;
        script.src = url;
        document.body.appendChild(script);
        console.log("Lazily Loaded !");
    } else {
        console.log("Script with ID " + scriptId + " already loaded.");
    }
}
form.addEventListener('submit', function (event) {
    event.preventDefault();
    let term = search.value;
    console.log(term);
    if (term) {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=2c655d8ba9041898c7beb9d20076cbfd&query=${term}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data.results);
                let el = document.getElementsByClassName("movie_card");
                for (let i = 0; i < el.length; i++) {
                    el[i].style.display = "none";
                }
                showMovies(data.results, "dash_main");
                console.log("Show Successful");
            })
            .catch((error) => console.log("This is an error"));
    }
})
//Showing Movies
function showMovies(data, ids) {
    data.forEach(movie => {
        const { title, poster_path, vote_average, overview, id } = movie;
        let movieElement = document.createElement('div');
        movieElement.classList.add("movie_card");
        movieElement.innerHTML = `
        <div class="poster"><i class="fa-regular fa-heart"></i><a id = "pic" href = "https://www.themoviedb.org/movie/${id}"><img src ="https://image.tmdb.org/t/p/w500/${poster_path}" alt = "${title}"></a></div>
            <span class="movie_name">${title}</span>
            <span class="${selectColor(vote_average)}">${vote_average}</span>
        `;
        let container = document.getElementById(ids);
        container.appendChild(movieElement);

        let movieName = movieElement.getElementsByClassName("movie_name");
        let moviePoster = document.getElementsByClassName("poster");
        let like = document.getElementsByClassName("fa-regular fa-heart")
        for (let i = 0; i < movieName.length; i++) {
            let originalText = movieName[i].innerText;
            movieName[i].addEventListener("mouseover", function () {
                this.innerText = `${overview}`
                this.classList.add("description");
            })
            movieName[i].addEventListener("mouseout", function () {
                this.classList.remove("description");
                this.innerText = originalText;
            })
        }
        for (let i = 0; i < moviePoster.length; i++) {
            moviePoster[i].addEventListener("mouseover", function () {
                like[i].style.visibility = "visible";
            })
            moviePoster[i].addEventListener("mouseout", function () {
                like[i].style.visibility = "hidden";
            })
        }
        for (let i = 0; i < like.length; i++) {
            like[i].addEventListener("click", function () {
                like[i].classList.toggle("fa-solid");
                if (like[i].class = "fa-solid fa-heart") {
                    like[i].addEventListener("click", function () {
                        like[i].classList.remove("fa-solid");
                    });

                }
            })
        }
    })
}
function InfiniteScroll() {
    if (!loading) {
        loading = true;

        currentPage++;

        let url = `https://api.themoviedb.org/3/movie/${id}?api_key=2c655d8ba9041898c7beb9d20076cbfd&page=${currentPage}`;

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                showMovies(data.results, "dash_main")
            })
            .catch((error) => {
                return;
            });
        loading = false;
    }
}

function filterScroll() {
    if (!loading) {
        loading = true;

        currentPage++;

        let url = `https://api.themoviedb.org/3/discover/movie?api_key=2c655d8ba9041898c7beb9d20076cbfd&${filterParameter}`;

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                showMovies(data.results, "dash_main")
            })
            .catch((error) => {
                return;
            });
        loading = false;
    }
}
//Deciding the color of the the rating Box
function selectColor(vote) {
    if (vote >= 7.5) {
        return "green"
    }
    else if (vote < 7.5 && vote >= 6) {
        return "yellow"
    }
    else {
        return "red"
    }
}
let logout = document.getElementById("Logout");
function showLogout() {
     logout.style.display = "block";  
}
function hideLogout(){
    logout.style.display = "none"; 
}