const stars = document.querySelectorAll('.stars i');
let movieList = JSON.parse(localStorage.getItem('movieList') || '[]') || [];
const title = document.getElementById('title');
const year = document.getElementById('year');
const genre = document.getElementById('genre');
const movieListContainer = document.getElementById('movieList');

function renderMovieList() {
    movieListContainer.innerHTML = '';
    movieList = Array.isArray(movieList) ? movieList : [];

    movieList.forEach((movie) => {
        const { title = '', year = '', genre = '', rating = 0 } = movie || {};
        const starsText = '★'.repeat(Number(rating) || 0) || 'No rating';
        const div = document.createElement('div');
        div.textContent = `${title} (${year}) - ${genre} - ${starsText}`;
        movieListContainer.appendChild(div);
    });
}

function getRating() {
    return Array.from(stars).filter(star => star.classList.contains('selected')).length;
}

stars.forEach((star, index1) => {
    star.addEventListener("click", () => {
        stars.forEach((s, index2) => {
            if (index1 >= index2) {
                s.classList.add("selected");
            } else {
                s.classList.remove("selected");
            }
        });
    });
});

document.getElementById('addMovieBtn').addEventListener('click', (event) => {
    event.preventDefault();

    const movie = {
        title: title.value,
        year: year.value,
        genre: genre.value,
        rating: getRating()
    };

    movieList.push(movie);
    localStorage.setItem('movieList', JSON.stringify(movieList));
    renderMovieList();

    document.getElementById('movieForm').reset();
    stars.forEach(s => s.classList.remove('selected'));
});

renderMovieList();