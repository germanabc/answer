import express from "express"
import * as articleController from "./controllers/article"
import * as commentController from "./controllers/comment"
import * as indexController from "./controllers/index"
import * as userController from "./controllers/user"
const router=express.Router()
router
.get('/', indexController.showIndex)
.get('/login', userController.showLogin)
.get('/register', userController.showRegister)
.post('/register', userController.doRegister)
.get('/table', userController.showTable)
.post('/table', userController.doTable)
.get('/logout', (req,res)=>{
    res.render('logout',{
        title: "退出"
    })
})
.get('/publish/article', (req,res)=>{
    res.render('publish')
})
.get('/article', (req,res)=>{
    res.render('article')
})
.get('/edit', (req,res)=>{
    res.render('article')
})
.get('/setting', (req,res)=>{
    res.render('setting')
})
export default router