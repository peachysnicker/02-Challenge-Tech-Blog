const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth');


// POST for creation new blog
router.post('/', withAuth, async (req, res) => {
    try {
        const newBlog = await Blog.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newBlog);
    } catch (err) {
        res.status(400).json(err);
    }
});




// get route for rendering post.handlebars
router.get('/blogs', withAuth, async (req, res) => {
    try {
        res.render('blogs', {
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;