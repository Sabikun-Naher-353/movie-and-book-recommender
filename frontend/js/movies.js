async function fetchMovies() {
  const res = await fetch('http://localhost:3000/api/items/movies');
  const movies = await res.json();

  const container = document.getElementById('movies-list');
  container.innerHTML = '';

  movies.forEach(movie => {
    const div = document.createElement('div');
    div.innerHTML = `
      <strong>${movie.title}</strong><br>
      Genre: ${movie.genre}<br>
       Rating: ${movie.avg_rating || 'N/A'}<br>
      <button onclick="rate(${movie.movie_id})">Rate</button>
      <hr/>
    `;
    container.appendChild(div);
  });
}

function rate(id) {
  const rating = prompt('Rate this movie (1 to 5):');
  const userId = prompt('Enter your user ID:');

  fetch('http://localhost:3000/api/ratings/rate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user_id: userId,
      item_type: 'movie',
      item_id: id,
      rating: parseInt(rating)
    })
  })
    .then(res => res.json())
    .then(data => alert(data.message || 'Rated!'))
    .catch(() => alert('Rating failed.'));
}

fetchMovies();
