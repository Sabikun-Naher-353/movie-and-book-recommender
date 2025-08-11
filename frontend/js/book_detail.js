const params = new URLSearchParams(window.location.search);
const bookId = params.get("id");
const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
  alert("Please login first");
  window.location.href = "login.html";
}

function loadBookDetails() {
  fetch("http://localhost:3000/api/items/books")
    .then(res => res.json())
    .then(books => {
      const book = books.find(b => b.book_id == bookId);
      if (!book) {
        document.body.innerHTML = "<h2>❌ Book not found.</h2>";
        return;
      }

      document.getElementById("cover").src = book.cover_image || "https://via.placeholder.com/120";
      document.getElementById("title").innerText = book.title;
      document.getElementById("desc").innerText = book.description || "No description available.";
    })
    .catch(err => {
      console.error("Error loading book:", err);
      document.getElementById("book-info").innerText = "Failed to load book details.";
    });
}

function loadReviews() {
  fetch(`http://localhost:3000/api/reviews/book/${bookId}`)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("reviews");
      if (!Array.isArray(data) || data.length === 0) {
        container.innerHTML = "<p>No reviews yet.</p>";
        return;
      }
      container.innerHTML = data.map(r => `
        <p><strong>${r.username}</strong>: ${r.review} <em>(${new Date(r.timestamp).toLocaleString()})</em></p>
      `).join('');
    })
    .catch(() => {
      document.getElementById("reviews").innerText = "Failed to load reviews.";
    });
}

function loadComments() {
  fetch(`http://localhost:3000/api/comments/book/${bookId}`)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("comments");
      if (!Array.isArray(data) || data.length === 0) {
        container.innerHTML = "<p>No comments yet.</p>";
        return;
      }
      container.innerHTML = data.map(c => `
        <p><strong>${c.username}</strong>: ${c.comment} <em>(${new Date(c.timestamp).toLocaleString()})</em></p>
      `).join('');
    })
    .catch(() => {
      document.getElementById("comments").innerText = "Failed to load comments.";
    });
}

function submitReview() {
  const review = document.getElementById("reviewText").value.trim();
  if (!review) return alert("Please enter a review.");
  fetch("http://localhost:3000/api/reviews", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_id: user.user_id,
      item_type: "book",
      item_id: bookId,
      review
    })
  })
    .then(res => res.json())
    .then(data => {
      alert(data.message || data.error);
      document.getElementById("reviewText").value = "";
      loadReviews();
    });
}

function submitComment() {
  const comment = document.getElementById("commentText").value.trim();
  if (!comment) return alert("Please enter a comment.");
  fetch("http://localhost:3000/api/comments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_id: user.user_id,
      item_type: "book",
      item_id: bookId,
      comment
    })
  })
    .then(res => res.json())
    .then(data => {
      alert(data.message || data.error);
      document.getElementById("commentText").value = "";
      loadComments();
    });
}

window.onload = () => {
  loadBookDetails();
  loadReviews();
  loadComments();
};
