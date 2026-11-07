const boxes = document.querySelectorAll(".boxes");
const scoreDisplay = document.getElementById("scoreDisplay");
const start = document.getElementById("start");
const scoreCng = document.getElementById("scoreCng");
const boxesCont = document.getElementById("boxesCont");
const finalScoreCont = document.getElementById("finalScoreCont");
const scoreText = document.getElementById("scoreText");
const scoreClose = document.getElementById("scoreClose");
const scoreTotal = document.getElementById("scoreTotal");


let isRunning = false;
boxesCont.classList.remove("spinStart");
finalScoreCont.classList.add("hideScoreText");
finalScoreCont.classList.remove("showScoreText");

function randomizer(min, max){
  
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//audio

function playSound(audio) {
  audio.currentTime = 0;
  audio.play().catch(() => {}); 
}

const hitColorSound = new Audio("audio/hitSound.mp3");
const bombColorSound = new Audio("audio/bombSound.mp3");
const freezeColorSound = new Audio("audio/freezeSound.mp3");
const frozenTilesSound = new Audio("audio/frozenTiles.mp3");
const timeRewindColorSound = new Audio("audio/timeRewindSound.mp3");
const timeForwardColorSound = new Audio("audio/timeForwardSound.wav");
const doublePointSound = new Audio("audio/doublePointsSound.mp3");
const doubleSound = new Audio("audio/doubleSound.mp3");
const notHitColorSound = new Audio("audio/notHitSound.mp3");
const splitColorSound = new Audio("audio/splitBonusSound.mp3");

//change score
let score = 0;
let scoreCngTime;

scoreCng.classList.add("hide");
scoreCng.classList.remove("show");

function scoreUp(){
  
  scoreCng.textContent = "";
  
  if(canDouble){
    
    score+=10;
    scoreCng.textContent = "+10";
    scoreCng.classList.remove("hide");
    scoreCng.classList.add("show");
    playSound(doublePointSound);
  } 
  else{

    score+=5;
    scoreCng.textContent = "+5";
    scoreCng.classList.remove("hide");
    scoreCng.classList.add("show");
  }
  scoreCngTime = setTimeout(() => {
      
      scoreCng.textContent = "";
      scoreCng.classList.add("hide");
      scoreCng.classList.remove("show");
    }, 350);
}
function scoreDown(){
  
  score-=3;
  scoreCng.textContent = "-3";
  scoreCng.classList.remove("hide");
  scoreCng.classList.add("show");
  scoreCngTime = setTimeout(() => {
      
      scoreCng.textContent = "";
      scoreCng.classList.add("hide");
      scoreCng.classList.remove("show");
    }, 350);
}



//fix scoreCng animation

function displayScore(){
  
  scoreDisplay.textContent = `${score}`;
}

boxes.forEach(btn => {
  
  btn.addEventListener('click', () => {
    
    if(btn.classList.contains("normalColor")) return;

    if(btn.classList.contains("notHitColor") && btn.classList.contains("isLit")){
      scoreDown();
      playSound(notHitColorSound);
    }
    else if((btn.classList.contains("hitColor") || btn.classList.contains("splitColor") || btn.classList.contains("doubleColor")) && btn.classList.contains("isLit")){
      scoreUp();
    }
    
    displayScore();
  });
});

//time
const time = document.getElementById("time");

let remainingTime = 0;



let tracker1 = { prev:null };
let tracker2 = { prev:null };
let tracker3 = { prev:null };
let tracker4 = { prev:null };
let lightInterval, lightInterval2, lightInterval3, lightInterval4;



function lightUp(tracker){
  
  let randomNum;
  let randomType;
  
  randomType = randomizer(1, 100);
  if(isFrozen) return; 
    
  do{
    
    randomNum = randomizer(0,24);
  }while(randomNum === tracker.prev);
  
  if(tracker.prev !== null && !isFrozen){
    
    boxes[tracker.prev].classList.remove("hitColor", "notHitColor", "normalColor", "isLit", "splitColor", "bombColor", "doubleColor", "freezeColor", "timeForwardColor", "timeBackwardColor", "mainSplitBtn", "bombBtn", "doubleBtn", "freezeBtn", "timeForwardBtn", "timeBackwardBtn");
      }
  
  if(randomType >= 95 && !isFrozen && !boxes[randomNum].classList.contains("splitColor") && !boxes[randomNum].classList.contains("isLit")){
    
    bonusChance = randomizer(1,6);
    boxes[randomNum].classList.remove("hitColor", "notHitColor", "normalColor", "isLit", "splitColor", "bombColor", "doubleColor", "freezeColor", "timeForwardColor", "timeBackwardColor", "mainSplitBtn", "bombBtn", "doubleBtn", "freezeBtn", "timeForwardBtn", "timeBackwardBtn");

    
    if(bonusChance === 6 && !canDouble && !isFrozen){
      
      boxes[randomNum].classList.add("splitColor");
      boxes[randomNum].classList.add("mainSplitBtn");
      const splitBtnRemove = setTimeout(() => {
      
      boxes[randomNum].classList.remove("splitColor");
      boxes[randomNum].classList.remove("mainSplitBtn");
      boxes[randomNum].classList.remove("isLit");
    }, 1500);
    }
    else if(bonusChance === 5  && !canDouble && !isFrozen){
      
     boxes[randomNum].classList.add("bombColor");
      boxes[randomNum].classList.add("bombBtn");
      const bombBtnRemove = setTimeout(() => {
      
      boxes[randomNum].classList.remove("bombColor");
      boxes[randomNum].classList.remove("bombBtn");
      boxes[randomNum].classList.remove("isLit");
    }, 1500); 
    }
  else if(bonusChance === 4  && !canDouble && !isFrozen){
      
     boxes[randomNum].classList.add("doubleColor");
      boxes[randomNum].classList.add("doubleBtn");
      const doubleBtnRemove = setTimeout(() => {
      
      boxes[randomNum].classList.remove("doubleColor");
      boxes[randomNum].classList.remove("doubleBtn");
      boxes[randomNum].classList.remove("isLit");
    }, 1500); 
    }
    else if(bonusChance === 3  && !canDouble && !isFrozen){
      
     boxes[randomNum].classList.add("freezeColor");
      boxes[randomNum].classList.add("freezeBtn");
      const freezeBtnRemove = setTimeout(() => {
      if(isFrozen) return;
      else{
      boxes[randomNum].classList.remove("freezeColor");
      boxes[randomNum].classList.remove("freezeBtn");
      boxes[randomNum].classList.remove("isLit");}
    }, 1500); 
    }
    else if(bonusChance === 2  && !canDouble && !isFrozen){
      
     boxes[randomNum].classList.add("timeForwardColor");
      boxes[randomNum].classList.add("timeForwardBtn");
      const timeForwardBtnRemove = setTimeout(() => {
      
      boxes[randomNum].classList.remove("timeForwardColor");
      boxes[randomNum].classList.remove("timeForwardBtn");
      boxes[randomNum].classList.remove("isLit");
    }, 1500); 
    }
    else if(bonusChance === 1 && !canDouble && !isFrozen){
      
     boxes[randomNum].classList.add("timeBackwardColor");
      boxes[randomNum].classList.add("timeBackwardBtn");
      const timeBackwardBtnRemove = setTimeout(() => {
      
      boxes[randomNum].classList.remove("timeBackwardColor");
      boxes[randomNum].classList.remove("timeBackwardBtn");
      boxes[randomNum].classList.remove("isLit");
    }, 1500); 
    }
  }
  else if(randomType >= 68 && !isFrozen && !boxes[randomNum].classList.contains("splitColor") && !boxes[randomNum].classList.contains("isLit")){
    boxes[randomNum].classList.remove("hitColor", "normalColor", "splitColor", "bombColor", "doubleColor", "freezeColor", "timeForwardColor", "timeBackwardColor", "mainSplitBtn", "bombBtn", "doubleBtn", "freezeBtn", "timeForwardBtn", "timeBackwardBtn");
    boxes[randomNum].classList.add("notHitColor");
  }
  else{
    boxes[randomNum].classList.remove("hitColor", "notHitColor", "normalColor", "isLit", "splitColor", "bombColor", "doubleColor", "freezeColor", "timeForwardColor", "timeBackwardColor", "mainSplitBtn", "bombBtn", "doubleBtn", "freezeBtn", "timeForwardBtn", "timeBackwardBtn");
    if(canDouble && !isFrozen && !boxes[randomNum].classList.contains("splitColor") && !boxes[randomNum].classList.contains("isLit")){
      boxes[randomNum].classList.add("doubleColor");
    }
    else if(!canDouble && !isFrozen && !boxes[randomNum].classList.contains("splitColor") && !boxes[randomNum].classList.contains("isLit")){
      boxes[randomNum].classList.add("hitColor");
    }
  }
  boxes[randomNum].classList.remove("normalColor");
  boxes[randomNum].classList.add("isLit");
  tracker.prev = randomNum;
  
  boxes[randomNum].onclick = function(){

    
    if(boxes[randomNum].classList.contains("splitColor") && boxes[randomNum].classList.contains("mainSplitBtn")){
      
      splitBonus();
      boxes[randomNum].classList.remove("splitColor");
      boxes[randomNum].classList.add("normalColor");
      boxes[randomNum].classList.remove("isLit");
      boxes[randomNum].classList.remove("mainSplitBtn");
    }
    else if(boxes[randomNum].classList.contains("bombColor") && boxes[randomNum].classList.contains("bombBtn")){
      
      bomb();
      boxes[randomNum].classList.remove("bombColor");
      boxes[randomNum].classList.add("normalColor");
      boxes[randomNum].classList.remove("isLit");
      boxes[randomNum].classList.remove("bombBtn");
    }
    else if(boxes[randomNum].classList.contains("doubleColor") && boxes[randomNum].classList.contains("doubleBtn")){
      
      double();
      boxes[randomNum].classList.remove("doubleColor");
      boxes[randomNum].classList.add("normalColor");
      boxes[randomNum].classList.remove("isLit");
      boxes[randomNum].classList.remove("doubleBtn");
    }
    else if(boxes[randomNum].classList.contains("freezeColor") && boxes[randomNum].classList.contains("freezeBtn")){
      
      freeze();
    }
    else if(boxes[randomNum].classList.contains("timeForwardColor") && boxes[randomNum].classList.contains("timeForwardBtn")){
      
      timeForward();
      boxes[randomNum].classList.remove("timeForwardColor");
      boxes[randomNum].classList.add("normalColor");
      boxes[randomNum].classList.remove("isLit");
      boxes[randomNum].classList.remove("timeForwardBtn");
    }
    else if(boxes[randomNum].classList.contains("timeBackwardColor") && boxes[randomNum].classList.contains("timeBackwardBtn")){
      
      timeBackward();
      boxes[randomNum].classList.remove("timeBackwardColor");
      boxes[randomNum].classList.add("normalColor");
      boxes[randomNum].classList.remove("isLit");
      boxes[randomNum].classList.remove("timeBackwardBtn");
    }
    else{
      if(boxes[randomNum].classList.contains("hitColor")){
        playSound(hitColorSound);
      }
    boxes[randomNum].classList.remove("hitColor");
    boxes[randomNum].classList.remove("notHitColor");
    boxes[randomNum].classList.add("normalColor");
    boxes[randomNum].classList.remove("isLit");
    boxes[randomNum].classList.remove("splitColor");
    boxes[randomNum].classList.add("normalColor");
    boxes[randomNum].classList.remove("isLit");
    }
  }
 } 

//Special btns

let bonusChance;


function splitBonus(){
  
  playSound(splitColorSound);
  
    do{
      
      splitBonusBox1 = randomizer(0,24);
    }while(boxes[splitBonusBox1].classList.contains("isLit"));
    
    do{
      
      splitBonusBox2 = randomizer(0,24);
    }while(splitBonusBox2 === splitBonusBox1 || boxes[splitBonusBox2].classList.contains("isLit"));
    
    do{
      
      splitBonusBox3 = randomizer(0,24);
    }while(splitBonusBox3 === splitBonusBox1 || splitBonusBox3 === splitBonusBox2 || boxes[splitBonusBox3].classList.contains("isLit"));
    
    do{
      
      splitBonusBox4 = randomizer(0,24);
    }while(splitBonusBox4 === splitBonusBox1 || splitBonusBox4 === splitBonusBox2 || splitBonusBox4 === splitBonusBox3 || boxes[splitBonusBox4].classList.contains("isLit"));
    
    function splitAssign(splitBonusBoxNum){
      
      boxes[splitBonusBoxNum].classList.add("splitColor");
      boxes[splitBonusBoxNum].classList.remove("normalColor");
      boxes[splitBonusBoxNum].classList.add("isLit");
      boxes[splitBonusBoxNum].classList.remove("mainSplitBtn");
      
      boxes[splitBonusBoxNum].onclick = function() {

        if(!boxes[splitBonusBoxNum].classList.contains("splitColor")) return;

        playSound(splitColorSound);
        boxes[splitBonusBoxNum].classList.remove("splitColor");
        boxes[splitBonusBoxNum].classList.add("normalColor");
        boxes[splitBonusBoxNum].classList.remove("isLit");
        score+=15;
        displayScore();
        
        scoreCng.textContent = "+15";
        scoreCng.classList.remove("hide");
        scoreCng.classList.add("show");
        
        splitBonusBoxNum = 0;
        const splitScoreRemove = setTimeout(() => {

          scoreCng.classList.add("hide");
          scoreCng.classList.remove("show");
        }, 1500);
      }
    }
    
    splitAssign(splitBonusBox1);
    splitAssign(splitBonusBox2);
    splitAssign(splitBonusBox3);
    splitAssign(splitBonusBox4);
    
    
    function splitBtnRemoveTime(splitBonusBoxNum, time){
      
      const splitBtnRemoveTimeout = setTimeout(() => {

      if(boxes[splitBonusBoxNum].classList.contains("splitColor")){
          boxes[splitBonusBoxNum].classList.remove("splitColor");
          boxes[splitBonusBoxNum].classList.remove("mainSplitBtn");
          boxes[splitBonusBoxNum].classList.remove("isLit");
          boxes[splitBonusBoxNum].classList.add("normalColor");
          scoreCng.classList.add("hide");
          scoreCng.classList.remove("show");
          splitBonusBoxNum = 0;
        }
        
    }, time);
    }
    
    splitBtnRemoveTime(splitBonusBox1, 1200);
    splitBtnRemoveTime(splitBonusBox2, 1500);
    splitBtnRemoveTime(splitBonusBox3, 1700);
    splitBtnRemoveTime(splitBonusBox4, 1800);
}


boxesCont.classList.remove("blastAnimation");

function bomb(){

  boxesCont.classList.add("blastAnimation");
  playSound(bombColorSound);
  const blastRemove = setTimeout(() => {

    boxesCont.classList.remove("blastAnimation");
    boxes.forEach(box => {
        
      box.disabled = false;
      });
  },2000);
  score-=25;
  scoreCng.textContent = "-25";
  displayScore();

  boxes.forEach(box => {
        
      box.disabled = true;
      });
  
}

let canDouble = false;


function double(){
  
  canDouble = true;
  playSound(doubleSound);
  
  const doubleStop = setTimeout(() => {
    
    canDouble = false;
  }, 4000);
}

let isFrozen = false;

function freeze(){

  playSound(freezeColorSound);
  boxes.forEach(box => {
    
    box.classList.add("freezeColor");
    box.disabled = true;

    let freezeTime = setTimeout(() => {
      
      box.disabled = false;
      isFrozen = false;
      box.classList.remove("freezeColor");
      box.classList.remove("isLit");
    }, 5000);
  });
  isFrozen = true;
}

function timeForward(){

  playSound(timeForwardColorSound);
  boxesCont.classList.add("timeForwardAnimation");
  const timeForwardAniRemove = setTimeout(() => {

    boxesCont.classList.remove("timeForwardAnimation");
  }, 1000);
  if(remainingTime >= 5){
    remainingTime-=5;
  }
  else{
    remainingTime = 0;
  }

  clearTimeout(stopGame);
  clearTimeout(stopGame2);
  clearTimeout(stopGame3);
  clearTimeout(stopGame4);

  stopGame = setTimeout(endGame, remainingTime * 1000, lightInterval, tracker1);
  stopGame2 = setTimeout(endGame, remainingTime * 1000, lightInterval2, tracker2);
  stopGame3 = setTimeout(endGame, remainingTime * 1000, lightInterval3, tracker3);
  stopGame4 = setTimeout(endGame, remainingTime * 1000, lightInterval4, tracker4);

}

function timeBackward(){

  playSound(timeRewindColorSound);
  boxesCont.classList.add("timeBackwardAnimation");
  const timeBackAniRemove = setTimeout(() => {

    boxesCont.classList.remove("timeBackwardAnimation");
  }, 1000);
  if(remainingTime >= 25){
    remainingTime=30;
  }
  else{
    remainingTime+=5;
  }

  clearTimeout(stopGame);
  clearTimeout(stopGame2);
  clearTimeout(stopGame3);
  clearTimeout(stopGame4);

  stopGame = setTimeout(endGame, remainingTime * 1000, lightInterval, tracker1);
  stopGame2 = setTimeout(endGame, remainingTime * 1000, lightInterval2, tracker2);
  stopGame3 = setTimeout(endGame, remainingTime * 1000, lightInterval3, tracker3);
  stopGame4 = setTimeout(endGame, remainingTime * 1000, lightInterval4, tracker4);
}

//edit time ending system if time increases


let timeDecrease;

let stopGame;
let stopGame2;
let stopGame3;
let stopGame4;

start.onclick = function(){
  
  if(!isRunning){
  remainingTime = 30;
  boxesCont.classList.add("spinStart");
  
  time.textContent = remainingTime;
  scoreCng.textContent = "";
  
  timeDecrease = setInterval(() => {
      remainingTime--;
      time.textContent = remainingTime;
      if(remainingTime === 0){
        endGame(lightInterval, tracker1);
        endGame(lightInterval2, tracker2);
        endGame(lightInterval3, tracker3);
        endGame(lightInterval4, tracker4);
      }
  }, 1000);
  score = 0;
  scoreDisplay.textContent = "0";
  lightInterval = setInterval(lightUp, 750, tracker1);
  lightInterval2 = setInterval(lightUp, 800, tracker2);
  lightInterval3 = setInterval(lightUp, 900, tracker3);
  lightInterval4 = setInterval(lightUp, 1050, tracker4);
  isRunning = true;
  previousNum = null;
  stopGame = setTimeout(endGame, 30000, lightInterval, tracker1);
  stopGame2 = setTimeout(endGame, 30000, lightInterval2, tracker2);
  stopGame3 = setTimeout(endGame, 30000, lightInterval3, tracker3);
  stopGame4 = setTimeout(endGame, 30000, lightInterval4, tracker4);
  }
}

scoreClose.onclick = function(){

  finalScoreCont.classList.add("hideScoreText");
  finalScoreCont.classList.remove("showScoreText");
  location.reload();
}


function endGame(interval, tracker){
  
  clearInterval(interval);
  clearInterval(lightInterval);
  clearInterval(lightInterval2);
  clearInterval(lightInterval3);
  clearInterval(lightInterval4);
  clearTimeout(stopGame);
  clearTimeout(stopGame2);
  clearTimeout(stopGame3);
  clearTimeout(stopGame4);
  clearInterval(timeDecrease);
  time.textContent = "30";
  scoreCng.textContent = "GAME OVER";
  scoreCng.classList.remove("hide");
  scoreCng.classList.add("show");
  
    boxesCont.classList.remove("spinStart");
    boxesCont.classList.remove("timeBackwardAnimation");
    boxesCont.classList.remove("timeForwardAnimation");

  
    isRunning = false;
    canDouble = false;
    isFrozen = false;

  finalScoreCont.classList.remove("hideScoreText");
  finalScoreCont.classList.add("showScoreText");
  scoreCheck(score);
    
    if (tracker.prev !== null) {
      boxes.forEach(box => {
        
        box.classList.remove("hitColor");
        box.classList.remove("notHitColor");
        box.classList.add("normalColor");
        box.classList.remove("isLit");
        box.classList.remove("splitColor");
        box.classList.remove("mainSplitBtn");
        box.classList.remove("bombColor");
        box.classList.remove("bombBtn");
        box.classList.remove("doubleColor");
        box.classList.remove("doubleBtn");
        box.classList.remove("freezeColor");
        box.classList.remove("freezeBtn");
        box.classList.remove("timeForwardColor");
        box.classList.remove("timeForwardBtn");
        box.classList.remove("timeBackwardColor");
        box.classList.remove("timeBackwardBtn");
        box.disabled = false;
      });
      }
}

const infoCont = document.getElementById("infoCont");
const info = document.getElementById("info");

infoCont.classList.add("hideInfo");
info.onclick = function(){

  if(infoCont.classList.contains("hideInfo")){
    infoCont.classList.remove("hideInfo");
  }
  else if(!infoCont.classList.contains("hideInfo")){
    infoCont.classList.add("hideInfo");
  }
}

function scoreCheck(score){

scoreTotal.textContent = `Score: ${score}`;
  
  switch(true){

    case (score > 600):
      scoreText.textContent = `You scored ${score}! You achieved the title: Speed of Light... The highest rank you can gain here.`;
      scoreTotal.style.color = "#9fe0e5";
      break;
    case (score > 500):
      scoreText.textContent = `You scored ${score}! You achieved the title: Luminary... The second highest rank you can gain here.`;
      scoreTotal.style.color = "#e8d217";
      break;
    case (score > 400):
      scoreText.textContent = `You scored ${score}! You achieved the title: Prism... The third highest rank you can gain here.`;
      scoreTotal.style.color = "#F0A500";
      break;
    case (score > 300):
      scoreText.textContent = `You scored ${score}! You achieved the title: Ray Tracer...`;
      scoreTotal.style.color = "#F082F0";
      break;
    case (score > 150):
      scoreText.textContent = `You scored ${score}! You achieved the title: Spark Chaser...`;
      scoreTotal.style.color = "#8FF08F";
      break;
    case (score > 50):
      scoreText.textContent = `You scored ${score}! You achieved the title: First Light...`;
      scoreTotal.style.color = "#4251F8";
      break;
    case (score > 0):
      scoreText.textContent = `You scored ${score}! You achieved the title: Novice...`;
      scoreTotal.style.color = "#FFFFFF";
      break;
    case (score > -100):
      scoreText.textContent = `You scored ${score}! You achieved the title: Short Circuit...`;
      scoreTotal.style.color = "#FF6445";
      break;
    case (score <= -100):
      scoreText.textContent = `You scored ${score}! You achieved the title: Total Blackout... It needs serious dedication to achieve this.`;
      scoreTotal.style.color = "#554343";
      break;
  }
}