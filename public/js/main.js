$.ajax({
  url: "img/upload/",
  success: function(data){
     $(data).find("li a:contains(.JPG)").each(function(){
        // will loop through 
        var images = $(this).attr("href");
        var rawdate = $(data).find('a > .date').html();
        
        $('<img src='+ images + '></img>').html(images).appendTo('.images-container');
       // console.log(images);  
      //  console.log(rawdate); 
     });
  }
});
