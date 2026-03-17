const express = require("express")
const fs = require("fs")

const app = express()

app.use(express.static(__dirname))
app.use(express.urlencoded({extended:true}))

// تسجيل مستخدم جديد
app.post("/register",(req,res)=>{

    let users = JSON.parse(fs.readFileSync("users.json"))

    // إضافة معلومات العمر والمستوى
    let newUser = {
        email: req.body.email,
        password: req.body.password,
        age: req.body.age,
        level: req.body.level
    }

    users.push(newUser)

    fs.writeFileSync("users.json",JSON.stringify(users))

    res.send("Account Created Successfully!")
})

// تسجيل دخول
app.post("/login",(req,res)=>{

    let users = JSON.parse(fs.readFileSync("users.json"))

    let user = users.find(u=>u.email===req.body.email && u.password===req.body.password)

    if(user){
        res.send(`Login Success! Welcome, ${user.email}. Age: ${user.age}, Level: ${user.level}`)
    } else {
        res.send("Wrong Email Or Password")
    }

})

app.listen(3000,()=>{
    console.log("Server Running on http://localhost:3000")
})