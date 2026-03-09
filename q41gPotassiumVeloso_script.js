const movieForm = document.getElementById('movieForm');
const movieList = document.getElementById('movieList');
const formStars = document.querySelectorAll('#formStars .star');
let selectedRating = 0;

formStars.forEach(star => {
    star.addEventListener('click', () => {
        selectedRating = star.getAttribute('data-value');
        updateStarDisplay(formStars, selectedRating);
    });
});

function updateStarDisplay(stars, rating) {
    stars.forEach(s => {
        s.classList.toggle('selected', s.getAttribute('data-value') <= rating);
    });
}

function renderMovies() {
    const movies = JSON.parse(localStorage.getItem('movies')) || [];
    movieList.innerHTML = '';

    movies.forEach(movie => {
        const div = document.createElement('div');
        div.className = 'movie-item';
        
        const starDisplay = '★'.repeat(movie.rating) + '☆'.repeat(5 - movie.rating);
        
        div.innerHTML = `
            <strong>${movie.title}</strong> (${movie.year}) - ${movie.genre}, Rating: 
            <span class="stars">${starDisplay}</span>
        `;
        movieList.appendChild(div);
    });
}

movieForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newMovie = {
        title: document.getElementById('title').value,
        year: document.getElementById('year').value,
        genre: document.getElementById('genre').value,
        rating: parseInt(selectedRating)
    };

    if (newMovie.rating === 0) {
        alert("Please select a rating!");
        return;
    }

    const movies = JSON.parse(localStorage.getItem('movies')) || [];
    movies.push(newMovie);
    localStorage.setItem('movies', JSON.stringify(movies));

    // Reset form and UI
    movieForm.reset();
    selectedRating = 0;
    updateStarDisplay(formStars, 0);
    renderMovies();
});

renderMovies();