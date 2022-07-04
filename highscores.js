const highscoresList = document.getElementById("highScoreList");
const highScores = JSON.parse(localStorage.getiem("highScores")) || [];

highscoresList.innerHTML = highScores
.map( score => {
    return (`<li class="high-score">${score.name} - $score.score}</li>`);
})
.join("");
