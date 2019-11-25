const express = require('express');
const app = express();

// 导入morgan这个第三方模块
const morgan = require('morgan');
// 导入config模块
const config = require('config');

const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

const dateformat = require('dateformat');
const arttemplate = require('art-template');
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
arttemplate.defaults.imports.dateformat = dateformat;
console.log(config.get('title'))

// 获取系统环境变量 返回值是对象 
if (process.env.NODE_ENV == 'development') {
	// 当前是开发环境
	console.log('当前是开发环境')
	// 在开发环境中 将客户端发送到服务器端的请求信息打印到控制台中
	app.use(morgan('dev'))
} else {
	// 当前是生产环境
	console.log('当前是生产环境')
}

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
