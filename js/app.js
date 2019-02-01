//rock click
// -> display rock image
// -> player weapon variable

//go click
// -> start countdown
// -> lock all buttons
// end count
// --> generate ai choice
// --> display ai image
// --> determine winner
// --> highlight winner

// declare dom variables
var playerImage;
var playerImageBox;
var aiImage;
var aiImageBox;
var weaponBtns;
var count;
var goBtn;

var playerScore = 0;
var aiScore = 0;
var playerScoreEl;
var playerHiScoreEl;
var aiScoreEl;
var aiHiScoreEl;

var handle = null;
var seconds = 3;

var playerWeapon;
var aiWeapon;

// image links
var rockImg =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Rock-paper-scissors_%28rock%29.png/1920px-Rock-paper-scissors_%28rock%29.png";
var paperImg =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Rock-paper-scissors_%28paper%29.png/1920px-Rock-paper-scissors_%28paper%29.png";
var scissorsImg =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Rock-paper-scissors_%28scissors%29.png/1920px-Rock-paper-scissors_%28scissors%29.png";
var lizardImg =
  "http://r.ddmcdn.com/s_f/o_1/APL/uploads/2014/10/lizardfrilled-lizard0.jpg";
var spockImg = "https://pbs.twimg.com/media/DKWeNb1WkAAFm7C.jpg";

function chooseAiWeapon() {
  var choices = ["rock", "paper", "scissors", "lizard", "spock"];
  var rand = Math.floor(Math.random() * 5);
  return choices[rand];
}

function placeAiImage(choice) {
  switch (choice) {
    case "rock":
      aiImage.src = rockImg;
      break;
    case "paper":
      aiImage.src = paperImg;
      break;
    case "scissors":
      aiImage.src = scissorsImg;
      break;
    case "lizard":
      aiImage.src = lizardImg;
      break;
    case "spock":
      aiImage.src = spockImg;
      break;
  }
  aiWeapon = choice;
}

function reset() {
  aiImage.removeAttribute("src");
  playerImage.removeAttribute("src");
  aiWeapon = "";
  playerWeapon = "";
  seconds = 3;
  aiImageBox.style.borderColor = "black";
  playerImageBox.style.borderColor = "black";
}

function endRound() {
  if (
    (aiWeapon === "rock" && playerWeapon === "scissors") ||
    (aiWeapon === "rock" && playerWeapon === "lizard") ||
    (aiWeapon === "paper" && playerWeapon === "spock") ||
    (aiWeapon === "paper" && playerWeapon === "rock") ||
    (aiWeapon === "scissors" && playerWeapon === "lizard") ||
    (aiWeapon === "scissors" && playerWeapon === "paper") ||
    (aiWeapon === "spock" && playerWeapon === "rock") ||
    (aiWeapon === "spock" && playerWeapon === "scissors") ||
    (aiWeapon === "lizard" && playerWeapon === "paper") ||
    (aiWeapon === "lizard" && playerWeapon === "spock")
  ) {
    aiImageBox.style.borderColor = "green";
    aiScore++;
    aiScoreEl.textContent = aiScore;
    if (aiScore > localStorage.getItem("aiHiScore")) {
      localStorage.setItem("aiHiScore", aiScore);
    }
    aiHiScoreEl.textContent = localStorage.getItem("aiHiScore");
  } else if (
    (playerWeapon === "rock" && aiWeapon === "rock") ||
    (playerWeapon === "paper" && aiWeapon === "paper") ||
    (playerWeapon === "scissors" && aiWeapon === "scissors") ||
    (playerWeapon === "spock" && aiWeapon === "spock") ||
    (playerWeapon === "lizard" && aiWeapon === "lizard")
  ) {
    playerImageBox.style.borderColor = "goldenrod";
    aiImageBox.style.borderColor = "goldenrod";
  } else {
    playerImageBox.style.borderColor = "green";
    playerScore++;
    playerScoreEl.textContent = playerScore;
    if (playerScore > localStorage.getItem("playerHiScore")) {
      localStorage.setItem("playerHiScore", playerScore);
    }
    playerHiScoreEl.textContent = localStorage.getItem(
      "playerHiScore"
    );
  }
}

document.addEventListener("DOMContentLoaded", function() {
  playerImage = document.getElementById("playerImage");
  playerImageBox = document.getElementById("playerimagebox");
  aiImage = document.getElementById("aiImage");
  aiImageBox = document.getElementById("aiimagebox");
  weaponBtns = document.getElementsByClassName("weaponBtn");
  count = document.getElementById("count");
  goBtn = document.getElementById("go");

  aiScoreEl = document.getElementById("aiScore");
  aiHiScoreEl = document.getElementById("aiHiScore");
  playerScoreEl = document.getElementById("playerScore");
  playerHiScoreEl = document.getElementById("playerHiScore");

  if (
    !localStorage.getItem("playerHiScore") &&
    !localStorage.getItem("aiHiScore")
  ) {
    localStorage.setItem("playerHiScore", 0);
    localStorage.setItem("aiHiScore", 0);
  } else {
    aiHiScoreEl.textContent = localStorage.getItem("aiHiScore");
    playerHiScoreEl.textContent = localStorage.getItem(
      "playerHiScore"
    );
  }

  for (let i = 0; i < weaponBtns.length; i++) {
    weaponBtns[i].addEventListener("click", function(e) {
      switch (e.target.id) {
        case "rock":
          playerImage.src = rockImg;
          break;
        case "paper":
          playerImage.src = paperImg;
          break;
        case "scissors":
          playerImage.src = scissorsImg;
          break;
        case "lizard":
          playerImage.src = lizardImg;
          break;
        case "spock":
          playerImage.src = spockImg;
          break;
      }
      playerWeapon = e.target.id;
    });
  }

  goBtn.addEventListener("click", function() {
    handle = setInterval(function() {
      if (seconds > 0) {
        count.textContent = seconds;
        seconds--;
      } else {
        count.textContent = "BAM!";
        clearInterval(handle);
        placeAiImage(chooseAiWeapon());
        endRound();
        setTimeout(reset, 2000);
      }
    }, 1000);
  });
});
