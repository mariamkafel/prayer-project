function validatePrayer(req, res, next) {
  if (!req.body.name || !req.body.time) {
    return res.status(400).send('Missing name or time');
  }
  next();
}

module.exports = validatePrayer; // Change this line