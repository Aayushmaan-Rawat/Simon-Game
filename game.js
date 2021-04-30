var buttonColours=["red","blue","green","yellow"];  //array to hold the colours
var gamePattern=[];//empty array
var userClickedPattern=[];

var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


function nextSequence()
{
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
  var x=Math.random();   //generates random numbers from 0 to 0.999...
  x=x*4;                 //generates no's from  0 to 3.999...
  var randomNumber=Math.floor(x);       //generates whole no's 0,1,2 and 3 only
  var randomChosenColour=buttonColours[randomNumber]; //to select a random colour from the buttonColours array

     gamePattern.push(randomChosenColour); //to add the new randomChosenColour generated to the end of the gamePattern array
     
     $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);  //jQuery code jQuery to animate a flash to the button
     playSound(randomChosenColour); //to play audio on pressing doing refresh...i.e- randomly a button is chosen
}



$(".btn").click(function()                           
{
   var userChosenColour= $(this).attr("id");    // to get the particular colour corresponding to the user click 
   userClickedPattern.push(userChosenColour);  // Add the contents of the variable userChosenColour to the end of this new userClickedPattern array
   
     playSound(userChosenColour); // call playSound function
     animatePress(userChosenColour);  //call animatePress function
     checkAnswer(userClickedPattern.length-1);  //passing the current updated length of the userClickedPattern array to check the answer
});


function playSound(name)   // seperate function to play audio
{ 
    var audio = new Audio( name+ ".mp3"); // JS code to play the sound for the random button colour selected
    audio.play();
}


function animatePress(currentColour)    // function to perform animation on the button corresponing to user click on a particular colour button
{
  $("#"+currentColour).addClass("pressed");
  setTimeout(function() {
  $("#"+currentColour).removeClass("pressed");
},100);
}

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel])  
     {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } 
    else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}
function startOver()
{
  level=0;
  gamePattern=[];
  started=false;
}
  