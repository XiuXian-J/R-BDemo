// 音乐数据 (实际项目中应从服务器获取)
const musicLibrary = [
    {
        id: 1,
        title: "唯一",
        singer: "王力宏",
        album: "《唯一》",
        duration: "4:28",
        src: "../media/weiyi.mp3",
        cover: "../img/stories/weiyi.png"
    },
    {
        id: 2,
        title: "爱很简单",
        singer: "陶喆",
        album: "《David Tao》",
        duration: "4:30",
        src: "../media/aihenjiandan.mp3",
        cover: "../img/stories/aihenjiandan.webp"
    },
    {
        id: 3,
        title: "三人游",
        singer: "方大同",
        album: "《橙月》",
        duration: "4:15",
        src: "../media/sanrenyou.mp3",
        cover: "../img/stories/sanrenyou.png"
    },
    {
        id: 4,
        title: "你不知道的事",
        singer: "王力宏",
        album: "《十八般武艺》",
        duration: "4:46",
        src: "../media/nibuzhidaodeshi.mp3",
        cover: "images/albums/shibabanwuyi.jpg"
    },
    {
        id: 5,
        title: "黑色柳丁",
        singer: "陶喆",
        album: "《黑色柳丁》",
        duration: "4:15",
        src: "../media/heiseliuding.mp3",
        cover: "../img/stories/heiseliuding.jpg"
    },
    {
        id: 6,
        title: "爱爱爱",
        singer: "方大同",
        album: "《爱爱爱》",
        duration: "4:12",
        src: "../media/aiaiai.mp3",
        cover: "../img/stories/aiaiai.jpg"
    },
    {
        id: 7,
        title: "心中的日月",
        singer: "王力宏",
        album: "《心中的日月》",
        duration: "3:58",
        src: "../media/xinzhongderiyue.mp3",
        cover: "../img/stories/xinzhongderiyue.webp"
    },
    {
        id: 8,
        title: "今天你要嫁给我",
        singer: "陶喆",
        album: "《太美丽》",
        duration: "4:35",
        src: "../media/jintianniyaojiageiwo.mp3",
        cover: "../img/stories/"
    },
    {
        id: 9,
        title: "好不容易",
        singer: "方大同",
        album: "《回到未来》",
        duration: "4:22",
        src: "../media/haoburongyi.mp3",
        cover: "../img/stories/"
    }
];

// 播放器状态
let playerState = {
    currentSongIndex: 0,
    isPlaying: false,
    isMuted: false,
    volume: 80,
    currentTime: 0,
    duration: 0
};

let audioPlayer, miniPlayer, fullPlayer, togglePlayerBtn, closePlayerBtn, playPauseBtn, prevBtn, nextBtn, muteBtn;
let progressBar, volumeBar, currentSongTitle, currentSinger, miniSongTitle, currentAlbumArt;
let currentTimeEl, durationEl, playlistContainer, playlistToggleBtn, playlist, playlistCount;

/**
 * 初始化音乐播放器
 */
