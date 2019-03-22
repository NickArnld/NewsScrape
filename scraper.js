var axios = require("axios");
var cheerio = require("cheerio");

var url = "https://old.reddit.com/r/worldnews/top/"

axios.get(url).then(function(response){
    const $ = cheerio.load(response.data);
    var links = $("a.title");

    var results = []

    for(let x=0;x<5;x++){
        let cur = links[x];
        let tt = cur.children[0].data.trim();
        
        let newObj = {
            title: tt,
            link: cur.attribs.href
        }
        results.push(newObj);
    }
    console.log(results)
})
.catch(function(err){
    console.log(err)
})