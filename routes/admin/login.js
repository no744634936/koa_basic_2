

var DB=require('../../module/db.js');
var md5=require('md5');


//console.log(md5('123456'));
var router=require('koa-router')();

router.get('/',async (ctx)=>{
    await  ctx.render('admin/login');
})


router.post('/doLogin', async (ctx)=>{

    var username=ctx.request.body.username;
    var password=md5(ctx.request.body.password);
    let code=ctx.request.body.code;

    // console.log(username);
    // console.log(password);
    // console.log(code);


        var result=await DB.find('admin',{"username":username,"password":password});
    
        if(result.length>0){
            //获取信息成功之后将用户信息写入session
            ctx.session.userInfo=result[0];
            ctx.redirect(ctx.state.__ROOT__+'/admin');
        }else{
            //跳出弹窗，点击ok后返回login页面
            ctx.body="<script>alert('用户名或密码错误');location.href='/admin/login'</script>";
        }

})


router.get("/logout",(ctx,next)=>{
    ctx.session.userInfo=null;
    ctx.redirect(ctx.state.__ROOT__+"/admin/login");
})



module.exports=router.routes();
