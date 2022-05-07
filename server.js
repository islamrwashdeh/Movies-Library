const { response } = require("express");
const express= require("express");
const movies =require("./data.json");
const app =express();

function Movie(title, overview, poster_path){
    this.title=title;
    this.overview=overview;
    this.poster_path=poster_path;
}

app.get("/",helloMovie);
app.get("/favorit",hellofavorit);
app.get("*",notFoundHandler);

app.use(errorHandler);
function errorHandler(error,req,res){
    const err ={
        status : 500,
        messge : error
    }
    return res.status(500).send(err);
}

function helloMovie(req ,res){
    let arr=[]
    movies.data.forEach((value) => {
        let theMovie = new Movie(value.title, value.overview, value.poster_path);
        arr.push(theMovie);
        return res.status(200).json(arr);
    }).catch(error =>{
        errorHandler("Sorry, something went wrong",req,res);
    })  
}

function hellofavorit(req,res){
 return res.send("Welcome to Favorite Page")
 .catch(error =>{
    errorHandler("Sorry, something went wrong",req,res);
})
}

function notFoundHandler(req,res){
    return res.send("Page Not Found")
}
   
app.listen(3000,()=>{
    console.log("listen to 3000")
});