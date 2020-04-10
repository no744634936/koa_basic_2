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

    //定义一个全局变量G，然后再每一个页面都可以使用这个userInfo里面的信息了
    ctx.state.G={
        userInfo:ctx.session.userInfo,
    }

    if(ctx.session.userInfo){
        await next();
    }else{
        if((ctx.url=="/admin/login")||(ctx.url=="/admin/login/doLogin")){
            await next();
        }else{
            ctx.redirect("/admin/login");
        }
    }
    
})


//配置admin的子路由  层级路由
router.get('/',(ctx)=>{
    ctx.render('admin/index');
});

router.get("/logout",(ctx,next)=>{
    ctx.session.userInfo=null;
    ctx.redirect(ctx.state.__ROOT__+"/admin/login");
})

router.use('/user',user);
router.use('/focus',focus);

router.use('/login',login);

router.use('/newscate',newscate);





module.exports=router.routes();