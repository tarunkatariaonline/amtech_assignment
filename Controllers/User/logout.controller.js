const logout = async (req, res) => {
  try {
    res.cookie('token', null, {
      expires: new Date(Date.now()),
    });

    res.redirect('/');
  } catch (error) {
    res.status(500).send('Logout failed. Please try again.');
  }
};

module.exports = logout;
