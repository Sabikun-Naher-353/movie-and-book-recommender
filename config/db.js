const mysql = require('mysql2');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'recommendation_db'
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL connected.');
});

module.exports = db;