function initMusicPlayer() {
    console.log('开始初始化音乐播放器...');
    
    // 获取DOM元素
    audioPlayer = document.getElementById('audio-player');
    miniPlayer = document.getElementById('mini-player');
    fullPlayer = document.getElementById('full-player');
    togglePlayerBtn = document.getElementById('toggle-player-btn');
    closePlayerBtn = document.getElementById('close-player-btn');
    playPauseBtn = document.getElementById('play-pause-btn');
    prevBtn = document.getElementById('prev-btn');
    nextBtn = document.getElementById('next-btn');
    muteBtn = document.getElementById('mute-btn');
    progressBar = document.getElementById('progress-bar');
    volumeBar = document.getElementById('volume-bar');
    currentSongTitle = document.getElementById('current-song-title');
    currentSinger = document.getElementById('current-singer');
    miniSongTitle = document.getElementById('mini-song-title');
    currentAlbumArt = document.getElementById('current-album-art');
    currentTimeEl = document.getElementById('current-time');
    durationEl = document.getElementById('duration');
    playlistContainer = document.getElementById('playlist-container');
    playlistToggleBtn = document.getElementById('playlist-toggle-btn');
    playlist = document.getElementById('playlist');
    playlistCount = document.getElementById('playlist-count');
    
    // 检查所有必需的元素是否存在
    const requiredElements = [
        { name: 'audio-player', element: audioPlayer },
        { name: 'play-pause-btn', element: playPauseBtn },
        { name: 'mini-player', element: miniPlayer },
        { name: 'full-player', element: fullPlayer }
    ];
    
    for (const item of requiredElements) {
        if (!item.element) {
            console.error(`错误: 无法找到 ${item.name} 元素`);
            return false;
        }
    }
    
    // 设置初始音量
    audioPlayer.volume = playerState.volume / 100;
    if (volumeBar) {
        volumeBar.value = playerState.volume;
    }
    
    // 加载第一首歌曲
    loadSong(playerState.currentSongIndex);
    
    // 初始化播放列表
    initPlaylist();
    
    // 设置事件监听器
    setupEventListeners();
    
    // 更新播放列表计数
    updatePlaylistCount();
    
    console.log('音乐播放器初始化完成！');
    return true;
}

/**
 * 初始化播放列表
 */
function initPlaylist() {
    if (!playlist) return;
    
    // 清空播放列表
    playlist.innerHTML = '';
    
    // 添加歌曲到播放列表
    musicLibrary.forEach((song, index) => {
        const li = document.createElement('li');
        li.className = 'playlist-item';
        if (index === playerState.currentSongIndex) {
            li.classList.add('active');
        }
        
        li.innerHTML = `
            <i class="fas fa-music"></i>
            <div class="song-info">
                <div class="song-title">${song.title}</div>
                <div class="singer">${song.singer} - ${song.album}</div>
            </div>
            <div class="song-duration">${song.duration}</div>
        `;
        
        li.addEventListener('click', () => {
            playSong(index);
        });
        
        playlist.appendChild(li);
    });
}

/**
 * 设置事件监听器
 */
function setupEventListeners() {
    // 播放/暂停按钮
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', togglePlayPause);
    }
    
    // 上一首/下一首按钮
    if (prevBtn) prevBtn.addEventListener('click', playPrevSong);
    if (nextBtn) nextBtn.addEventListener('click', playNextSong);
    
    // 切换播放器显示/隐藏
    if (togglePlayerBtn) togglePlayerBtn.addEventListener('click', togglePlayer);
    if (closePlayerBtn) closePlayerBtn.addEventListener('click', togglePlayer);
    
    // 迷你播放器点击展开
    if (miniPlayer) {
        miniPlayer.addEventListener('click', () => {
            if (fullPlayer && !fullPlayer.classList.contains('show')) {
                togglePlayer();
            }
        });
    }
    
    // 进度条控制
    if (progressBar) {
        progressBar.addEventListener('input', (e) => {
            if (audioPlayer && audioPlayer.duration) {
                const time = (e.target.value / 100) * audioPlayer.duration;
                audioPlayer.currentTime = time;
            }
        });
    }
    
    // 音量控制
    if (volumeBar) {
        volumeBar.addEventListener('input', (e) => {
            const volume = e.target.value / 100;
            if (audioPlayer) {
                audioPlayer.volume = volume;
                playerState.volume = e.target.value;
            }
            
            // 更新静音按钮状态
            if (muteBtn) {
                if (volume === 0) {
                    muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
                    playerState.isMuted = true;
                } else {
                    muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
                    playerState.isMuted = false;
                }
            }
        });
    }
    
    // 静音按钮
    if (muteBtn) {
        muteBtn.addEventListener('click', toggleMute);
    }
    
    // 播放列表切换按钮
    if (playlistToggleBtn) {
        playlistToggleBtn.addEventListener('click', togglePlaylist);
    }
    
    // 音频事件监听
    if (audioPlayer) {
        audioPlayer.addEventListener('loadedmetadata', () => {
            playerState.duration = audioPlayer.duration;
            if (durationEl) {
                durationEl.textContent = formatTime(audioPlayer.duration);
            }
        });
        
        audioPlayer.addEventListener('timeupdate', updateProgress);
        
        audioPlayer.addEventListener('ended', playNextSong);
        
        audioPlayer.addEventListener('play', () => {
            playerState.isPlaying = true;
            updatePlayPauseButton();
        });
        
        audioPlayer.addEventListener('pause', () => {
            playerState.isPlaying = false;
            updatePlayPauseButton();
        });
        
        // 更新歌曲信息显示
        audioPlayer.addEventListener('loadeddata', updateSongInfo);
    }
}

