const { User } = require('../../model/user');
const hash = require('../../utils/hash');
module.exports = async (req,res,next)=>{
  const id = req.query.id;
  const { password,username,email,role,state } = req.body;
  const user = await User.findOne({_id :id});
  const pw= await hash(password);
  if(pw==user.password){
    // res.send('ok');
  await  User.updateOne({_id:id},{
        username,
        email,
        role,
        state
    });
    res.redirect('/admin/user');
  }else{
      const obj={path : '/admin/user-edit',message :"密码输入不正确不能修改",id}
      next(JSON.stringify(obj));
  }
};