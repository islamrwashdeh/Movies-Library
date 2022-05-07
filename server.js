const { response } = require("express");
const express= require("express");
const movies =require("./data.json");
const app =express();


const axios =require("axios");

// read dotenv file
const dotenv =require("dotenv");

//start (configer) the dotenv
dotenv.config();
//process.env >> built in fucn
const APIKEY =process.env.APIKEY;


function Movie(title, overview, poster_path,id,release_date){
    this.title=title;
    this.overview=overview;
    this.poster_path=poster_path;
    this.id=id;
    this.release_date=release_date;
}

app.get("/",helloMovie);
app.get("/favorit",hellofavorit);
app.get("/trending",helloTrending);
app.get("/search",hellosearch);
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
    // arr.push(movies.title);
    // arr.push(movies.overview);
    // arr.push(movies.poster_path);
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

function helloTrending(req,res){
    let result = [];
    
    axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${APIKEY}&language=en-US`)
   .then(apiResponse =>{
       apiResponse.data.results.map(value =>{ 
           let oneMoveDetails =new Movie(value.id,value.title,value.release_date,value.overview,value.poster_path)
           result.push(oneMoveDetails);
       })
       return res.status(200).json(result);
  }).catch(error =>{
      errorHandler("Sorry, something went wrong",req,res);
  })
}

function hellosearch(req,res){
   const search ="The Royal Treatment,";
    let Sresult = [];
    
    axios.get(` https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&language=en-US&query=${search}`)
   .then(apiResponse =>{
       apiResponse.data.results.map(value =>{ 
           let oneMoveSearch =new Movie(value.title || "A/N" ,value.overview || "A/N" ,value.release_date || "A/N" ,value.id || "A/N" ,value.release_date || "A/N")
           Sresult.push(oneMoveSearch);
       })
       return res.status(200).json(Sresult);
  }).catch(error =>{
      errorHandler("Sorry, something went wrong",req,res);
  })

  
}

function notFoundHandler(req,res){
    return res.send("Page Not Found")
}
   
app.listen(3000,()=>{
    console.log("listen to 3000")
});