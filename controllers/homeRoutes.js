const router = require('express').Router();
const { User, Blog } = require('../models');
const withAuth = require('../utils/auth');

// Get dashboard when logged in is confirmed 

router.get('/', withAuth, async (req, res) => { 
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
    });

    const users = userData.map((project) => project.get({ plain: true })); //remove special characters

    res.render('dashboard', { //then it will render the dashboard to view your blogs and add new
      users,
      logged_in: req.session.logged_in, //will this render your session data?
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/'); 
    return;
  }

  res.render('login');
});


module.exports = router;
