const { User } = require('../../model/user');
module.exports = async (req, res) => {
    req.app.locals.currentLink = 'user';
    let page = req.query.page || 1;
    let pagesize = 2;
    let count = await User.countDocuments();
    let total = Math.ceil(count / pagesize);
    let start = (page - 1) * pagesize;
    const users = await User.find().limit(pagesize).skip(start);
    res.render('admin/user', {
        username: req.session.username,
        users,
        page,
        total
    });
}