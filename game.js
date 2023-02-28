var gamePattern = [];
var userPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var started = false;
var level = 0;
var val = 0;
$(document).keydown(function () {
    if (!started) {
        started = true;
        $("#level-title").text("Level " + level);
        nextSequence();
        val++;
    }
});

$(".btn").click(function () {
    if (val !== 0) {
        var buttonChoosen = $(this).attr("id");
        userPattern.push(buttonChoosen);
        makeTheSound(buttonChoosen);
        animatePress(buttonChoosen);
        validSequenceCheck(userPattern.length - 1);
    }
});

function animatePress(buttonChoosen) {
    $("#" + buttonChoosen).addClass("pressed");
    setTimeout(function () {
        $("#" + buttonChoosen).removeClass("pressed");
    }, 100);
}

function nextSequence() {
    userPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    randomNumber = Math.floor(Math.random() * 4);
    var colorPressed = buttonColours[randomNumber];
    gamePattern.push(colorPressed);
    $("#" + colorPressed).fadeIn(100).fadeOut(100).fadeIn(100);
    makeTheSound(colorPressed);
}

function makeTheSound(colorPressed) {
    var sound = new Audio("sounds/" + colorPressed + ".mp3");
    sound.play();
}

function validSequenceCheck(currentVal) {
    if (userPattern[currentVal] === gamePattern[currentVal]) {
        if (currentVal + 1 === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        makeTheSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

function startOver() {
    gamePattern = [];
    level = 0;
    started = false;
    val = 0;
}