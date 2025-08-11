const db = require('../config/db');

exports.getBooks = (req, res) => {
  const sql = `
    SELECT b.book_id, 
      b.title, 
      b.author,
      b.genre,
      b.description,
      b.cover_image,
           ROUND(AVG(r.rating), 1) AS avg_rating
    FROM Books b
    LEFT JOIN Ratings r ON r.item_type = 'book' AND r.item_id = b.book_id
    GROUP BY b.book_id
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch books' });
    res.status(200).json(results);
  });
};

exports.getMovies = (req, res) => {
  const sql = `
    SELECT 
      m.movie_id, 
      m.title, 
      m.genre, 
      m.description,
      m.release_year,
      m.cover_image,
      AVG(r.rating) AS avg_rating
    FROM Movies m
    LEFT JOIN Ratings r ON r.item_type = 'movie' AND r.item_id = m.movie_id
    GROUP BY m.movie_id
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Failed to fetch movies:", err);
      return res.status(500).json({ error: 'Failed to fetch movies' });
    }
    res.status(200).json(results);
  });
};

exports.addMovie = (req, res) => {
  const { title, genre, cover_image } = req.body;
  const sql = 'INSERT INTO Movies (title, genre, cover_image) VALUES (?, ?, ?)';
  db.query(sql, [title, genre, cover_image || null], (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to add movie' });
    res.status(201).json({ message: 'Movie added successfully' });
  });
};

exports.addBook = (req, res) => {
  const { title, author, cover_image } = req.body;
  const sql = 'INSERT INTO Books (title, author, cover_image) VALUES (?, ?, ?)';
  db.query(sql, [title, author, cover_image || null], (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to add book' });
    res.status(201).json({ message: 'Book added successfully' });
  });
};

exports.deleteMovie = (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM Movies WHERE movie_id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Delete failed' });
    res.status(200).json({ message: 'Movie deleted successfully' });
  });
};

exports.deleteBook = (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM Books WHERE book_id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Delete failed' });
    res.status(200).json({ message: 'Book deleted successfully' });
  });
};


