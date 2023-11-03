
var btncolors = ["red", "blue", "green", "yellow"];
var gamepattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("level " + level);
        nextsequence();
        started = true;
    }
});

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playsound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});
function checkAnswer(currentLevel) {
    if (gamepattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamepattern.length) {
            setTimeout(function () {
                nextsequence();
            }, 1000);
        }

    } else {
        playsound("wrong");
        $("body").addclass("game-over");
        $("#level-title").text("Game Over , Press any key to Restart");

        setTimeout(function () {
            $("body").removeclass("game-over");
        }, 200);

        startOver();

    }
}
function nextsequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("level " + level);
    var randomnum = Math.floor(Math.random() * 4);
    var randomchoosencolor = btncolors[randomnum];
    gamepattern.push(randomchoosencolor);
    $("#" + randomchoosencolor).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomchoosencolor);

}

function animatePress(currentColor) {
    $("#" + currentColor).addclass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeclass("pressed");
    }, 100);
}

function playsound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
