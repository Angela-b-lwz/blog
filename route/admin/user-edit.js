const {User} = require('../../model/user');
module.exports = async (req,res)=>{
    req.app.locals.currentLink = 'user';
    const {message,id} = req.query;
    let user = await User.findOne({_id:id});
    if(id){
        res.render('admin/user-edit',{
            message,
            user,
            link : '/admin/user-modify?id='+id,
            button: '修改',
            username:req.session.username

        });
    }else{
        res.render('admin/user-edit',{
            message,
            link : '/admin/user-edit',
            button : "添加"

        });
    }
    
   
};