/**
 * 加载歌曲
 * @param {number} index - 歌曲索引
 */
function loadSong(index) {
    if (index < 0 || index >= musicLibrary.length) return;
    
    const song = musicLibrary[index];
    playerState.currentSongIndex = index;
    
    // 设置音频源
    if (audioPlayer) {
        audioPlayer.src = song.src;
    }
    
    // 更新歌曲信息
    if (currentSongTitle) currentSongTitle.textContent = song.title;
    if (currentSinger) currentSinger.textContent = `${song.singer} - ${song.album}`;
    if (miniSongTitle) miniSongTitle.textContent = `${song.title} - ${song.singer}`;
    
    // 更新专辑封面
    if (currentAlbumArt) {
        currentAlbumArt.src = song.cover;
        currentAlbumArt.alt = `${song.album}封面`;
    }
    
    // 更新播放列表高亮
    updatePlaylistHighlight();
    
    // 更新播放列表计数
    updatePlaylistCount();
}

/**
 * 播放歌曲
 * @param {number} index - 歌曲索引
 */
function playSong(index) {
    loadSong(index);
    if (audioPlayer) {
        audioPlayer.play().catch(error => {
            console.error('播放失败:', error);
        });
    }
    playerState.isPlaying = true;
    updatePlayPauseButton();
}

/**
 * 切换播放/暂停
 */
function togglePlayPause() {
    if (!audioPlayer) return;
    
    if (audioPlayer.paused) {
        audioPlayer.play().catch(error => {
            console.error('播放失败:', error);
        });
    } else {
        audioPlayer.pause();
    }
}

/**
 * 播放上一首歌曲
 */
function playPrevSong() {
    let newIndex = playerState.currentSongIndex - 1;
    if (newIndex < 0) {
        newIndex = musicLibrary.length - 1;
    }
    playSong(newIndex);
}

/**
 * 播放下一首歌曲
 */
function playNextSong() {
    let newIndex = playerState.currentSongIndex + 1;
    if (newIndex >= musicLibrary.length) {
        newIndex = 0;
    }
    playSong(newIndex);
}

/**
 * 更新播放/暂停按钮状态
 */
function updatePlayPauseButton() {
    if (!playPauseBtn) return;
    
    const icon = playPauseBtn.querySelector('i');
    if (!icon) {
        console.warn('播放/暂停按钮中没有找到图标元素');
        return;
    }
    
    if (playerState.isPlaying) {
        icon.className = 'fas fa-pause';
        playPauseBtn.title = '暂停';
    } else {
        icon.className = 'fas fa-play';
        playPauseBtn.title = '播放';
    }
}

/**
 * 切换播放器显示/隐藏
 */
function togglePlayer() {
    if (!fullPlayer) return;
    
    fullPlayer.classList.toggle('show');
    
    if (togglePlayerBtn) {
        const icon = togglePlayerBtn.querySelector('i');
        if (icon) {
            if (fullPlayer.classList.contains('show')) {
                icon.className = 'fas fa-chevron-down';
            } else {
                icon.className = 'fas fa-chevron-up';
            }
        }
    }
}

/**
 * 切换静音
 */
