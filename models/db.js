import mysql from 'mysql'
import config from '../config'
// const mysql= require('mysql')


const  pool=mysql.createPool({
    host:'localhost',
    port:'3306',
    user:'root',
    password:'root',
    database:config.database
    // database:'answer'
})


 function query(sql, params=[]){
  return new Promise((resolve, reject)=>{
      pool.getConnection((err, connection)=>{
          if(err){
              //变为reject 状态, 执行catch里面的函数
              return reject(err)
          }
          connection.query(sql,params, (err, rows)=>{
            if(err){
              //变为reject 状态, 执行catch里面的函数
              return reject(err)
            }
            connection.release()
            //变为resolve状态, 执行then里面的函数
            resolve(rows) 
          })
      })
  })
}
export {query}
// exports.query=query



// Promise 对象一经创建就会立即执行
//当前： 只是创建了一个容器，该容器里面有一个任务，Promise 会自动执行
//如何接受执行的结果呢？
// let readFile=new Promise((resolve, reject) =>{
//   fs.readFile('./demo/as.txt', (err, data)=>{
//       if(err){
//           return reject(err)
//       }
//       resolve(data)
//   })
// })

// promise.then(function(value) {
//     // success
//   }, function(error) {
//     // failure
//   });

// readFile
// .then(data =>{
//     console.log(data.toString())
// })
// .catch(err =>{
//     console.log('出错了')
// })

// function readFile(filePath){
//   return new Promise((resolve, reject)=>{
//     fs.readFile(filePath, (err, data)=>{
//         if(err){
//             return reject(err)
//         }
//         resolve(data)
//     })
//   })
// }

// 异步流程控制
// readFile('./demo/a.txt')
// .then(data =>{
//     console.log(data.toString())
//     // 该返回值会直接交给下一个then方法，然后将数据传递给它
//     // return data.toString()
//     //then 还可以 返回另一个 Promise 对象
//     //当该Promise 里面的任务完成的时候，会执行下一个then, 然后将数据传递给下一个 then中的回调函数
//     return readFile('./demo/b.txt')
// })
// .then(data =>{
//     console.log(data.toString())
//     return readFile('./demo/c.txt')
// })
// .then(data=>{
//     console.log(data.toString())
// })
// .catch(err =>{
//     console.log(err)
// })

