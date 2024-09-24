let audio = document.getElementById('audio');
let playButton = document.getElementById('play-btn');
let currentTimeElement = document.getElementById('current-time');
let totalTimeElement = document.getElementById('total-time');
let seekBar = document.getElementById('seek-bar');
let songTitle = document.getElementById('song-title');

// Array of songs
let songs = ['music1.mp3', 'music2.mp3', 'music3.mp3', 'music4.mp3', 'music5.mp3', 'music6.mp3', 'music7.mp3', 'music8.mp3', 'music9.mp3', 'music10.mp3', 'music11.mp3', 'music12.mp3', 'music13.mp3'];
let currentSongIndex = 0;

// Play/Stop toggle function
function togglePlay() {
    if (audio.paused) {
        audio.play();
        playButton.innerHTML = '&#9724;'; // Change to stop icon
    } else {
        audio.pause();
        playButton.innerHTML = '&#9654;'; // Change back to play icon
    }
}

// Next song function
document.getElementById('next-btn').addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
});

// Previous song function
document.getElementById('prev-btn').addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
});

// Load song
function loadSong(index) {
    audio.src = songs[index];
    songTitle.textContent = `Now Playing: Song ${index + 1}`;
    seekBar.value = 0; // Ensure the seek bar starts at 0 when a new song is loaded
    togglePlay(); // Automatically play the new song
}

// Update total time and current time
audio.addEventListener('loadedmetadata', () => {
    const totalMinutes = Math.floor(audio.duration / 60);
    const totalSeconds = Math.floor(audio.duration % 60);
    totalTimeElement.textContent = `${totalMinutes}:${totalSeconds < 10 ? '0' : ''}${totalSeconds}`;
});

audio.addEventListener('timeupdate', () => {
    const currentMinutes = Math.floor(audio.currentTime / 60);
    const currentSeconds = Math.floor(audio.currentTime % 60);
    currentTimeElement.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;

    // Update seek bar
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    seekBar.value = progressPercent;

    // Update background gradient as music plays
    updateBackgroundGradient();
});

// Function to change the gradient based on music progress
function updateBackgroundGradient() {
    const progress = (audio.currentTime / audio.duration) * 100;
    document.body.style.backgroundPosition = `${progress}% 50%`;
}

// Seek functionality
seekBar.addEventListener('input', () => {
    const seekTime = (seekBar.value / 100) * audio.duration;
    audio.currentTime = seekTime;
});

// Start with the seek bar at the beginning (0%)
seekBar.value = 0;

// Start with the first song loaded
loadSong(currentSongIndex);
