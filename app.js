
const Koa=require('koa'),

     router=require('koa-router')(),
    render = require('koa-art-template'),
    path=require('path'); //

//引入子模块

var admin=require('./routes/admin.js');
var api=require('./routes/api.js');
var index=require('./routes/index.js');

var app=new Koa();
//配置koa-art-template 模板引擎
render(app, {
    root: path.join(__dirname, 'views'),
    extname: '.html',
    debug: process.env.NODE_ENV !== 'production'
});

//配置路由
router.use(index);

router.use('/admin',admin);

router.use('/api',api);

//启动路由
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);









