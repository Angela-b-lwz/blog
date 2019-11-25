const express = require('express');
const admin = express.Router();

admin.get('/login',require('./admin/loginPage'));
admin.get('/logout',require('./admin/logout'));
admin.post('/login', require('./admin/login'));

admin.get('/user', require('./admin/userPage'));
admin.get('/user-edit',require('./admin/user-edit'));
admin.post('/user-edit', require('./admin/user-edit-fn'));
admin.post('/user-modify',require('./admin/user-modify'));
admin.get('/user-del',require('./admin/user-del'));

admin.get('/article',require('./admin/article'));
admin.get('/article-edit',require('./admin/article-edit'));
admin.post('/article-add', require('./admin/article-add'));

module.exports = admin;
