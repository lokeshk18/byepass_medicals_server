const express=require("express")
const mongoose=require("mongoose")

const {newproduct, allproducts} = require("./controllers/products")

const dburl="mongodb://localhost:27017/byepass"
mongoose.connect(dburl)
const db=mongoose.connection
db.on("error",()=>console.log("Connection failed"))
db.once("open",()=>console.log("Database connected"))


const app=express()
app.use(express.json()) //parses incoming req obj as json obj
app.use(express.urlencoded({extended:true})) //for using nested obj if false means only string or arrays

app.post("/newproduct",newproduct)

app.get("/allproducts",allproducts)

app.listen(4000,()=>console.log("Port 4000"))