const stars = document.querySelectorAll('.star-rating i');
let movieList = [];
let title = document.getElementById('title');
let year = document.getElementById('year');
let genre = document.getElementById('genre');
let starsRating = document.querySelectorAll('.star');

document.getElementById('addMovieBtn').addEventListener('click', function(event) {
    event.preventDefault();

    stars.forEach((star, index1) => {
        star.addEventListener("click", () => {
            star.forEach((star, index2) => {
                index1 >= index2 ? star.classList.add("selected") : star.classList.remove("selected");
            });
        });
    });

    let movie = {}
    movie.title = title.value;
    movie.year = year.value;
    movie.genre = genre.value;
    movie.rating = starsRating.value;

    movieList.push(movie);

    console.log(movieList);

});