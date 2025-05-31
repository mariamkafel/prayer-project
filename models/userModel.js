//models are used to communicate to mydata base
const mysql = require('mysql2/promise');

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};
exports.insertUser=async(username,hashedPassword,email)=>{
  const connection = await mysql.createConnection(dbConfig);
  const query ='INSERT INTO accounts (username,password,email) VALUES(?,?,?)';
  await connection.execute(query ,[username,hashedPassword,email]);
  await connection.end();

}

exports.findUserByUsernameAndPassword = async (username, password) => {
  const connection = await mysql.createConnection(dbConfig);
  const [rows] = await connection.execute(
    'SELECT * FROM accounts WHERE username = ? AND password = ?',
    [username, password]
  );
  await connection.end();
  return rows;
};


exports.findUserByUsername = async (username) => {
  const connection = await mysql.createConnection(dbConfig);
  const [rows] = await connection.execute(
    'SELECT * FROM accounts WHERE username = ?',
    [username]
  );
  await connection.end();
  return rows;
};
