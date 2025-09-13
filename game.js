var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClcikedPattern = [];

var level = 0;
var gameStarted = false;

function nextSequence(){
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChoosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChoosenColour);
    $("#" + randomChoosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColour);
    level++;
    $("#level-title").text("Level " + level);
}

$(".btn").on("click", function(){
    var userChoosenColour = $(this).attr("id");
    userClcikedPattern.push(userChoosenColour);
    // console.log(userClcikedPattern);
    playSound(userChoosenColour);
    animatePress(userChoosenColour);
    checkAnswer(userClcikedPattern.length - 1);
}); 

function playSound(name){
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

$(document).on("keydown", function(){
    if(!gameStarted){
        $("#level-title").text("Level " + level);
        nextSequence(); 
        gameStarted = true;
    }
});

function checkAnswer(currentLevel){
    if(userClcikedPattern[currentLevel] === gamePattern[currentLevel]){
        // console.log("success");
        if(userClcikedPattern.length === gamePattern.length){
            setTimeout(function (){
                nextSequence();
                userClcikedPattern = [];
            }, 1000);
        }
    }
    else {
        // console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    gameStarted = false;
}