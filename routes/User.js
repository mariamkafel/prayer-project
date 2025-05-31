const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const prayerController= require('../controllers/prayerController');

const validateLoginFields = require('../middlewares/validateLoginFields');
const validatePrayer = require('../middlewares/validatePrayer');
const authenticateToken = require('../middlewares/authenticateToken');

// used for checking
console.log('validateLoginFields:', typeof validateLoginFields);
console.log('validatePrayer:', typeof validatePrayer);
console.log('authenticateToken:', typeof authenticateToken);
console.log('userController.login:', typeof userController.login);
console.log('prayerController.insertPrayer:', typeof prayerController.insertPrayer); 
console.log('prayerController.getPrayers:', typeof prayerController.getPrayers); 

// Authentication
router.post('/login', validateLoginFields, userController.login);

// Get posts (protected)
router.get('/get_login_info', authenticateToken, userController.get_login_info);

// Insert prayer
router.post('/insert_prayer', validatePrayer, prayerController.insertPrayer);

// Get prayers
router.get('/get_prayer', prayerController.getPrayers);
//signin
router.post('/signup',userController.signin);

module.exports = router;