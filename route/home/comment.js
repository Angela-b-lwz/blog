const { Comment } = require('../../model/comment');
module.exports = (req, res) => {
    // res.send(req.body)
    const { uid, aid, content } = req.body;
    Comment.create({
        aid: aid,
        uid: uid,
        content: content,
        time: new Date()
    })
    res.redirect('/home/article?id='+ aid);
}