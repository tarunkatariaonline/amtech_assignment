const client = require('../Database/connection');
const jwt = require('jsonwebtoken');

const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.render('profile', { username: null });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const email = decoded.email;

    const result = await client.query(
      'SELECT * FROM usertable WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
       return res.render('profile', { username: null });
    }

    const user = result.rows[0];

    req.user = {
      email: user.email,
      username: user.username,
      created_at: user.created_at,
      id: user.id
    };

    next();
  } catch (error) {
    console.error('Auth Error:', error);
    return res.status(401).render('profile', {
      username: null,

    });
  }
};

module.exports = userAuth;
