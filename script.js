const songName = document.querySelector('.song-name');
const song = document.querySelector('.audio')
const play = document.querySelector('.button-player')

songName.innerText = 'Mockingnbird';

play.addEventListener('click', () => {
    song.play()
})