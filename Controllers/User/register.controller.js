const bcrypt = require('bcrypt');
const client = require('../../Database/connection');

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const date = new Date();
    
    if (!username || !email || !password) {
      return res.render('auth/register', { message: "Please provide all details." });
    }

    const userExists = await client.query(
      'SELECT * FROM usertable WHERE email = $1',
      [email]
    );
    if (userExists.rows.length > 0) {
      return res.render('auth/register', { message: "User email already exists!" });
    }

    const userExistsUsername = await client.query(
      'SELECT * FROM usertable WHERE username = $1',
      [username]
    );
    if (userExistsUsername.rows.length > 0) {
      return res.render('auth/register', { message: "Username already exists!" });
    }

    const table = await client.query('SELECT * FROM usertable');
    const id = table.rows.length + 1;

    const hashedPassword = await bcrypt.hash(password, 12);

    await client.query(
      'INSERT INTO usertable (username, email, password, created_at, id) VALUES ($1, $2, $3, $4, $5)',
      [username, email, hashedPassword, date, id]
    );

    res.render('auth/register', {
      message: "User created successfully. Please log in."
    });
  } catch (error) {
    
    res.status(500).render('auth/register', {
      message: "Something went wrong. Please try again later."
    });
  }
};

module.exports = register;
