const songName = document.querySelector('.song-name');
const artistName = document.querySelector('.artist-name')
const song = document.querySelector('.audio')
const cover = document.querySelector('.cover')
const play = document.querySelector('.button-player')
const previous = document.querySelector('.previous')
const next = document.querySelector('.next')
const currentProgressBar = document.querySelector('.current-progress')
const progressBarContainer = document.querySelector('.progress-bar-container')
const shuffleButton = document.querySelector('.button-shuffle')
const repeatButton = document.querySelector('.button-repeat')

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

const loveAndHate = {
    songName : 'Love & Hate',
    artist : 'Michael Kiwanuka',
    file : 'love-and-hate'
}

let isPlaying = false;
let isShuffled = false;
let repeatOn = false;
const originalPlaylist = [mockingbird, saudadesDoTempo, ninguem, loveAndHate];
let sortedPlaylist = [...originalPlaylist];
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
    cover.src = `img/${sortedPlaylist[index].file}.jpg`;
    song.src = `songs/${sortedPlaylist[index].file}.mp3`;
    songName.innerText = sortedPlaylist[index].songName;
    artistName.innerText = sortedPlaylist[index].artist;
}

function previousSong(){
    if(index === 0){
        index = sortedPlaylist.length -1;
    }
    else{
        index -= 1;
    }
    initializeSong();
    playSong();
}

function nextSong(){
    if(index === sortedPlaylist.length -1){
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

function shuffleArray(preShuffleArray){
    const size = preShuffleArray.length;
    let currentIndex = size - 1;
    while(currentIndex > 0){
        let  randomIndex = Math.floor(Math.random()* size);
        let aux = preShuffleArray[currentIndex];
        preShuffleArray[currentIndex] = preShuffleArray[randomIndex];
        preShuffleArray[randomIndex] = aux;
        currentIndex -= 1;
    }
}

function shuffleButtonClicked(){
    if(isShuffled === false){
        isShuffled = true;
        shuffleArray(sortedPlaylist);
        shuffleButton.classList.add('button-active')
    }
    else{
        isShuffled = false;
        sortedPlaylist = [originalPlaylist];
        shuffleButton.classList.remove('button-active')
    }
}

function repeatButtonClicked(){
    if(repeatOn === false){
        repeatOn = true;
        repeatButton.classList.add('button-active')
    }
    else{
        repeatOn = false;
        repeatButton.classList.remove('button-active')
    }
}

function nextOrRepeat(){
    if(repeatOn === false){
        nextSong();
    }
    else{
        playSong();
    }
}

initializeSong();

play.addEventListener('click', playPauseDecider);
previous.addEventListener('click', previousSong);
next.addEventListener('click', nextSong);
song.addEventListener('timeupdate', updateProgressBar);
song.addEventListener('ended', nextOrRepeat);
progressBarContainer.addEventListener('click', jumpTo);
shuffleButton.addEventListener('click', shuffleButtonClicked);
repeatButton.addEventListener('click', repeatButtonClicked);