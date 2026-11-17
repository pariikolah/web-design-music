// ---------- پلیر آهنگ‌ها (صفحه‌ی artist) ----------
let audio = document.getElementById('audioPlayer')
let songRows = document.querySelectorAll('.song-row')
let playPauseBtn = document.getElementById('playPause')
let prevSongBtn = document.getElementById('prevSong')
let nextSongBtn = document.getElementById('nextSong')
let seekBar = document.getElementById('seekBar')
let currentTimeText = document.getElementById('currentTime')
let totalTimeText = document.getElementById('totalTime')
let playerTitle = document.getElementById('playerTitle')
let playerArtist = document.getElementById('playerArtist')

let current = -1   // شماره‌ی آهنگی که الان انتخاب شده (-1 یعنی هنوز هیچی)

// ثانیه رو به شکل 3:25 درمیاره
function format_time(seconds){
    if(isNaN(seconds)){
        return '0:00'
    }
    let min = Math.floor(seconds / 60)
    let sec = Math.floor(seconds % 60)
    if(sec < 10){
        sec = '0' + sec
    }
    return min + ':' + sec
}

// آهنگ شماره‌ی index رو پخش میکنه
function play_song(index){
    current = index
    audio.src = songRows[index].dataset.src
    audio.play()

    playerTitle.textContent = songRows[index].dataset.title
    playerArtist.textContent = songRows[index].dataset.artist
    seekBar.value = 0

    // فقط ردیفی که پخش میشه هایلایت بشه
    for(let i = 0; i < songRows.length; i++){
        songRows[i].classList.remove('playing')
    }
    songRows[index].classList.add('playing')
}

// دکمه‌ی پلی هر ردیف
for(let i = 0; i < songRows.length; i++){
    let rowPlayBtn = songRows[i].querySelector('.song-play')

    rowPlayBtn.addEventListener('click', function(){
        if(i === current){
            // همین آهنگ بود: پلی/استپ
            if(audio.paused){
                audio.play()
            }
            else{
                audio.pause()
            }
        }
        else{
            play_song(i)
        }
    })
}

// دکمه‌ی اصلی پلی/استپ
playPauseBtn.addEventListener('click', function(){
    if(current === -1){
        play_song(0)
    }
    else if(audio.paused){
        audio.play()
    }
    else{
        audio.pause()
    }
})

// آهنگ بعدی و قبلی
nextSongBtn.addEventListener('click', function(){
    let next = current + 1
    if(next >= songRows.length){
        next = 0
    }
    play_song(next)
})

prevSongBtn.addEventListener('click', function(){
    let prev = current - 1
    if(prev < 0){
        prev = songRows.length - 1
    }
    play_song(prev)
})

// آیکون دکمه‌ی اصلی با پخش و توقف عوض میشه
audio.addEventListener('play', function(){
    playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>'
})
audio.addEventListener('pause', function(){
    playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>'
})

// زمان و نوار پیشرفت
audio.addEventListener('loadedmetadata', function(){
    totalTimeText.textContent = format_time(audio.duration)
})
audio.addEventListener('timeupdate', function(){
    currentTimeText.textContent = format_time(audio.currentTime)
    if(audio.duration){
        seekBar.value = (audio.currentTime / audio.duration) * 100
    }
})

// کشیدن نوار = رفتن به اون قسمت آهنگ
seekBar.addEventListener('input', function(){
    audio.currentTime = (seekBar.value / 100) * audio.duration
})

// آهنگ تموم شد: بره بعدی
audio.addEventListener('ended', function(){
    nextSongBtn.click()
})
