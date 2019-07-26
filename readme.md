# 问答社区

## 路由设计

get    /           渲染首页
get    /register   渲染注册页面
post   /register   处理注册请求
get    /login      渲染登录页面
post    /login     处理登录请求

get     /logout      处理用户退出请求
get     /publish/article   渲染发表文章页面
post     /publish/article   处理发表文章请求
get      /article?id=xx 渲染文章页面
get      /publish/article/id 渲染编辑文章页面
post     /publish/article/id 处理编辑文章请求

get      /setting    渲染设置用户信息页面
post     /setting   处理设置用户信息请求


## 设计数据表
详见： `blog.sql` 文件

## 项目初始化
- github 创建仓库地址：https://github.com/germanabc/answer-my.git
- `gti clone https://github.com/germanabc/answer-my.git`
- readme.md
- package.json
  + `npm init`
- 搭建es6 环境  (让node 完全支持 es6 代码)
  + `npm install --save-dev babel-register` , 安装

  + 在项目根路径下创建 `.babelrc`文件
     * 在该文件中输入内容  "presets":["es2015"] , 告诉babel 解析成 es2015的代码
  + 安装对应的解析包：`npm install --save-dev babel-preset-es2015`

  +  在项目的根目录下创建一个傀儡文件： main.js
    * 在 main.js 文件中输入 require("babel-register")  require("./app")
  + 然后使用 nodemon 执行 main.js  


##  在 node 中使用xTemplate 模板引擎
  [xtpl] https://github.com/xtemplate/xtpl
 1.安装xTemplate `npm install --save-dev xTemplate `
1.安装xtpl `npm install --save-dev xtpl `


## 模型抽象

从模型类到数据表的抽象

一个构造函数（类）：拥有对数据表的增删改查方法

## 功能开发