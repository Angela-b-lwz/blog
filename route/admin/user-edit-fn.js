
const { User, validateUser } = require('../../model/user');
const hash = require('../../utils/hash');
module.exports = async (req, res, next) => {
    try {
        await validateUser(req.body)
    } catch (err) {
        // res.redirect(`/admin/user-edit?message=${err.message}`)
        return next(JSON.stringify({ path: '/admin/user-edit', message: err.message }))
    }
    const user = await User.findOne({ email: req.body.email });
    if (user) {
        // 之前的邮箱已经存在了   
        // return res.redirect(`/admin/user-edit?message=邮箱已经存在`);
        return next(JSON.stringify({ path: '/admin/user-edit', message: '邮箱地址已经被占用' }))
    } else {
        const password = await hash(req.body.password);
        req.body.password = password;
        // 添加用户
        await User.create(req.body);
        // 跳转到用户列表
        res.redirect('/admin/user');
    }
};

