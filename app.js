var Koa=require('koa'),
    router = require('koa-router')(),
    render = require('koa-art-template'),
    path=require('path'),

    DB=require('./module/db.js');

var app=new Koa();
//配置 koa-art-template模板引擎
render(app, {
    root: path.join(__dirname, 'views'),   // 视图的位置
    extname: '.html',  // 后缀名
    debug: process.env.NODE_ENV !== 'production'  //是否开启调试模式
});
router.get('/',async (ctx)=>{

    console.time('start');
    var result=await DB.find('test',{});
    console.timeEnd('start');
    console.log(result);

    await ctx.render('index',{
        list:{
            name:'张三'
        }
    });
})
router.get('/news',async (ctx)=>{

    console.time('start');
    var result=await DB.find('test',{});
    console.timeEnd('start');

    ctx.body="这是一个新闻页面";
})


router.get('/add',async (ctx)=>{

    let insert_promise=await DB.insert("test",{"username":"zhanghaifeng","age":27,"sex":"男","status":1});
    console.log(insert_promise.result); //如果增加成功会返回这个{ n: 1, ok: 1 }

    ctx.body="这是用来添加数据到数据库的页面";
})


router.get('/update',async (ctx)=>{

    let update_promise=await DB.update("test",{"username":"zhanghaifeng"},{"username":"赵飞燕"})
    console.log(update_promise.result);
    ctx.body="这是用来更新数据库里数据的页面";
})


router.get('/delete',async (ctx)=>{

    let remove_promise=await DB.remove("test",{"username":"zhanghaifeng"})
    console.log(remove_promise.result);
    ctx.body="这是用来散出数据库里数据的页面";
})



app.use(router.routes());   /*启动路由*/
app.use(router.allowedMethods());
app.listen(3000, () => {
    console.log('server is running at http://localhost:3000')
  })