function toggleMute() {
    if (!audioPlayer || !muteBtn) return;
    
    if (playerState.isMuted) {
        // 取消静音
        audioPlayer.muted = false;
        muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        if (volumeBar) {
            volumeBar.value = playerState.volume;
        }
        audioPlayer.volume = playerState.volume / 100;
    } else {
        // 静音
        audioPlayer.muted = true;
        muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        if (volumeBar) {
            volumeBar.value = 0;
        }
    }
    playerState.isMuted = !playerState.isMuted;
}

/**
 * 切换播放列表显示
 */
function togglePlaylist() {
    if (playlistContainer) {
        playlistContainer.classList.toggle('show');
    }
}

/**
 * 更新播放进度
 */
function updateProgress() {
    if (!audioPlayer || !progressBar || !currentTimeEl) return;
    
    if (audioPlayer.duration) {
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressBar.value = progress;
        currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
    }
}

/**
 * 更新时间格式 (秒 -> 分:秒)
 * @param {number} seconds - 秒数
 * @returns {string} 格式化后的时间
 */
function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

/**
 * 更新歌曲信息
 */
function updateSongInfo() {
    const currentSong = musicLibrary[playerState.currentSongIndex];
    
    // 更新迷你播放器显示
    if (miniSongTitle) {
        miniSongTitle.textContent = `${currentSong.title} - ${currentSong.singer}`;
    }
    
    // 更新完整播放器显示
    if (currentSongTitle) currentSongTitle.textContent = currentSong.title;
    if (currentSinger) currentSinger.textContent = `${currentSong.singer} - ${currentSong.album}`;
    
    // 更新专辑封面
    if (currentAlbumArt) {
        currentAlbumArt.src = currentSong.cover;
    }
}

/**
 * 更新播放列表高亮
 */
function updatePlaylistHighlight() {
    if (!playlist) return;
    
    const items = playlist.querySelectorAll('.playlist-item');
    items.forEach((item, index) => {
        if (index === playerState.currentSongIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

/**
 * 更新播放列表计数
 */
function updatePlaylistCount() {
    if (playlistCount) {
        playlistCount.textContent = `${musicLibrary.length} 首歌曲`;
    }
}

/**
 * 只处理热门歌曲表格的播放按钮
 */
function setupSongCardButtons() {
    // 仅保留为热门歌曲表格中的播放按钮添加功能
    const playButtons = document.querySelectorAll('.play-btn');
    playButtons.forEach((button, index) => {
        if (index < musicLibrary.length) {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                
                // 获取歌曲索引，优先使用 data-song-index 属性
                let songIndex = button.getAttribute('data-song-index');
                if (songIndex === null || songIndex === undefined) {
                    // 如果没有 data-song-index 属性，使用 data-song 属性查找
                    const songName = button.getAttribute('data-song');
                    if (songName) {
                        songIndex = musicLibrary.findIndex(song => song.title === songName);
                    } else {
                        songIndex = index;
                    }
                }
                
                if (songIndex !== -1) {
                    playSong(parseInt(songIndex));
                    
                    // 确保播放器是展开的
                    if (fullPlayer && !fullPlayer.classList.contains('show')) {
                        togglePlayer();
                    }
                }
            });
        }
    });

}

// 页面加载完成后初始化播放器
document.addEventListener('DOMContentLoaded', () => {
    // 延迟初始化，确保DOM完全加载
    setTimeout(() => {
        const initSuccess = initMusicPlayer();
        if (initSuccess) {
            setupSongCardButtons();
        } else {
            console.error('音乐播放器初始化失败，请检查HTML结构');
        }
    }, 100);
});

// 导出函数供其他脚本使用
window.MusicPlayer = {
    playSong,
    togglePlayPause,
    playPrevSong,
    playNextSong,
    togglePlayer,
    getCurrentSong: () => musicLibrary[playerState.currentSongIndex],
    getPlayerState: () => ({...playerState}),
    getPlaylist: () => [...musicLibrary]
};