var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("./models");


var PORT = 3000;
var app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.get('/scrape', function(req, res){

    //scraping
    var url = "https://old.reddit.com/r/worldnews/top/"
    axios.get(url).then(function(response){
        const $ = cheerio.load(response.data);
        var links = $("a.title");

        for(let x=0;x<6;x++){
            let cur = links[x];
            let tt = cur.children[0].data.trim();
            
            let newHL = {}

            newHL.title = tt;
            newHL.link = cur.attribs.href

            db.Headline.find({title: tt}, function(err, docs){
                if(err) throw err;

                if(docs.length > 0){
                    // console.log("Here!!!");
                    return               
                }else{
                    // console.log("not here", tt)
                    db.Headline.create(newHL)
                        .then(function(dbHL) {
                            console.log(dbHL);
                        })
                        .catch(function(err) {
                            console.log(err);
                        });
                }
            })            
        }    
    })
    .catch(function(err){
        console.log(err)
    })
    // res.send("Scrape Complete");

    //display headlines
    db.Headline.find({}) 
        .then( articles => res.send(articles))
});

// app.get('/notes/:id', function(req, res){
//     db.Headline.find({_id: req.params.id})
//         .then(HL => console.log(HL)) 
// })


app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});