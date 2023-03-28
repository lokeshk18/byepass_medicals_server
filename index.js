const express=require("express")
const mongoose=require("mongoose")
require("dotenv").config()

const {newpdt, allpdt, products, removepdt, editpdt} = require("./controllers/products")
const { register , login} = require("./controllers/auth")
const {verifyAdmin , verifyToken} = require("./controllers/verify")
const { editUser } = require("./controllers/user")

//db connection
const dburl="mongodb://localhost:27017/byepass"
mongoose.connect(dburl)
const db=mongoose.connection
db.on("error",()=>console.log("Connection failed"))
db.once("open",()=>console.log("Database connected"))

//express
const app=express()
app.use(express.json()) //parses incoming req obj as json obj
app.use(express.urlencoded({extended:true})) //for using nested obj if false means only string or arrays

//routes
app.post("/newproduct",verifyAdmin,newpdt)

app.get("/allproducts",allpdt)

app.get("/products/:id",products)

app.post("/removeproduct/:id",verifyAdmin,removepdt)

app.put("/editproduct/:id",verifyAdmin,editpdt)

app.post("/register",register)

app.post("/login",login)

app.put("/edituser/:id",editUser)

//connection
app.listen(4000,()=>console.log("Port 4000"))