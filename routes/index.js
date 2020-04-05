


var router=require('koa-router')();

//前台首页的显示。
router.get('/',async (ctx)=>{

        await ctx.render('default/index');
})

router.get('/case',(ctx)=>{

    ctx.body='案例'
})

router.get('/about',async (ctx)=>{

    await ctx.render('default/about');
})

module.exports=router.routes();