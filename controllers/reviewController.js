const db = require('../config/db');

exports.submitReview = (req, res) => {
  const { user_id, item_type, item_id, review } = req.body;
  const sql = `INSERT INTO Reviews (user_id, item_type, item_id, review, timestamp)
               VALUES (?, ?, ?, ?, NOW())`;

  db.query(sql, [user_id, item_type, item_id, review], (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to submit review' });
    res.json({ message: 'Review submitted successfully' });
  });
};

exports.getReviewsForItem = (req, res) => {
  const { item_type, item_id } = req.params;
  const sql = `
    SELECT r.*, u.username FROM Reviews r
    JOIN Users u ON r.user_id = u.user_id
    WHERE r.item_type = ? AND r.item_id = ?
    ORDER BY r.timestamp DESC
  `;

  db.query(sql, [item_type, item_id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to load reviews' });
    res.json(results);
  });
};
