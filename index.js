const express=require("express")
const mongoose=require("mongoose")

const {newpdt, allpdt, products, removepdt, editpdt} = require("./controllers/products")

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
app.post("/newproduct",newpdt)

app.get("/allproducts",allpdt)

app.get("/products/:id",products)

app.post("/removeproduct/:id",removepdt)

app.post("/editproduct/:id",editpdt)

//connection
app.listen(4000,()=>console.log("Port 4000"))