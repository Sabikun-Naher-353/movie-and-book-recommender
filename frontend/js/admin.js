function addItem() {
  const type = document.getElementById('item-type').value;
  const title = document.getElementById('title').value;
  const detail = document.getElementById('genreOrAuthor').value;
  const coverUrl = document.getElementById('cover_image').value;
  const body = {
    title: title,
    cover_image: coverUrl,
    [type === 'movie' ? 'genre' : 'author']: detail
  };

  fetch(`http://localhost:3000/api/items/${type}s`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
    .then(res => res.json())
    .then(data => alert(data.message || 'Item added'))
    .catch(() => alert('Add failed'));
}

function deleteItem() {
  const type = document.getElementById('del-item-type').value;
  const id = document.getElementById('item-id').value;

  fetch(`http://localhost:3000/api/items/${type}s/${id}`, {
    method: 'DELETE'
  })
    .then(res => res.json())
    .then(data => alert(data.message || 'Item deleted'))
    .catch(() => alert('Delete failed'));
}
