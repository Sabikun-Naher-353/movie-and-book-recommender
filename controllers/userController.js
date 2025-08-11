const db = require('../config/db');
const bcrypt = require('bcryptjs');

exports.registerUser = async (req, res) => {
  const { username, email, password, birth_date } = req.body;

  try {
    // Check if email already exists
    const checkSql = 'SELECT * FROM Users WHERE email = ?';
    db.query(checkSql, [email], async (err, results) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      if (results.length > 0) return res.status(400).json({ error: 'Email already in use' });

      const hashedPassword = await bcrypt.hash(password, 10);
      const insertSql = 'INSERT INTO Users (username, email, password, birth_date) VALUES (?, ?, ?, ?)';
      db.query(insertSql, [username, email, hashedPassword, birth_date], (err, result) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.status(201).json({ message: 'User registered successfully' });
      });
    });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
};

exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  const sql = `
    SELECT 
      user_id, username, email,
      DATE_FORMAT(birth_date, '%Y-%m-%d') AS birth_date,
      DATE_FORMAT(join_date, '%Y-%m-%d') AS join_date,
      password
    FROM Users
    WHERE email = ?
  `;
  db.query(sql, [email], async (err, results) => {
    if (err || results.length === 0) return res.status(400).json({ error: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, results[0].password);
    if (!valid) return res.status(401).json({ error: 'Incorrect password' });

    res.status(200).json({ message: 'Login successful', user: results[0] });
  });
};

exports.updateUser = (req, res) => {
  const { user_id, username, email, password } = req.body;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ error: 'Error hashing password' });

    const sql = 'UPDATE Users SET username = ?, email = ?, password = ? WHERE user_id = ?';
    db.query(sql, [username, email, hashedPassword, user_id], (err, result) => {
      if (err) return res.status(500).json({ error: 'Update failed' });
      res.status(200).json({ message: 'Profile updated successfully' });
    });
  });
};
exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM Users WHERE email = ?';
  db.query(sql, [email], async (err, results) => {
    if (err || results.length === 0)
      return res.status(400).json({ error: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, results[0].password);
    if (!valid)
      return res.status(401).json({ error: 'Incorrect password' });

    // Remove password before sending user object
    const user = { ...results[0] };
    delete user.password;

    res.status(200).json({ message: 'Login successful', user });
  });
};
