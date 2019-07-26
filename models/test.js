const User=require('./user')
var  u= new User('xzhjzh','123456','32432432@123.com')

u.save()
.then(id=>{
    if(id!==0){
        console.log("保存成功")
    }else{
        console.log("保存失败")
    }
}).catch( err =>{
    console.log("操作数据库失败")
})
