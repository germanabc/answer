 import express from "express"
 import config from "./config"
 import path from "path"
 import router from "./router"
 import bodyParser from "body-parser"
 import proxy from "http-proxy-middleware"

// console.log( path.basename(config.staticPaths)) 
 const app=express()


//方法1 设置跨域访问
// app.all('*', function(req, res, next) {
//        res.header("Access-Control-Allow-Origin", "*");
//        res.header("Access-Control-Allow-Headers", "X-Requested-With");
//        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//        res.header("X-Powered-By",' 3.2.1');
//        res.header("Content-Type", "application/json;charset=utf-8");
//        next();
// })

//方法2 设置跨域访问
var options = {
    target: 'http://127.0.0.1', // target host 
    changeOrigin: true,               // needed for virtual hosted sites 
    ws: true,                         // proxy websockets 
    pathRewrite: {
        '^/api/old-path' : '/api/new-path',     // rewrite path 
        '^/api/remove/path' : '/path'           // remove base path 
    },
    router: {
        // when request.headers.host == 'dev.localhost:3000', 
        // override target 'http://www.example.org' to 'http://localhost:8000' 
        'dev.localhost:3000' : 'http://127.0.0.1:3000'
    }
};

var exampleProxy = proxy(options);
// const exampleProxy = proxy({
//     target: 'http://127.0.0.1:3000',
//     changeOrigin: true,
// })
 
app.use('/table', exampleProxy)
// var apiProxy = proxy('/table', { target: 'http://127.0.0.1:3000/table',changeOrigin: true })




 //配置静态资源路径
 config.staticPaths.forEach((staticPath, index)=>{
    // 通过带有/www 前缀地址访问 /www 目录中的文件
    // 这样可以很方便的配置多个静态资源目录
    app.use(`/${path.basename(staticPath)}`,express.static(staticPath))
 })


 //设置视图路径
 app.set('views', config.viewPath)
 //设置使用哪种模板引擎，后缀名为 .xtpl
 app.set('view engine', 'xtpl')

//配置处理普通表单post提交数据
//use 是中间件方法，无论get 还是 post 请求都会进入该方法, 解析一个body对象出来挂载请求参数
app.use(bodyParser.urlencoded({ extended: false }))

 //挂载路由
 app.use(router)

//  app.get('/',(req, res)=>{
//     //  res.send('hello word')
//      res.render( 'index')
//  })

//  app.get('/login',(req, res)=>{
//     res.render('login',{

//     })
//  })

 app.listen(config.port, config.host, ()=>{
     console.log('server is running')
     console.log(`please visit http:// ${config.host}:${config.port}`)
 })