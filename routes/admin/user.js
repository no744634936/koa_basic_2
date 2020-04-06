/**
 * Created by Administrator on 2018/3/20 0020.
 */
var router = require('koa-router')();


router.get('/',async (ctx)=>{

    ctx.body="用户管理";
})


router.get('/add',async (ctx)=>{

    ctx.body="增加用户";

})

router.get('/edit',async (ctx)=>{

    ctx.body="编辑用户";

})

router.get('/delete',async (ctx)=>{

    ctx.body="删除用户";

})

module.exports=router.routes();