/**
 * Created by Administrator on 2018/3/20 0020.
 */
var router=require('koa-router')();

var user=require('./admin/user.js');

var focus=require('./admin/focus.js');

var newscate=require('./admin/newscate.js');

var login=require('./admin/login.js');






//当用户输入一个包含admin的url的时候（）都会首先经过这个路由
//让后通过await next(); 像下继续匹配路由
router.use(async (ctx,next)=>{
    ctx.state.__ROOT__='http://'+ctx.header.host;
    if(ctx.session.userInfo){
        await next();
    }else{
        if((ctx.url=="/admin/login")||(ctx.url=="/admin/login/doLogin")){
            //注意这里是 admin下面的login 里的doLogin ctx.url=="/admin/login/doLogin"
            await next();
        }else{
            ctx.redirect("/admin/login");
        }
    }
    
})


//为什么这样写不行
/*

router.use(async (ctx,next)=>{
    ctx.state.__ROOT__='http://'+ctx.header.host;
    if(ctx.session.userInfo){
        await next();
    }else{
        if((ctx.url!="/admin/login")||(ctx.url!="/admin/login/doLogin")){
            ctx.redirect("/admin/login");
        }else{
            await next();
        }
    }
    
})

*/


//配置admin的子路由  层级路由
router.get('/',(ctx)=>{
    ctx.render('admin/index');
})

router.use('/user',user);
router.use('/focus',focus);

router.use('/login',login);

router.use('/newscate',newscate);


module.exports=router.routes();