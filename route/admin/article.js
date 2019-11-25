const { Article } = require('../../model/article');
const paging = require('mongoose-sex-page');
module.exports = async (req, res) => {
    const page = req.query.page||1;
    req.app.locals.currentLink = 'article';
    const articles = await paging(Article).find().page(page).size(2).display(3).populate('author').exec();
    // res.send(articles);
    // return;
    res.render('./admin/article', {
        username: req.session.username,
        articles
    });
}