const songName = document.querySelector('.song-name');
const artistName = document.querySelector('.artist-name')
const song = document.querySelector('.audio')
const cover = document.querySelector('.cover')
const play = document.querySelector('.button-player')

const mockingbird = {
    songName : 'Mockingbird',
    artist : 'Eminem',
    file : 'mokingbird'
}

const saudadesDoTempo = {
    songName : 'Saudades do tempo',
    artist : 'Maneva',
    file : 'saudades-do-tempo'
}

let isPlaying = false;
const playlist = [mockingbird, saudadesDoTempo];
let index = 0;

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
