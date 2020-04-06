/**
 * Created by Administrator on 2018/3/20 0020.
 */
var router = require('koa-router')();
//引入模块

var login=require('./admin/login.js');

var user=require('./admin/user.js');

//配置中间件 获取url的地址


router.use(async (ctx,next)=>{
    //console.log(ctx.request.header.host);

    //匹配到这个中间件之后，我们给全局设定一个__HOST__ 变量。view里面的__HOST__就是在这里设置的。
    //然后 await  next(); 让模板引擎使用。 为什么要这样写？
    ctx.state.__HOST__='http://'+ctx.request.header.host;

    await  next();

})


router.get('/',async (ctx)=>{

    ctx.body="后台管理";

})

router.use('/login',login);
router.use('/user',user);




module.exports=router.routes();