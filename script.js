console.log("Welcome to Melodix");
let masterPlay=document.querySelector(".masterPlay");
let myProgressBar=document.querySelector(".progress-bar");
let songs=[
    {
songName:"Let me love you", songPath:"asset/1.mp3", songCover:"asset/1.png"
},{
    songName:"Attention", songPath:"asset/2.mp3", songCover:"asset/2.png"
},
{
    songName:"Tum hi ho", songPath:"asset/3.mp3", songCover:"asset/3.png"
},
{
    songName:"Chandaniya", songPath:"asset/4.mp3", songCover:"asset/4.jpg"
}
];
let audioElement= new Audio('asset/1.mp3');
// audioElement.play();
masterPlay.addEventListener("click", ()=>{
if (audioElement.paused || audioElement.currentTime<=0){
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
}
else{
    songEnd.innerText=formatTime(audioElement.duration);
    audioElement.pause();
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');

}
});
function formatTime(seconds) {
    let mins = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);
    if (secs < 10) secs = "0" + secs;
    return `${mins}:${secs}`;
}

let songStart=document.querySelector("#songStart");
let songEnd=document.querySelector("#songEnd");
audioElement.addEventListener('timeupdate',()=>{
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value=progress;
    songStart.innerText=formatTime(audioElement.currentTime);

    
});
myProgressBar.addEventListener("change",()=>{
    audioElement.currentTime=myProgressBar.value*audioElement.duration/100;
});
let cardPlay = document.querySelectorAll(".card");
let currPlay = document.querySelector(".currSongName");
let currSongImg= document.querySelector(".currSongImg");

cardPlay.forEach((card, index) => {
  card.addEventListener("click", () => {
    // Load the selected song
    audioElement.src = songs[index].songPath;
    audioElement.play();

    // Update play/pause icon
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");

    // Update UI
    currPlay.innerText = songs[index].songName;
    currSongImg.src=songs[index].songCover;

    // Update progress time at end
    audioElement.addEventListener("loadedmetadata", () => {
    songEnd.innerText = formatTime(audioElement.duration);
});
  });
});
