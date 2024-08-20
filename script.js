const songName = document.querySelector('.song-name');
const artistName = document.querySelector('.artist-name')
const song = document.querySelector('.audio')
const cover = document.querySelector('.cover')
const play = document.querySelector('.button-player')
const previous = document.querySelector('.previous')
const next = document.querySelector('.next')
const currentProgressBar = document.querySelector('.current-progress')
const progressBarContainer = document.querySelector('.progress-bar-container')

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

const ninguem = {
    songName : 'Ninguém',
    artist : 'Fran e Chico Chico ',
    file : 'ninguem'
}

let isPlaying = false;
const originalPlaylist = [mockingbird, saudadesDoTempo, ninguem];
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

function updateProgressBar(){
    const barWidth = (song.currentTime/song.duration)*100;
    currentProgressBar.style.setProperty('--progress', `${barWidth}%`)
}

function jumpTo(event){
    const width = progressBarContainer.clientWidth;
    const clickPosition = event.offsetX;
    const jumpToTime = (clickPosition/width)* song.duration;
    song.currentTime = jumpToTime;
}

initializeSong();

play.addEventListener('click', playPauseDecider);
previous.addEventListener('click', previousSong);
next.addEventListener('click', nextSong)
song.addEventListener('timeupdate', updateProgressBar)
progressBarContainer.addEventListener('click', jumpTo)