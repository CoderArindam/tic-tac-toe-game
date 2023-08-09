const bgMusic = new Audio('sounds/music.mp3')
const turnMusic = new Audio('sounds/ting.mp3')
const gameOver = new Audio('sounds/gameover.mp3')
let turn = 'X'
let isGameOver = false;
//funtion to change turn
function changeTurn(){

 if (turn==='X'){
    turn = 'O'
    document.querySelector('.info').innerText = 'Turn for O'
  }
  else{
    turn = 'X'
    document.querySelector('.info').innerText = 'Turn for X'
  }
}

// Function to check for a win

function checkWin() {
  let boxTexts = document.getElementsByClassName('box-text');
  let win = [
    [0, 1, 2,-1,5,180],
    [3, 4, 5, -1,15,180],
    [6, 7, 8,-1,25,180],
    [0, 3, 6,-13,15,90],
    [1, 4, 7,-2.5, 15, 90],
    [2, 5, 8,7.5,15,90],
    [0, 4, 8,6,22,45],
    [2, 4, 6,5,5,130]
  ];

  win.forEach(value => {
    if (
      boxTexts[value[0]].innerText !== '' &&
      boxTexts[value[0]].innerText === boxTexts[value[1]].innerText &&
      boxTexts[value[1]].innerText === boxTexts[value[2]].innerText
    ) {
      document.querySelector('.info').innerText = boxTexts[value[0]].innerText + ' Won';
      isGameOver = true; // Set the game over flag
      bgMusic.play();
      document.querySelector('.image-container').getElementsByTagName('img')[0].style.width = '100px'
      document.querySelector('.line').style.transform = `translate(${value[3]}vw, ${value[4]}vw) rotate(${value[5]}deg)`
      document.querySelector('.line').style.display= 'block'

    }
  });
}

let boxes = document.getElementsByClassName('box');
Array.from(boxes).forEach(element => {
  let boxText = element.querySelector('.box-text');
  element.addEventListener('click', () => {
    
    if (!isGameOver && boxText.innerText === '') { // Check if the game is not over and box is empty
      boxText.innerText = turn;
      changeTurn();
      turnMusic.play();
      checkWin(); // Check for a win after each move
    }
  });
});

//adding lsitener to reset button

resetBtn.addEventListener('click' ,()=>{
  let boxText = document.querySelectorAll('.box-text');
  Array.from(boxText).forEach((element)=>{
    element.innerText = ''
  })
  document.querySelector('.image-container').getElementsByTagName('img')[0].style.width='0px';
  isGameOver = false;
  turn= 'X'
  document.querySelector('.info').innerText = 'Turn For X';
  document.querySelector('.line').style.display= 'none';
  bgMusic.pause();
  setRandomVideo()

})


const API_KEY = 'VCHFgQFXHulFCuElQkg63NLIBsYJOpjIqPWx72vRBQ2KebmuNSLMouTJ';

async function fetchRandomVideoUrl() {
  try {
    const response = await fetch('https://api.pexels.com/videos/popular', {
      headers: {
        Authorization: API_KEY,
      },
    });

    const data = await response.json();
    if (data.videos && data.videos.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.videos.length);
      return data.videos[randomIndex].video_files.find(file => file.quality === 'sd').link;
    } else {
      console.error('No videos found');
      return null;
    }
  } catch (error) {
    console.error('Error fetching videos:', error);
    return null;
  }
}

async function setRandomVideo() {
  const randomVideoUrl = await fetchRandomVideoUrl();
  if (randomVideoUrl) {
    const videoPlayer = document.getElementById('bg-video');
    videoPlayer.src = randomVideoUrl;
    videoPlayer.play();
  }
}

// Call the function when the page loads
window.addEventListener('load', setRandomVideo);
