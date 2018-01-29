var channelArray = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp","noobs2ninjas", "froztey", "forcegaming"];

//Functions to run once the page is ready.
$(document).ready(function(){
  
 //Online button function
 $("#btnOnline").on("click",onlineFunction);
  
 //Offline button function
 $("#btnOffline").on("click",offlineFunction);
  
 //All button function
 $("#btnAll").on("click",allFunction); 
  
 //All button function
 $("#btnRefresh").on("click",refreshFunction); 
  
 //Function to get channel data and project them. 
 getData(); 
  
});

//Defining Variables.
var isolatedArray;
var content;
var status;
var channelName;
var channelLink;
var channelLogo;


//Function to obtain streaming data from the twitch API
function getData(){

  var x = 0;
  while(x < 7){  

    //Creation of API url.   
    var dataLink = "https://wind-bow.glitch.me/twitch-api/streams/"+ channelArray[x];

    //Obtaining data usinh getJSON.  
    $.getJSON(dataLink,function(result){

      isolatedArray = result.stream;

      //Checking the status (Online/Offline)
      if (isolatedArray == null){
        channelName = (result._links.self).slice(37);
        channelLink = "https://www.twitch.tv/" +channelName;

        var channelBlock = "<a id ='" + x + "' target='_blank' href = '" + channelLink +"'><div id = 'block-offline' class='well removeOffline'><img class ='imgX' src ='https://previews.123rf.com/images/aquir/aquir1704/aquir170406821/76420754-offline-round-grunge-black-stamp-Stock-Vector.jpg'><b>" + channelName + "</b> Offline </div>";

      $(".of").append(channelBlock);
      $("p").text(JSON.stringify(channelName));

      }else{


      content = "<span id ='spanX'>" +result.stream.game + "</span>";
      channelLogo = result.stream.channel.logo;
      channelName = result.stream.channel.display_name;
      channelLink = result.stream.channel.url; 

      var channelBlock = "<a id ='" + x + "' target='_blank' href = '" + channelLink + "'><div id = 'block' class='well removeOnline'><img class ='imgX' src ='" + channelLogo + "'><b>" + channelName + "</b>" + content + "</div>";

      $(".on").append(channelBlock);

      }

    });

      x += 1;

  };
};


//Function Online button click event handling.
function onlineFunction(){
  
  $(".of").animate({opacity: 0},500,function(){
  $(".of").css("opacity", "0");
  $(".on").css("opacity", "1");
  $(".of").css("height", "0");
  $(".on").css("height", "100%");
  });
    
};

//Function Online button click event handling.
function offlineFunction(){
  
 
  $(".on").animate({opacity: 0},500,function(){
  $(".of").css("opacity", "1");
  $(".on").css("opacity", "0");
  $(".on").css("height", "0");
  $(".of").css("height", "100%");
  });
    
};

//Function All button click event handling.
function allFunction(){
  
  $("#channelSection").animate({opacity: 0},500,function(){
                    
  $(".of").css("opacity", "1");
  $(".on").css("opacity", "1");
  $("#channelSection").css("opacity", "1");
  $(".on").css("height", "100%");
  $(".of").css("height", "100%");
    
  });  
};

//Function Refresh button click event handling.
function refreshFunction(){
  
  $("#channelSection").animate({opacity: 0},500,function(){
  $(".on div").remove();
  $(".of div").remove();
  getData();  
  $(".of").css("opacity", "1");
  $(".on").css("opacity", "1");
  $("#channelSection").css("opacity", "1");
  $(".on").css("height", "100%");
  $(".of").css("height", "100%");
    
  });  
};