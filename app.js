let Koa=require('koa');
let router = require('koa-router')();
let render = require('koa-art-template');
let path=require('path');
let DB=require('./module/db.js');
let bodyParser=require('koa-bodyparser');

var app=new Koa();
//配置 koa-art-template模板引擎
render(app, {
    root: path.join(__dirname, 'views'),   // 视图的位置
    extname: '.html',  // 后缀名
    debug: process.env.NODE_ENV !== 'production'  //是否开启调试模式
});


//显示user info
router.get('/',async (ctx)=>{

    var result=await DB.find('test',{});
    await ctx.render('index',{
        list:result,
    });
})

//add user 
router.get('/add',async (ctx)=>{
    await ctx.render("add")
})


//insert  注意这里是post 方法
app.use(bodyParser());
router.post('/insert',async (ctx)=>{
    // console.log(ctx.request.body);
    try{
        let insert_promise=await DB.insert("test",ctx.request.body);
        if(insert_promise.result.ok){
            ctx.redirect("/");
        }
    }catch(err){
        console.log(err);
    }
})

//
router.get('/edit',async (ctx)=>{
    //根据url里面传过来的值获取用户信息。
    let id=ctx.query.id;
    //mongodb里面查询_id时，需要把字符串转换成object。转换方法已经在bd.js文件中封装好了
    let target=await DB.find("test",{"_id":DB.getObjectId(id)});
    await ctx.render("edit",{
        list:target[0],
    })
})


//
router.post('/update',async (ctx)=>{
    try{
        //因为await DB.update可能失败所以要try catch
        let new_data=ctx.request.body;
        let target_id=ctx.request.body._id;
        let username=ctx.request.body.username;
        let age=ctx.request.body.age;
        let sex=ctx.request.body.sex;
        console.log(new_data);
        let update_data=await DB.update("test",{"_id":DB.getObjectId(target_id)},{
            "username":username,
            "age":age,
            "sex":sex,
        })
        console.log(update_data.result);
        ctx.body="这是用来更新数据库里数据的页面";
    }catch(err){
        console.log(err);
    }

})


router.get('/delete',async (ctx)=>{

    try{
        let id=ctx.query.id;
        let remove_data=await DB.remove("test",{"_id":DB.getObjectId(id)});
        ctx.redirect("/");

        console.log(remove_data.result);
        ctx.body="这是用来删除数据库里数据的页面";
    }catch(err){
        console.log(err);
        ctx.redirect("/");
    }


})



app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3000, () => {
    console.log('server is running at http://localhost:3000')
  })

