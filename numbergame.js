//랜덤번호 지정해준다
//유저가 번호를 입력한다 그리고 go 라는 버튼을 누름
//만약 유저가 랜덤 번호를 맞히면, 맞혔습니다!
// 랜덤번호가 < 유저번호 Down!!!
// 랜덤번호가 > 유저번호 Up!!!
//Reset 버튼을 누르면 게임이 리셋된다.
//5번의 기회를 다 쓰면 게임이 끝난다.(더이상 추측 불가, 버튼이 disable)
//유저가 1~100 범위 밖의 숫자를 입력하면 알려준다. 기회를 깎지 않는다.
//유저가 이미 입력한 숫자를 또 입력하면 알려준다. 기회를 깎지 않는다.
let randomNum = 0;
const playButton = document.getElementById("play-button")
playButton.addEventListener("click", play)
const userInput = document.getElementById("user-input")
userInput.addEventListener("focus", function(){userInput.value = ""})
const resetButton = document.getElementById("reset-button")
resetButton.addEventListener("click", reset)
const resultArea = document.getElementById("result-area")
let resultImage = document.querySelector(".result-image")
let chance = 5
let gameOver = false
const chanceArea = document.getElementById("chance-area")
let history = []

function pickRandomNum(){
    randomNum = Math.floor(Math.random()*100)+1
}

function play(){
    const userValue = userInput.value

    if(userValue < 1 || userValue > 100){
        resultArea.textContent = "1 ~ 100 사이의 숫자를 입력하세요"
        return;
    }
    if(history.includes(userValue)){
        resultArea.textContent = "이미 입력한 숫자 입니다. 다른 숫자를 입력하세요"
        return;
    }
    chance --;
    chanceArea.textContent = `남은 기회 : ${chance} 번`
    if(userValue > randomNum){
        resultImage.src = "https://i.gifer.com/23FA.gif"
        resultArea.textContent = "Down!!"
    }else if(userValue < randomNum){
        resultImage.src = "https://media2.giphy.com/media/iZGpuaRKdEZoI/giphy.gif"
        resultArea.textContent = "Up!!"
    }else{
        resultImage.src = "https://c.tenor.com/HabK9twnMigAAAAC/minions-laughing.gif"
        resultArea.textContent = "정답입니다!"
        gameOver = true
    }
    history.push(userValue)
    if(chance < 1){
        gameOver = true
        chanceArea.textContent = "기회가 끝났습니다. 돌아가세요!"
    }
    if(gameOver == true){
        playButton.disabled = true
    }
}

function reset(){
    userInput.value = "";
    pickRandomNum();
    resultImage.src = "https://cdn.dribbble.com/users/720738/screenshots/3848385/hello_zidler_dribbble.gif"
    resultArea.textContent = "아래에 결과가 나옵니다!"
    gameOver = false
    playButton.disabled = false
    chance = 5
    chanceArea.textContent = `남은 기회 : ${chance} 번`
    history = []
}

pickRandomNum();