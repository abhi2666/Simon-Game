// ORIGINAL
// the randomChosenColor will be stored here\
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = -1;
var started = false; // tells if the game is started or not
//user array
var userClickedPattern = [];

// Code to start the game
// below is a handler function(anonymous function) which will execute
// whenever you press a key.. but one you started the game then then
// below function will not do anything..
document.addEventListener("keypress", function(){
  if(!started)
  {
    nextSequence();
    started = true;
  }

});

/// below is the handler function which will execute..
//  whenever user presses a button.
$(".btn").click(function(){
  // no need to provide name here.. this is anonyumous function
  var userChosenColour =  $(this).attr("id"); // to store the button id that was pressed
  userClickedPattern.push(userChosenColour); // user colour into user array
  playSound(userChosenColour); // to play the respective button sound
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});


function checkAnswer(currentLevel)
{
    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else
    {
      // we have to add sound effect and then change the body of the html
      playSound("wrong"); // to play the wrong.mp3
      $("h1").text("You Lose ! Bitch !! Press Any Key to Restart");
      $("body").addClass("game-over");
      setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    startOver(); // to restart the game
    }
}

// function to generate random number from 0 to 3
function nextSequence()
{

  level =  level + 1;
  userClickedPattern = [];
  // change the h1 heading to the current level
  $("h1").text("level "+level);
  // to generate random no. from 0 to 3
  var randNum = Math.floor(Math.random()*4);
  // now we will choose a random color from buttonColors
  var randomChosenColor =  buttonColors[randNum];
  // randomChosenColor is to be added at the end of gamePattern
  gamePattern.push(randomChosenColor);
  // selecting button with same id as that of randomChosenColor
  // and animating it with a flash
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  // also providing the sound in sync with the animation
  playSound(randomChosenColor);

}

// to play sounds
function playSound(name)
{
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

// to animate the button with 'pressed' class inside styles.css
function  animatePress(currentColour)
{
    $("#"+currentColour).addClass("pressed");
    setTimeout(function() {
    $("#"+currentColour).removeClass("pressed");
  }, 100);
}

function startOver()
{

    level = -1;
    gamePattern = [];
    started = false;
    
}
