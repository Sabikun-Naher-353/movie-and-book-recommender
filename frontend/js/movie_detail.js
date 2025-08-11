const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");
const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
  alert("Please login first");
  window.location.href = "login.html";
}

function loadMovieDetails() {
  fetch("http://localhost:3000/api/items/movies")
    .then(res => res.json())
    .then(movies => {
      const movie = movies.find(m => m.movie_id == movieId);
      if (!movie) {
        document.body.innerHTML = "<h2>❌ Movie not found.</h2>";
        return;
      }

      document.getElementById("cover").src = movie.cover_image || "https://via.placeholder.com/120";
      document.getElementById("title").innerText = movie.title;
      document.getElementById("desc").innerText = movie.description || "No description available.";
    })
    .catch(err => {
      console.error("📕 Error loading movie:", err);
      document.getElementById("movie-info").innerText = "Failed to load movie details.";
    });
}

function loadReviews() {
  fetch(`http://localhost:3000/api/reviews/movie/${movieId}`)
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
  fetch(`http://localhost:3000/api/comments/movie/${movieId}`)
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
      item_type: "movie",
      item_id: movieId,
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
      item_type: "movie",
      item_id: movieId,
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
  loadMovieDetails();
  loadReviews();
  loadComments();
};
