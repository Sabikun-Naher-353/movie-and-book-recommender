function showGenre() {
  const html = `
    <h3>Search by Genre</h3>
    <input type="text" id="genreInput" placeholder="Enter genre (e.g. action)" />
    <button onclick="fetchByGenre()">Search</button>
    <div id="results"></div>
  `;
  document.getElementById('dynamicContent').innerHTML = html;
}

function fetchByGenre() {
  const genre = document.getElementById("genreInput").value.trim();
  if (!genre) return;

  fetch(`http://localhost:3000/api/ratings/genre/${genre}`)
    .then(res => res.json())
    .then(data => displayResults(data))
    .catch(err => {
      console.error("Genre error:", err);
      alert("Error loading genre-based results");
    });
}

function showRating() {
  fetch("http://localhost:3000/api/ratings/top")
    .then(res => res.json())
    .then(data => displayResults(data))
    .catch(err => {
      console.error("Rating error:", err);
      alert("Error loading rating-based results");
    });
}

function showTrend() {
  fetch("http://localhost:3000/api/ratings/trending")
    .then(res => res.json())
    .then(data => displayResults(data))
    .catch(err => {
      console.error("🔥 Trend error:", err);
      alert("Error loading trending results");
    });
}

function displayResults(items) {
  const html = items.map(i => `
    <div style="border: 1px solid #ccc; padding: 10px; margin: 10px;">
      <img src="${i.cover_image || 'placeholder.jpg'}" alt="Cover" width="120" />
      <h4>${i.title} (${i.item_type || 'Unknown'})</h4>
      <p>${i.genre ? 'Genre' : i.author ? 'Author' : ''}: ${i.genre || i.author || 'N/A'}</p>
      <p>Average Rating: ${i.avg_rating || 'N/A'}</p>
    </div>
  `).join('');

  document.getElementById('dynamicContent').innerHTML = html;
}
