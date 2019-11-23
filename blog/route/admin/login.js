const { User } = require('../../model/user');
const hash = require('../../utils/hash');
module.exports = async (req, res) => {
    const { email, password } = req.body;
    if (email.length == 0 || password.length == 0) {
        res.status(400).render('admin/error', { msg: '用户名或密码不能为空' })
    }
    const user = await User.findOne({ email });
    if (user) {
        if (hash(password) === user.password) {
            req.session.username = user.username;
            req.app.locals.userInfo = user;
            res.redirect('/admin/user');
        } else {
            res.status(400).render('admin/error', {
                msg: '用户名或密码错误'
            });
        }
    } else {
        res.status(400).render('admin/error', {
            msg: '用户名或密码错误'
        })
    }


}