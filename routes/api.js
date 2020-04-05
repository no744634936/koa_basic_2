
var router=require('koa-router')();

router.get('/',(ctx)=>{

    ctx.body={"title":"这是一个api"};
})

router.get('/newslist',(ctx)=>{

    ctx.body={"title":"这是一个新闻接口"};
})

router.get('/focus',(ctx)=>{

    ctx.body={"title":"这是一个轮播图的api"};
})


 /*在模块里面暴露路由并且启动路由*/
module.exports=router.routes();