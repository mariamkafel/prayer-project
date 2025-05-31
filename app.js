//main entry to the app
const express = require('express');
const dotenv = require('dotenv');
const app = express();
const PORT = 699;

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});