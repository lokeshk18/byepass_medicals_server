const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
require("dotenv").config()

const {newpdt, allpdt, products, removepdt, editpdt, viewproduct} = require("./controllers/products")
const { register , login} = require("./controllers/auth")
const {verifyAdmin , verifyToken} = require("./controllers/verify")
const { editUser, getUser } = require("./controllers/user")
const { addCart, getCart, removeCart, getOrderCart } = require("./controllers/cart")
const { addOrder, getOrder, changeStatus, allOrders } = require("./controllers/order")
const { processPayment } = require("./controllers/stripe")

//db connection
// const dburl="mongodb://localhost:27017/byepass"
const dburl = process.env.DB_PASS
mongoose.connect(dburl)
const db=mongoose.connection
db.on("error",()=>console.log("Connection failed"))
db.once("open",()=>console.log("Database connected"))

//express
const app=express()
app.use(express.json()) //parses incoming req obj as json obj
app.use(express.urlencoded({extended:true})) //for using nested obj if false means only string or arrays

//cors
app.use(cors({
    origin: "*",
    credentials:true
}))


//routes
app.post("/newproduct",newpdt)

app.get("/allproducts",allpdt)

app.get("/products/:id",products)

app.get("/products/:category/:id",viewproduct)

app.put("/editproduct/:id",editpdt)

app.post("/removeproduct/:id",removepdt)

app.post("/register",register)

app.post("/login",login)

app.put("/edituser/:id",verifyToken,editUser)

app.get("/getusers",getUser)

app.post("/addcart",addCart)

app.get("/getcart/:id",getCart)

app.post("/removecart/:id",removeCart)

app.get("/getordercart/:id",getOrderCart)

app.get("/allorders",allOrders)

app.post("/addorder",addOrder)

app.get("/orders/:id",getOrder)

app.put("/status/:id",changeStatus)

app.post("/payment",processPayment)

//connection
app.listen(4000,()=>console.log("Port 4000"))