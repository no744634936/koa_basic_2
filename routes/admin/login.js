

var DB=require('../../module/db.js');
var md5=require('md5');
var svgCaptcha = require('svg-captcha');

//
//console.log(md5('123456'));
var router=require('koa-router')();

router.get('/',async (ctx)=>{
    await  ctx.render('admin/login');
})


router.post('/doLogin', async (ctx)=>{

    var username=ctx.request.body.username;
    var password=md5(ctx.request.body.password);

    console.log(username);
    console.log(password);
    
    var result=await DB.find('admin',{"username":username,"password":password});
    
    if(result.length>0){
        //获取信息成功之后将用户信息写入session
        ctx.session.userInfo=result[0];
        ctx.redirect(ctx.state.__ROOT__+'/admin');
    }else{
        //跳出弹窗，点击ok后返回login页面
        ctx.body="<script>alert('登录失败');location.href='/admin/login'</script>";
    }

})


router.get('/code', async (ctx)=>{


    //const captcha = svgCaptcha.create({ size:6,fontSize: 50, width: 100,height:40,background:"#cc9966" });

    const captcha = svgCaptcha.create({ size:4,fontSize: 50, width: 120,height:34,background:"#cc9966" });

    //console.log(captcha.text);

    ctx.session.code=captcha.text;

    ctx.response.type = 'image/svg+xml';
    ctx.body=captcha.data;

});
module.exports=router.routes();
