const path=require("path")
const express=require("express")
const hbs=require("hbs")
const geocode=require("./utils/geocode")
const forecast=require("./utils/forecast")


const app=express()

//define paths for express config
const publicDirectoryPath=path.join(__dirname,"../public")
const viewspPath=path.join(__dirname,"../templates/views")
const partialsPath=path.join(__dirname,"../templates/partials")

//set up handlebars engine and view engines
app.set("view engine","hbs")
app.set("views",viewspPath)
hbs.registerPartials(partialsPath)

//set up static directory
app.use(express.static(publicDirectoryPath))

app.get("",(req,res)=>{
    res.render("index",{
        title:"Weather",
        name:"Soumya Ranjan Pati"
    })
})

app.get("/about",(req,res)=>{
    res.render("about",{
        title:"About Me",
        name:"Soumya Ranjan Pati"

    })
})
app.get("/help",(req,res)=>{
    res.render("help",{
        helpfultxt:"some helpful text..",
        title:"Help",
        name:"Soumya Ranjan Pati"
    })
})

app.get("/weather",(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"You must provide an address."
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }

        forecast(latitude,longitude, (error, forecastData) =>{
            if(error){
                return res.send({error}) 
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })


    })
    
    // res.send({
    //     forecast:"It is snowing",
    //     location:"New York",
    //     address:req.query.address
    // })
})



app.get("/products",(req,res)=>{
    if(!req.query.search){
       return res.send({
            error:"YOu must provide a search term."
        })

    }
    
    console.log(req.query.search);
    res.send({
        products:[]
    })

})


app.get("/help/*",(req,res)=>{
    res.render("404",{
        title:"404",
        name:"Soumya",
        errorMessage:"Help article Not Found."
    })
})
app.get("*",(req,res)=>{
    res.render("404",{
        title:"404",
        name:"Soumya",
        errorMessage:"Page Not Found."
    })
})

//app.com
//app.com/help
//app.com/about
app.listen(3000,()=>{
    console.log("Server is up on port 3000.");
})



