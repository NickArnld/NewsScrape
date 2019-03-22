

$.getJSON("/scrape", function(data){
    // console.log("data",data);

    for(z in data){
        var dbID = data[z]._id;
        var title = data[z].title;
        var link = data[z].link;

        var newDiv = $('<div>').addClass('newsPost');
        var newL = $('<a>').attr("href", link).addClass('headLine'); 
        var newT = $('<h6>').text(title);
        newL.append(newT);
        newDiv.append(newL);
        newDiv.append("<hr>");
        var noteButton = $("<button>").addClass("btn btn-warning noteB").text("Notes")
        noteButton.attr("dbID", dbID);
        newDiv.append(noteButton)       

        $("#newsFeed").prepend(newDiv);
    }

    $('.noteB').on("click", function(event){
        var dbID = $(this).attr("dbID")
        
        // $.ajax({
        //     method: "GET",
        //     url: "/notes/" + dbID
        // }).then(function(data){
        //     //post notes
        // })
    })
})
