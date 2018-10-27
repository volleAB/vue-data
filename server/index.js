const Koa = require('koa')
const Controller = require('./controller.js')

//router
const Router = require('koa-router')

//koa-cors
const cors = require('koa2-cors')

//父路由
const router = new Router()

const app = new Koa()

app.use(cors({
    origin: function (ctx) {
        if (ctx.url) {
        return "*";
        }
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
    }))

const agricultureDatasRouter = new Router()
agricultureDatasRouter.get('/agriculture', Controller.fixAgriculture)

const industryDatas = new Router()
industryDatas.get('/industry', Controller.fixIndustry)

router.use('/api', agricultureDatasRouter.routes(), agricultureDatasRouter.allowedMethods())
router.use('/api', industryDatas.routes(), industryDatas.allowedMethods())

app.use(router.routes()).use(router.allowedMethods());

app.listen(3030, () => {
  console.log('http://localhost:3030/')
});