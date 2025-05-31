const mysql = require('mysql2/promise');

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

exports.insertNewPrayer = async (name, time) => {
  const connection = await mysql.createConnection(dbConfig);
  const query = 'INSERT INTO prayer_table (name, time) VALUES (?, ?)';
  await connection.execute(query, [name, time]);
  await connection.end();
};

exports.getAllPrayers = async () => {
  const connection = await mysql.createConnection(dbConfig);
  const [rows] = await connection.execute('SELECT * FROM prayer_table');
  await connection.end();
  return rows;
};
