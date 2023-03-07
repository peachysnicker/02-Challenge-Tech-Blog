const router = require('express').Router();
const { User, Blog } = require('../models');
const withAuth = require('../utils/auth');

// GET previous blogs from seed and render to homepage 
router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll({ //Get blogs and include model user for the name at top of page
            include: [
                {
                  model: User,
                  attributes: ['name'], 
                },
            ],
        });

        const blogs = blogData.map((blog) => blog.get({ plain: true }));
//render this data to the homepage view
        res.render('homepage', { 
          blogs, 
          logged_in: req.session.logged_in 
        });
    } catch (err) {
      res.status(500).json(err);
    }
});


// GET dashboard view 
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        // Find the logged in user based on the session ID
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Blog }],
        });

        const user = userData.get({ plain: true });
        //render to the dashboard view
        res.render('dashboard', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// ATTEMPT TO RENDER COMMENTS FROM SEED
// get one comment with serialized data
router.get('/comment/:id', async (req, res) => {
    try {
    // Search the database for a comment with an id that matches params
    const commentData = await Comment.findByPk(req.params.id);
    console.log(commentData)
    // We use .get({ plain: true }) on the object to serialize it so that it only includes the data that we need. instead of the entire object?
    const comment = dishData.get({ plain: true });
    // Then, the 'dish' template is rendered and dish is passed into the template.
    res.render('homepage', comment);
    } catch (err) {
        res.status(500).json(err);
    }
  });

// GET login
router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }
    res.render('login');
});








module.exports = router;
