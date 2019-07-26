import User from '../models/user'
export function showLogin(req, res){
    res.render('login',{
        title: "用户登录"
    })
}

export function showRegister(req, res){
    res.render('register',{
        title: "注册"
    })
}

export function doLogin(req, res){
    console.log('收到登录的请求了')
}

export function doRegister(req, res){
    //    console.log('收到注册的请求了')
    let username= req.body.username
    let password= req.body.password
    let email= req.body.email
    console.log(username,password,email)
    //判断用户名是否被占用
    //如果已存在，提示用户
    //如果不存在，保存数据库
    User.getByUsername(username)
    .then(rows=>{
        console.log(rows)
    if(rows.length!==0){
        return res.json({
            code:1001,
            msg:'username already exists'
        })
    }else{
            let user=new User(username,password,email)
            return  user.save()  //返回一个promise对象
    }

    
    }).then(rows=>{
        //插入数据失败
        if(rows.affectedRows ===0){
            return res.json({
                code:1002,
                msg:"failed"
            })
            
            
        }
        //插入数据成功
        return res.json({
            code:1000,
            msg:"success"
        })
    })
    .catch(err=>{
        //插入数据异常
        return res.json({
            code: 1003,
            msg: err.message
        })
    })

}


export function showTable(req, res){
    res.render('table',{
        title: "测试table"
    })
}

export function doTable(req, res){
    let username= req.body.username;
    User.getData(username)
    .then(rows=>{
        console.log(rows)
       if(rows.length!==0){
           return res.json({
               code:1001,
               data:rows
           })
       }else{
            return res.json({
                code:1002,
                msg:"无数据"
            })
       }
    })
    .catch(err=>{
        //插入数据异常
        return res.json({
            code: 1003,
             msg: err.message
        })
    })
    
}



