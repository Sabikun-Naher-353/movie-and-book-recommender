console.log("home.js loaded");

function showTab(type) {
  document.getElementById('movies-list').classList.remove('active');
  document.getElementById('books-list').classList.remove('active');

  document.getElementById(`${type}-list`).classList.add('active');

  fetchItems(type); // Load data when tab is shown
}

async function fetchItems(type) {
  const res = await fetch(`http://localhost:3000/api/items/${type}`);
  const items = await res.json();

  const container = document.getElementById(`${type}-list`);
  container.innerHTML = '';

  items.forEach(item => {
    const id = item[`${type}_id`];
    const div = document.createElement('div');
    div.className = 'item';
    div.innerHTML = `
      <strong>${item.title}</strong><br>
      ${type === 'movies' ? 'Genre' : 'Author'}: ${item.genre || item.author}<br>
      Rating: ${item.rating || 'N/A'}<br>
      <button onclick="rate('${type}', ${id})">Rate</button>
    `;
    container.appendChild(div);
  });
}

function rate(type, id) {
  const rating = prompt(`Rate this ${type === 'movies' ? 'movie' : 'book'} (1 to 5):`);
  const userId = prompt('Enter your user ID:');

  fetch('http://localhost:3000/api/ratings/rate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user_id: userId,
      item_type: type.slice(0, -1), // "movies" → "movie"
      item_id: id,
      rating: parseInt(rating)
    })
  })
    .then(res => res.json())
    .then(data => alert(data.message || 'Rated!'))
    .catch(() => alert('Rating failed.'));
}

// Load movies by default
showTab('movies');

