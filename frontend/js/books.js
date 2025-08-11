async function fetchBooks() {
  const res = await fetch('http://localhost:3000/api/items/books');
  const books = await res.json();

  const container = document.getElementById('books-list');
  container.innerHTML = '';

  books.forEach(book => {
    const div = document.createElement('div');
    div.innerHTML = `
      <strong>${book.title}</strong><br>
      Author: ${book.author}<br>
      Rating: ${book.avg_rating || 'N/A'}<br>
      <button onclick="rate(${book.book_id})">Rate</button>
      <hr/>
    `;
    container.appendChild(div);
  });
}

function rate(id) {
  const rating = prompt('Rate this book (1 to 5):');
  const userId = prompt('Enter your user ID:');

  fetch('http://localhost:3000/api/ratings/rate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user_id: userId,
      item_type: 'book',
      item_id: id,
      rating: parseInt(rating)
    })
  })
    .then(res => res.json())
    .then(data => alert(data.message || 'Rated!'))
    .catch(() => alert('Rating failed.'));
}

fetchBooks();
