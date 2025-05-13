const client = require('../../Database/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;

    if (!usernameOrEmail || !password) {
      return res.render('auth/login', { message: "Please provide details!" });
    }

    const result = await client.query(
      'SELECT * FROM usertable WHERE username = $1 OR email = $1',
      [usernameOrEmail]
    );

    if (result.rows.length === 0) {
      return res.render('auth/login', { message: "User not found!" });
    }

    const user = result.rows[0];
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.render('auth/login', { message: "Password is incorrect" });
    }

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET_KEY);

    res.cookie('token', token, {
      expires: new Date(Date.now() + 1000 * 60 * 15), 
    });

    res.redirect('/');
  } catch (error) {
    res.status(500).render('auth/login', { message: "Something went wrong. Please try again later." });
  }
};

module.exports = login;
