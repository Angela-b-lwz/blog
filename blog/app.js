const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
require('./model/connect');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
	secret: 'secret key', saveUninitialized: false,
	cookie: {
		maxAge: 24 * 60 * 60 * 1000
	}
}));

app.engine('art', require('express-art-template'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'art');

app.use(express.static(path.join(__dirname, 'public')));

const home = require('./route/home');
app.use('/home', home);

const admin = require('./route/admin');
app.use('/admin', require('./middleware/loginGuard'))
app.use('/admin', admin);
app.use((err, req, res, next) => {
	// 将字符串对象转换为对象类型
	// JSON.parse() 
	const result = JSON.parse(err);
	let arr = [];
	for (let attr in result) {
		if (result[attr] != result.path) {
			arr.push(attr + '=' + result[attr]);
		}
	}
	res.redirect(`${result.path}?${arr.join('&')}`);
});
app.listen(80);
console.log('服务器登录成功http://localhost/admin/login');
