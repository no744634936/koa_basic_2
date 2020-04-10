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

    // console.log(ctx.session.userInfo);
    // console.log(ctx.url);
    
    //如果有session继续向下匹配路由。
    if(ctx.session.userInfo){
        //这个表示继续向下匹配路由，执行代码
        await next();
    }else{
        //如果没有session不存在
        //如果用户输入的url不是 localhost:3000/admin/login那么跳转到login页面
        if(ctx.url!="/admin/login" || ctx.url!="/admin/login"){
            ctx.redirect("/admin/login");
        }else{
            // 如果用户输入的url是 localhost:3000/admin/login.继续向下匹配路由。
            await next();
        }
    }
    
})





//配置admin的子路由  层级路由
router.get('/',(ctx)=>{
    ctx.render('admin/index');
})

router.use('/user',user);
router.use('/focus',focus);

router.use('/login',login);

router.use('/newscate',newscate);


module.exports=router.routes();