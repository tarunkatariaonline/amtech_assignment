

const profile = async (req, res) => {
   res.render('profile', { username: req.user.username ,email: req.user.email,created_at:req.user.created_at,id:req.user.id});
};

module.exports = profile;
