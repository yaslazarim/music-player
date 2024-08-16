const songName = document.querySelector('.song-name');
const artistName = document.querySelector('.artist-name')
const song = document.querySelector('.audio')
const cover = document.querySelector('.cover')
const play = document.querySelector('.button-player')
const previous = document.querySelector('.previous')
const next = document.querySelector('.next')

const mockingbird = {
    songName : 'Mockingbird',
    artist : 'Eminem',
    file : 'mockingbird'
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

function initializeSong(){
    cover.src = `img/${playlist[index].file}.jpg`;
    song.src = `songs/${playlist[index].file}.mp3`;
    songName.innerText = playlist[index].songName;
    artistName.innerText = playlist[index].artist;
}

function previousSong(){
    if(index === 0){
        index = playlist.length -1;
    }
    else{
        index -= 1;
    }
    initializeSong();
    playSong();
}

function nextSong(){
    if(index === playlist.length -1){
        index = 0;
    }
    else{
        index += 1;
    }
    initializeSong();
    playSong();
}

initializeSong();

play.addEventListener('click', playPauseDecider);
previous.addEventListener('click', previousSong);
next.addEventListener('click', nextSong)
