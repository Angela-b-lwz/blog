const express = require('express');
const home = express.Router();
home.get('/',(req,res)=>{
    res.send('欢迎来到博客管理页面');
});
module.exports = home;