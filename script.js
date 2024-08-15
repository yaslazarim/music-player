const songName = document.querySelector('.song-name');
const song = document.querySelector('.audio')
const play = document.querySelector('.button-player')

songName.innerText = 'Mockingnbird';
let isPlaying = false;

function playSong(){
    play.querySelector('.bi').classList.remove('bi-play-circle-fill')
    play.querySelector('.bi').classList.add('bi-pause-circle-fill')
    song.play();
    isPlaying = true;
}

function pauseSong(){
    play.querySelector('.bi').classList.add('bi-play-circle-fill')
    play.querySelector('.bi').classList.remove('bi-pause-circle-fill')
    song.pause();
    isPlaying = false;
}

function playPauseDecider(){
    if(isPlaying === true){
        pauseSong()
    } 
    else{
        playSong()
    }
}

play.addEventListener('click', playPauseDecider);
