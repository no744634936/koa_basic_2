
const Koa=require('koa');
const router=require('koa-router')();

//引入子模块

var admin=require('./routes/admin.js');
var api=require('./routes/api.js');

var app=new Koa();

//配置路由
router.get('/',(ctx)=>{

    ctx.body='这是一个首页'
})


//当用户输入http://localhost:3000/admin时，因为有admin，自动匹配/
//当用户输入http://localhost:3000/admin/user时，因为有admin 自动匹配admin/user路由。
router.use('/admin',admin);

router.use('/api',api);  



//启动路由
app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);









