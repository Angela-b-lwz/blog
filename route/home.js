const express = require('express');
const home = express.Router();
home.get('/',require('./home/index'));
home.get('/article',require('./home/article'));
home.post('/comment',require('./home/comment'));
home.get('/login',require('./home/login'));
module.exports = home;