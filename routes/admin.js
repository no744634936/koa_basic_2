
var router=require('koa-router')();

router.get('/',(ctx)=>{



    ctx.body='后台管理系统首页'


})

router.get('/user',(ctx)=>{



    ctx.body='用户管理'
})

router.get('/focus',(ctx)=>{

    ctx.body='轮播图管理'
})
router.get('/news',(ctx)=>{

    ctx.body='新闻管理'
})


 /*在模块里面暴露路由并且启动路由*/
module.exports=router.routes();