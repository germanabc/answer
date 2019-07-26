import * as db from './db'
// const db= require('./db')
// export default 
export default class User {
  constructor (username, password, email, avator='avator.png',gender=1) {
      this.username=username
      this.password=password
      this.email=email
      this.avator=avator
      this.gender=gender
  }
  // 保存到数据库
  save(){
    // new Promise 进入pedding 待定状态
    return new Promise((resolve, reject)=>{
      
      db.query('insert into `users`(`username`,`password`,`email`,`avatar`,`gender`) values(?,?,?,?,?)',[ 
        this.username, 
        this.password, 
        this.email, 
        this.avator, 
        this.gender
      ]).then(rows =>{
        // console.log(rows)
        // 调用resolve 进入fulfilled 已解决状态
        resolve(rows)
        // callback(null,rows)
      }).catch(err=>{
        // 调用reject 进入rejected 已拒绝状态
        reject(err)
        // callback(err)
      })
    })
    
  }
  //静态方法，这个方法是经常要用的，所以写成静态方法
  static getByUsername(username){
    return new Promise((resolve, reject)=>{
      db.query('select * from `users` where `username`=?', [username])
      .then(rows=>{
        resolve(rows)
      })
      .catch(err=>{
         throw err 
      })
    })
  }

  //静态方法，这个方法是经常要用的，所以写成静态方法
  //查询数据
  static getData(username){
    return new Promise((resolve, reject)=>{
      db.query('select * from `users` where `username`=?', [username])
      .then(rows=>{
        resolve(rows)
      })
      .catch(err=>{
         throw err 
      })
    })
  }


}

// var u= new User('admin','123456','123456@123.com')
// u.save(function(err,rows){
//   if(err){
//     throw err
//     return
//   }
//   console.log(rows)
// })

//用户注册
//先查一下用户名是否存在
//
User.getByUsername('ddd')
.then(user=>{
  //如果查到 user 就是一个数组
  //查不到就是一个空数组
  console.log(user)
  // console.log(typeof user)
  if(user.length!==0){
    console.log('用户名已存在');     
  }else{
    var user= new User('ddd','123456','sdgghshgd@shd.com')
    return user.save()
  }
})
.then(id=>{
  console.log('用户插入成功， id是：'+id);     
})
.catch(err=>{
  console.log(err)
})
module.exports=User