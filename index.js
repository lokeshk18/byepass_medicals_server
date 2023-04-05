const express=require("express")
const mongoose=require("mongoose")
require("dotenv").config()

const {newpdt, allpdt, products, removepdt, editpdt, viewproduct} = require("./controllers/products")
const { register , login} = require("./controllers/auth")
const {verifyAdmin , verifyToken} = require("./controllers/verify")
const { editUser, getUser } = require("./controllers/user")
const { addCart, getCart } = require("./controllers/cart")
const { addOrder, getOrder, changeStatus } = require("./controllers/order")

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

app.get("/products/:category/:id",viewproduct)

app.put("/editproduct/:id",verifyAdmin,editpdt)

app.delete("/removeproduct/:id",verifyAdmin,removepdt)

app.post("/register",register)

app.post("/login",login)

app.put("/edituser/:id",verifyToken,editUser)

app.get("/getusers",verifyAdmin,getUser)

app.post("/addcart",addCart)

app.get("/getcart",getCart)

app.post("/addorder",addOrder)

app.get("/orders",getOrder)

app.put("/status/:id",changeStatus)


//connection
app.listen(4000,()=>console.log("Port 4000"))