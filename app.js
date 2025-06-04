//main entry to the app
const express = require('express');
const dotenv = require('dotenv');
const app = express();
const PORT = 699;
const path = require('path');
const cors =require('cors')
// app.use(cors())
// const cors = require('cors');

//Configure CORS properly
app.use(cors({
  origin: [ 'http://127.0.0.1:5500', 'http://localhost:5500'], // Add your frontend URLs
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.get('/', (req, res) => {
  res.json({ 
    message: 'Prayer Management API is running!', 
    status: 'OK',
    endpoints: {
      login: 'POST /User/login',
      signup: 'POST /User/signup',
      getUserInfo: 'GET /User/get_login_info',
      addPrayer: 'POST /User/insert_prayer',
      getPrayers: 'GET /User/get_prayer'
    }
  });
});
//should remove
// app.use(express.static(path.join(__dirname, '../front')));
// console.log('Static files folder:', path.join(__dirname, '../front'));

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Routes
const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
module.exports=app