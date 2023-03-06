const router = require('express').Router();
const { Blog } = require('../../models');


// GET homepage with blogs seeded already to display
router.get('/blog', async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            attributes: ['title', 'content'],
        });

        const blogs = blogData.map((blog) => blog.get({ plain: true }));

        res.render('blog', {
            blogs,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;