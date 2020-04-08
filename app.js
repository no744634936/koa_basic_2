/*
 koa 连接mysql数据库

 1、必须安装mysql    百度      ----安装的时候填写 mysql管理员账户  密码



2、mysql curd语句



     mysql增加数据：

           INSERT INTO user (username,password) value ('zhangsan','123456')

     mysql修改数据：
             update user set username='zhangsan',`password`='123456'  where id=2


     mysql删除数据：
            DELETE from user WHERE id=3

     mysql查询数据：
            SELECT * from `user` where username='admin'



 3、koa 操作mysql数据库   https://github.com/mysqljs/mysql



    1、安装mysql 模块

        npm install mysql --save


    2、引入mysql、建立连接 获取连接对象   操作mysql数据库


         var mysql      = require('mysql');
         var connection = mysql.createConnection({
             host     : 'localhost',
             user     : 'me',
             password : 'secret',
             database : 'my_db'
         });

         connection.connect();

         connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
             if (error) throw error;
             console.log('The solution is: ', results[0].solution);
         });

         connection.end();  //关闭连接


* */

var Koa=require('koa'),
    router = require('koa-router')(),
    views = require('koa-views'),
    bodyParser = require('koa-bodyparser'),
    static = require('koa-static'),
    DB=require('./module/mysqlDB.js');




var app=new Koa();
/*应用ejs模板引擎*/
app.use(views('views',{
    extension:'ejs'
}))


app.use(static(__dirname+'/public'));   //koa静态资源中间件可以配置多个

//配置post bodyparser的中间件
app.use(bodyParser());


router.get('/',async (ctx)=>{


    var sql='select * from user';
    var result=await DB.query(sql);

    await ctx.render('index',{

        list:result
    })
    //console.log(result);


})

router.get('/add',async (ctx)=>{

  /*
  第一种增加的方法

   var username='王麻子';

   var password='12213325';

   var sql='insert into user (username,password) value ("'+username+'","'+password+'")';

   console.log(sql);
   var result=await DB.query(sql);


  * */



    var username='王麻子6666';
    var password='66666';



    var sql='insert into user (username,password) value (?,?)';
    var params=[username,password];

    var result=await DB.query(sql,params);
    ctx.body='增加成功';

})

router.get('/edit',async (ctx)=>{



    var username='哈哈';
    var password='123456666';

    var sql='update user set username=?,password=? where id=3';

    var result=await DB.query(sql,[username,password]);
    ctx.body='修改成功';

})

router.get('/delete',async (ctx)=>{




    var sql='delete from user where id=8';
    var result=await DB.query(sql);

    ctx.body='删除成功';

})


app.use(router.routes());   /*启动路由*/
app.use(router.allowedMethods());
app.listen(3000);







