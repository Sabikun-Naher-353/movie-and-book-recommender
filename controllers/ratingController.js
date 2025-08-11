const db = require('../config/db');

exports.submitRating = (req, res) => {
  const { user_id, item_type, item_id, rating } = req.body;

  if (!user_id || !item_type || !item_id || !rating) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const sql = `INSERT INTO Ratings (user_id, item_type, item_id, rating, timestamp)
               VALUES (?, ?, ?, ?, NOW())`;

  db.query(sql, [user_id, item_type, item_id, rating], (err, result) => {
    if (err) {
      console.error("🔴 SQL ERROR:", err);
      return res.status(500).json({ error: 'Rating failed' });
    }
    res.json({ message: 'Rating submitted successfully' });
  });
};

exports.getRatingsForItem = (req, res) => {
  const { item_type, item_id } = req.params;
  const sql = 'SELECT * FROM Ratings WHERE item_type = ? AND item_id = ? ORDER BY timestamp DESC';

  db.query(sql, [item_type, item_id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to load ratings' });
    res.json(results);
  });
};

exports.recommendItems = (req, res) => {
  const userId = req.params.user_id;

  const sql = `
    SELECT
      r.item_type,
      r.item_id,
      AVG(r.rating) AS avg_rating, 
      CASE
        WHEN r.item_type = 'book' THEN b.title
        WHEN r.item_type = 'movie' THEN m.title
        ELSE NULL
      END AS title,
      CASE
        WHEN r.item_type = 'book' THEN b.genre
        WHEN r.item_type = 'movie' THEN m.genre
        ELSE NULL
      END AS genre
    FROM Ratings r
    LEFT JOIN Books b ON r.item_type = 'book' AND r.item_id = b.book_id
    LEFT JOIN Movies m ON r.item_type = 'movie' AND r.item_id = m.movie_id
    WHERE r.user_id != ?
    GROUP BY r.item_type, r.item_id, b.title, m.title, b.genre, m.genre
    ORDER BY avg_rating DESC
    LIMIT 5
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("🔴 Recommend items error:", err);
      return res.status(500).json({ error: 'Recommendation failed' });
    }

    res.status(200).json({ recommended: results });
  });
};

exports.getTopRated = (req, res) => {
  const sql = `
    SELECT 
      r.item_type, 
      r.item_id, 
      AVG(r.rating) AS avg_rating,
      CASE 
        WHEN r.item_type = 'book' THEN b.title
        WHEN r.item_type = 'movie' THEN m.title
        ELSE NULL
      END AS title,
      CASE 
        WHEN r.item_type = 'book' THEN b.cover_image
        WHEN r.item_type = 'movie' THEN m.cover_image
        ELSE NULL
      END AS cover_image,
      CASE 
        WHEN r.item_type = 'book' THEN b.genre
        WHEN r.item_type = 'movie' THEN m.genre
        ELSE NULL
      END AS genre
    FROM Ratings r
    LEFT JOIN Books b ON r.item_type = 'book' AND r.item_id = b.book_id
    LEFT JOIN Movies m ON r.item_type = 'movie' AND r.item_id = m.movie_id
    GROUP BY r.item_type, r.item_id, b.title, m.title, b.cover_image, m.cover_image, b.genre, m.genre
    ORDER BY avg_rating DESC
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to load top-rated items' });
    res.json(results);
  });
};

exports.getByGenre = (req, res) => {
  const genre = req.params.genre;
  const sql = `
    SELECT 
      items.item_type,
      items.id,
      items.title,
      items.genre,
      items.author,
      items.cover_image,
      AVG(r.rating) AS avg_rating
    FROM (
      SELECT 
        'movie' AS item_type,
        movie_id AS id,
        title,
        genre,
        NULL AS author,
        cover_image
      FROM Movies

      UNION

      SELECT 
        'book' AS item_type,
        book_id AS id,
        title,
        genre,
        author,
        cover_image
      FROM Books
    ) AS items
    LEFT JOIN Ratings r ON r.item_type = items.item_type AND r.item_id = items.id
    WHERE items.genre LIKE ?
    GROUP BY items.item_type, items.id, items.title, items.genre, items.author, items.cover_image
  `;

  db.query(sql, [`%${genre}%`], (err, results) => {
    if (err) {
      console.error("Error fetching by genre with avg rating:", err);
      return res.status(500).json({ error: "Database query error" });
    }
    res.json(results);
  });
};

exports.getTrendingItems = (req, res) => {
  const sql = `
    SELECT 
      r.item_type, 
      r.item_id, 
      COUNT(*) AS rating_count,
      AVG(r.rating) AS avg_rating,
      CASE 
        WHEN r.item_type = 'book' THEN b.title
        WHEN r.item_type = 'movie' THEN m.title
        ELSE NULL
      END AS title,
      CASE 
        WHEN r.item_type = 'book' THEN b.cover_image
        WHEN r.item_type = 'movie' THEN m.cover_image
        ELSE NULL
      END AS cover_image,
      CASE 
        WHEN r.item_type = 'book' THEN b.genre
        WHEN r.item_type = 'movie' THEN m.genre
        ELSE NULL
      END AS genre
    FROM Ratings r
    LEFT JOIN Books b ON r.item_type = 'book' AND r.item_id = b.book_id
    LEFT JOIN Movies m ON r.item_type = 'movie' AND r.item_id = m.movie_id
    WHERE r.timestamp >= NOW() - INTERVAL 7 DAY
    GROUP BY r.item_type, r.item_id, b.title, m.title, b.cover_image, m.cover_image, b.genre, m.genre
    ORDER BY rating_count DESC
    LIMIT 10
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("🔥 Error fetching trending items:", err);
      return res.status(500).json({ error: "Trending query failed" });
    }

    res.json(results);
  });
};
