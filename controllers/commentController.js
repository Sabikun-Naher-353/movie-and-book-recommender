const db = require('../config/db');

exports.submitComment = (req, res) => {
  const { user_id, item_type, item_id, comment } = req.body;
  const sql = `INSERT INTO Comments (user_id, item_type, item_id, comment, timestamp)
               VALUES (?, ?, ?, ?, NOW())`;

  db.query(sql, [user_id, item_type, item_id, comment], (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to submit comment' });
    res.json({ message: 'Comment submitted successfully' });
  });
};

exports.getCommentsForItem = (req, res) => {
  const { item_type, item_id } = req.params;
  const sql = `
    SELECT c.*, u.username FROM Comments c
    JOIN Users u ON c.user_id = u.user_id
    WHERE c.item_type = ? AND c.item_id = ?
    ORDER BY c.timestamp DESC
  `;

  db.query(sql, [item_type, item_id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to load comments' });
    res.json(results);
  });
};

