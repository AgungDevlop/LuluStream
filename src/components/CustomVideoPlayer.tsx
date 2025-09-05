import React, { useState, useRef, useEffect } from 'react';
import { 
  FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaExpand, FaCompress, 
  FaShareAlt, FaFacebook, FaTwitter, FaWhatsapp, FaTelegram, FaCopy 
} from 'react-icons/fa';

interface CustomVideoPlayerProps {
  src: string;
  title: string;
  randomUrls: string[];
}

const CustomVideoPlayer: React.FC<CustomVideoPlayerProps> = ({ src, title, randomUrls }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isControlsVisible, setIsControlsVisible] = useState(true);
  const [isSharePanelOpen, setIsSharePanelOpen] = useState(false);
  let controlsTimeout: NodeJS.Timeout;

  // --- LOGIKA UTAMA UNTUK DIRECT LINK ---

  const triggerDirectLink = () => {
    const COOLDOWN_SECONDS = 15;
    const cooldownMilliseconds = COOLDOWN_SECONDS * 1000;
    
    const lastAdClickTimestamp = sessionStorage.getItem('lastAdClickTimestamp');

    const openRandomDirectLink = () => {
      if (randomUrls && randomUrls.length > 0) {
        const randomUrl = randomUrls[Math.floor(Math.random() * randomUrls.length)];
        window.open(randomUrl, '_blank');
        sessionStorage.setItem('lastAdClickTimestamp', Date.now().toString());
      }
    };

    if (!lastAdClickTimestamp) {
      openRandomDirectLink();
    } else {
      const timeSinceLastClick = Date.now() - parseInt(lastAdClickTimestamp, 10);
      if (timeSinceLastClick > cooldownMilliseconds) {
        openRandomDirectLink();
      }
    }
  };

  // --- FUNGSI KONTROL PEMUTAR ---

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  // <-- PERUBAHAN: Handler terpusat untuk semua aksi Play/Pause + Direct Link
  const handleMainInteraction = () => {
    togglePlayPause();
    triggerDirectLink();
  };
  
  const handleProgressInteraction = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const newTime = (Number(e.target.value) / 100) * duration;
      videoRef.current.currentTime = newTime;
    }
    triggerDirectLink();
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const newVolume = Number(e.target.value);
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
        videoRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
        containerRef.current?.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
  };

  const handleMouseMove = () => {
    setIsControlsVisible(true);
    clearTimeout(controlsTimeout);
    if (isPlaying) {
      controlsTimeout = setTimeout(() => setIsControlsVisible(false), 3000);
    }
  };
  
  const shareUrl = window.location.href;
  const shareTitle = title;
  const handleShare = (platform: 'facebook' | 'twitter' | 'whatsapp' | 'telegram') => { let url = ''; switch (platform) { case 'facebook': url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`; break; case 'twitter': url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`; break; case 'whatsapp': url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}`; break; case 'telegram': url = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`; break; } window.open(url, '_blank'); setIsSharePanelOpen(false); };
  const handleCopyLink = () => { navigator.clipboard.writeText(shareUrl); alert('Link copied to clipboard!'); setIsSharePanelOpen(false); };
  useEffect(() => { const video = videoRef.current; if (video) { video.play().catch(() => setIsPlaying(false)); const setVideoDuration = () => setDuration(video.duration); video.addEventListener('loadedmetadata', setVideoDuration); const onFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement); document.addEventListener('fullscreenchange', onFullscreenChange); return () => { video.removeEventListener('loadedmetadata', setVideoDuration); document.removeEventListener('fullscreenchange', onFullscreenChange); } } }, [src]);

  return (
    <div 
        ref={containerRef} 
        className="relative w-full aspect-video bg-black cursor-pointer" // <-- Menambahkan cursor-pointer di sini
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
            clearTimeout(controlsTimeout);
            if(isPlaying) setIsControlsVisible(false);
        }}
    >
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full"
        onClick={handleMainInteraction} // <-- PERUBAHAN: Pemicu direct link ditambahkan kembali ke video utama
        onTimeUpdate={handleTimeUpdate}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onContextMenu={(e) => e.preventDefault()}
        controlsList="nodownload"
      />
      
      {/* ========================================================== */}
      {/* PERUBAHAN BARU: Tombol Play/Pause di tengah video */}
      {/* ========================================================== */}
      {!isPlaying && (
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-black/50 p-4 rounded-full transition-transform hover:scale-110"
            onClick={handleMainInteraction} // Menggunakan handler yang sama
          >
            <FaPlay size={40} className="text-white ml-1" />
          </div>
      )}

      <div className="absolute top-3 right-3 bg-blue-600 text-white text-sm font-bold px-2 py-1 rounded-md pointer-events-none">
        LuluStream
      </div>
      
      {isSharePanelOpen && (
        <div className="absolute bottom-16 right-4 bg-slate-800 p-3 rounded-lg shadow-lg z-20 flex items-center gap-3">
            <button onClick={() => handleShare('facebook')} className="p-2 rounded-full hover:bg-slate-700 transition-colors"><FaFacebook size={22} className="text-blue-600" /></button>
            <button onClick={() => handleShare('twitter')} className="p-2 rounded-full hover:bg-slate-700 transition-colors"><FaTwitter size={22} className="text-sky-500" /></button>
            <button onClick={() => handleShare('whatsapp')} className="p-2 rounded-full hover:bg-slate-700 transition-colors"><FaWhatsapp size={22} className="text-green-500" /></button>
            <button onClick={() => handleShare('telegram')} className="p-2 rounded-full hover:bg-slate-700 transition-colors"><FaTelegram size={22} className="text-sky-400" /></button>
            <div className="w-px h-6 bg-slate-600"></div>
            <button onClick={handleCopyLink} className="p-2 rounded-full hover:bg-slate-700 transition-colors"><FaCopy size={20} className="text-slate-300" /></button>
        </div>
      )}

      <div className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300 ${isControlsVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleProgressInteraction}
          className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer range-sm"
        />
        <div className="flex items-center justify-between text-white mt-2">
          <div className="flex items-center gap-4">
            <button onClick={handleMainInteraction}>
              {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
            </button>
            <div className="flex items-center gap-2">
                <button onClick={toggleMute}>{isMuted || volume === 0 ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}</button>
                <input type="range" min="0" max="1" step="0.1" value={volume} onChange={handleVolumeChange} className="w-20 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
            <button onClick={() => setIsSharePanelOpen(!isSharePanelOpen)} className={`transition-colors ${isSharePanelOpen ? 'text-blue-400' : 'hover:text-blue-400'}`}><FaShareAlt size={20} /></button>
            <button onClick={toggleFullscreen}>{isFullscreen ? <FaCompress size={20} /> : <FaExpand size={20} />}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomVideoPlayer;