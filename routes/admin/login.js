

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
    let code=ctx.request.body.code;

    // console.log(username);
    // console.log(password);
    // console.log(code);
    
    if(code==ctx.session.code){

        //前后端都需要做validation


        var result=await DB.find('admin',{"username":username,"password":password});
    
        if(result.length>0){
            //获取信息成功之后将用户信息写入session
            ctx.session.userInfo=result[0];
            ctx.redirect(ctx.state.__ROOT__+'/admin');
        }else{
            //跳出弹窗，点击ok后返回login页面
            ctx.body="<script>alert('用户名或密码错误');location.href='/admin/login'</script>";
        }
    }else{
        ctx.body="<script>alert('验证码错误');location.href='/admin/login'</script>";
    }


})



//
router.get('/code', async (ctx)=>{

    //const captcha = svgCaptcha.create({ size:6,fontSize: 50, width: 100,height:40,background:"#cc9966" });
    const captcha = svgCaptcha.create({ 
        size:4,
        fontSize: 50, 
        width: 120,
        height:34,
        background:"#cc9966" 
    });

    //console.log(captcha.text);

    //将验证码放入session
    ctx.session.code=captcha.text;

    //设置响应头。
    ctx.response.type = 'image/svg+xml';

    //将数据传给一个网页
    ctx.body=captcha.data;
    //原本显示的是一个网页，但是将这个网页的数据又给到了login页面的图片里。
});
module.exports=router.routes();
