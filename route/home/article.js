const { Comment } = require('../../model/comment');
const { Article } = require('../../model/article');
module.exports = async (req, res) => {   
    const articles = await Article.findOne({_id : req.query.id}).populate('author');
    const comments = await Comment.find({aid: req.query.id}).populate('uid');
    res.render('home/article',{
        articles,
        comments
    })
}