function validateLoginFields(req, res, next) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send('Missing username or password');
  }
  next();
}

module.exports = validateLoginFields; 