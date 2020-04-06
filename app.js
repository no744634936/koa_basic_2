//引入 koa模块

var Koa=require('koa'),
     router = require('koa-router')(),
    path=require('path'),
    render = require('koa-art-template'),
    static = require('koa-static');

//实例化
var app=new Koa();

//配置模板引擎
render(app, {
    root: path.join(__dirname, 'views'),
    extname: '.html',
    debug: process.env.NODE_ENV !== 'production'
});
//配置 静态资源的中间件
app.use(static(__dirname + '/public'));



//引入模块

var index=require('./routes/index.js');
var api=require('./routes/api.js');
var admin=require('./routes/admin.js');


router.use('/admin',admin);
router.use('/api',api);
router.use(index);  
//这个默认的路由文件放最下面因为如果当index.js文件里有，/admin/good 之类的路由的时候。
//会优先匹配到这个。而不是admin.js文件里的路由



app.use(router.routes());   /*启动路由*/
app.use(router.allowedMethods());

app.listen(3000);







