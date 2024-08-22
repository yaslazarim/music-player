const songName = document.querySelector('.song-name');
const artistName = document.querySelector('.artist-name');
const song = document.querySelector('.audio');
const cover = document.querySelector('.cover');
const play = document.querySelector('.button-player');
const likeButton = document.querySelector('.like-button');
const previous = document.querySelector('.previous');
const next = document.querySelector('.next');
const currentProgressBar = document.querySelector('.current-progress');
const progressBarContainer = document.querySelector('.progress-bar-container');
const shuffleButton = document.querySelector('.button-shuffle');
const repeatButton = document.querySelector('.button-repeat');
const songTime = document.querySelector('.song-time');
const totalSongTime = document.querySelector('.total-song-time');

const mockingbird = {
    songName : 'Mockingbird',
    artist : 'Eminem',
    file : 'mockingbird',
    liked : false,
}

const saudadesDoTempo = {
    songName : 'Saudades do tempo',
    artist : 'Maneva',
    file : 'saudades-do-tempo',
    liked : false,
}

const ninguem = {
    songName : 'Ninguém',
    artist : 'Fran e Chico Chico ',
    file : 'ninguem',
    liked : false,
}

const loveAndHate = {
    songName : 'Love & Hate',
    artist : 'Michael Kiwanuka',
    file : 'love-and-hate',
    liked : false,
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

function likeButtonRender(){
    if(sortedPlaylist[index].liked === true){
        likeButton.querySelector('.bi').classList.remove('bi-suit-heart');
        likeButton.querySelector('.bi').classList.add('bi-suit-heart-fill');
        likeButton.classList.add('button-active');
    }
    else { 
        likeButton.querySelector('.bi').classList.add('bi-suit-heart');
        likeButton.querySelector('.bi').classList.remove('bi-suit-heart-fill');
        likeButton.classList.remove('button-active');
    }
}

function initializeSong(){
    cover.src = `img/${sortedPlaylist[index].file}.jpg`;
    song.src = `songs/${sortedPlaylist[index].file}.mp3`;
    songName.innerText = sortedPlaylist[index].songName;
    artistName.innerText = sortedPlaylist[index].artist;
    likeButtonRender();
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

function updateProgress(){
    const barWidth = (song.currentTime/song.duration)*100;
    currentProgressBar.style.setProperty('--progress', `${barWidth}%`)
    songTime.innerText = toHHMMSS(song.currentTime);
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

function toHHMMSS(originalNumber){
    let hours = Math.floor(originalNumber / 3600);
    let min = Math.floor((originalNumber - hours * 3600)/60);
    let secs = Math.floor(originalNumber - hours * 3600 - min * 60);

    return `${hours.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function updateTotalSongTime(){
    totalSongTime.innerText = toHHMMSS(song.duration);
}

initializeSong();

play.addEventListener('click', playPauseDecider);
previous.addEventListener('click', previousSong);
next.addEventListener('click', nextSong);
song.addEventListener('timeupdate', updateProgress);
song.addEventListener('ended', nextOrRepeat);
song.addEventListener('loadedmetadata', updateTotalSongTime);
progressBarContainer.addEventListener('click', jumpTo);
shuffleButton.addEventListener('click', shuffleButtonClicked);
repeatButton.addEventListener('click', repeatButtonClicked);