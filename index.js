let express=require("express");
let cors=require("cors");
let bodyparser=require("body-parser");
let app=express();
let fileupload=require("express-fileupload")
let mailer=require("./mailer")
app.use(cors({"origin":"http://localhost:5173",
    credentials:true
}))
app.use(fileupload())

app.use(bodyparser.urlencoded({extended:true}))
app.use(express.static("public/"))
app.post("/register",async(req,res)=>{
   if(req.body.mobile=='8010324119'){
mailer(req.body.email,"https://www.youtube.com",req.body.fullName)
   }
   else{
mailer(req.body.email,"https://www.youtube.com",req.body.fullName)

   }
   
    
res.status(200).json({success:true})
})
app.get("/next-step",async(req,res)=>{
    res.render("muddu.ejs");
})
app.get("/next-portal",async(req,res)=>{
    res.render("sanju.ejs")
})


app.listen(1000)
