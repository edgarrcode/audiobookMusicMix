import React, { useState, useEffect, useCallback } from 'react';

// Icons as simple SVG components
const PlayIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M8 5v14l11-7z"/></svg>;
const PauseIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>;
const SkipBackIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>;
const SkipForwardIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>;
const BookmarkIcon = ({ filled }) => <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>;
const MoonIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>;
const UploadIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>;
const HeadphonesIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M12 1a9 9 0 0 0-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2a7 7 0 0 1 14 0v2h-4v8h3c1.66 0 3-1.34 3-3v-7a9 9 0 0 0-9-9z"/></svg>;
const MusicIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>;
const SparklesIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"/></svg>;
const ThumbUpIcon = ({ filled }) => <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3"/></svg>;
const ThumbDownIcon = ({ filled }) => <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M10 15v4a3 3 0 003 3l4-9V2H5.72a2 2 0 00-2 1.7l-1.38 9a2 2 0 002 2.3zm7-13h2.67A2.31 2.31 0 0122 4v7a2.31 2.31 0 01-2.33 2H17"/></svg>;
const RepeatOneIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M17 1l4 4-4 4M3 11V9a4 4 0 014-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 01-4 4H3"/><text x="11" y="14" fontSize="8" fill="currentColor" stroke="none">1</text></svg>;
const ShuffleIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/></svg>;
const SettingsIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><circle cx="12" cy="12" r="3"/><path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24"/></svg>;
const XIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M18 6L6 18M6 6l12 12"/></svg>;
const ChevronDownIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M6 9l6 6 6-6"/></svg>;

// Service logos (simplified representations)
const ServiceLogo = ({ service, selected, onClick }) => {
  const logos = {
    audible: { bg: 'bg-orange-500', text: 'A', name: 'Audible' },
    spotify: { bg: 'bg-green-500', text: 'S', name: 'Spotify' },
    apple: { bg: 'bg-gradient-to-br from-pink-500 to-red-500', text: '♫', name: 'Apple Music' },
    youtube: { bg: 'bg-red-600', text: '▶', name: 'YouTube Music' },
    mp3: { bg: 'bg-gray-600', text: '📁', name: 'MP3 File' }
  };
  const logo = logos[service];
  
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center p-3 rounded-xl transition-all ${
        selected ? 'bg-white/20 ring-2 ring-white' : 'bg-white/5 hover:bg-white/10'
      }`}
    >
      <div className={`w-12 h-12 ${logo.bg} rounded-lg flex items-center justify-center text-white font-bold text-xl mb-2`}>
        {logo.text}
      </div>
      <span className="text-xs text-gray-300">{logo.name}</span>
    </button>
  );
};

// AI Chapter Analysis Data (simulated)
const chapterAnalysis = {
  "Chapter 1: The Root": {
    mood: "Melancholic, introspective",
    themes: "Regret, endings, quiet desperation",
    tempo: "Slow",
    description: "A somber opening exploring themes of life's disappointments and the weight of unfulfilled potential.",
    suggestedGenres: ["Ambient", "Neo-classical", "Downtempo"]
  },
  "Chapter 2: A Conversation": {
    mood: "Mysterious, ethereal",
    themes: "Transition, uncertainty, hope",
    tempo: "Medium-slow",
    description: "An otherworldly encounter that shifts between confusion and dawning possibility.",
    suggestedGenres: ["Ambient electronic", "Atmospheric", "Post-rock"]
  },
  "Chapter 3: The Midnight Library": {
    mood: "Wonder, contemplative",
    themes: "Infinite possibility, choices, parallel lives",
    tempo: "Medium",
    description: "Discovery of a magical space where every path not taken still exists.",
    suggestedGenres: ["Cinematic", "Ambient", "Modern classical"]
  },
  "Chapter 4: The Library": {
    mood: "Mysterious, contemplative, with underlying tension",
    themes: "Choices, alternate possibilities, self-discovery",
    tempo: "Medium",
    description: "Exploring the library's infinite shelves, each book a different life that could have been.",
    suggestedGenres: ["Ambient electronic", "Piano ambient", "Atmospheric"]
  },
  "Chapter 5: Other Lives": {
    mood: "Adventurous, bittersweet",
    themes: "Identity, paths not taken, what-ifs",
    tempo: "Medium-upbeat",
    description: "Experiencing alternate realities and confronting the complexity of happiness.",
    suggestedGenres: ["Indie ambient", "Electronic", "Chillwave"]
  }
};

// Simulated song database by genre/mood
const songDatabase = {
  "Ambient": [
    { id: 1, title: "Weightless", artist: "Marconi Union", duration: 480, source: "spotify" },
    { id: 2, title: "An Ending (Ascent)", artist: "Brian Eno", duration: 264, source: "spotify" },
    { id: 3, title: "Quiet Night", artist: "Ólafur Arnalds", duration: 198, source: "apple" },
  ],
  "Neo-classical": [
    { id: 4, title: "Experience", artist: "Ludovico Einaudi", duration: 315, source: "spotify" },
    { id: 5, title: "Nuvole Bianche", artist: "Ludovico Einaudi", duration: 348, source: "apple" },
    { id: 6, title: "On The Nature of Daylight", artist: "Max Richter", duration: 378, source: "spotify" },
  ],
  "Ambient electronic": [
    { id: 7, title: "Intro", artist: "The xx", duration: 128, source: "spotify" },
    { id: 8, title: "Midnight", artist: "Tycho", duration: 295, source: "youtube" },
    { id: 9, title: "Glassworks", artist: "Bonobo", duration: 245, source: "spotify" },
  ],
  "Atmospheric": [
    { id: 10, title: "Time", artist: "Hans Zimmer", duration: 288, source: "apple" },
    { id: 11, title: "Arrival", artist: "Jóhann Jóhannsson", duration: 312, source: "spotify" },
    { id: 12, title: "Comptine d'un autre été", artist: "Yann Tiersen", duration: 156, source: "spotify" },
  ],
  "Piano ambient": [
    { id: 13, title: "River Flows In You", artist: "Yiruma", duration: 204, source: "youtube" },
    { id: 14, title: "Gymnopédie No.1", artist: "Erik Satie", duration: 198, source: "apple" },
    { id: 15, title: "Dawn", artist: "Dario Marianelli", duration: 276, source: "spotify" },
  ],
  "Cinematic": [
    { id: 16, title: "Now We Are Free", artist: "Hans Zimmer", duration: 264, source: "spotify" },
    { id: 17, title: "The Imitation Game", artist: "Alexandre Desplat", duration: 234, source: "apple" },
    { id: 18, title: "A Beautiful Mind", artist: "James Horner", duration: 312, source: "youtube" },
  ],
  "Downtempo": [
    { id: 19, title: "Teardrop", artist: "Massive Attack", duration: 330, source: "spotify" },
    { id: 20, title: "Porcelain", artist: "Moby", duration: 238, source: "spotify" },
    { id: 21, title: "Everything In Its Right Place", artist: "Radiohead", duration: 250, source: "apple" },
  ],
  "Post-rock": [
    { id: 22, title: "Your Hand In Mine", artist: "Explosions in the Sky", duration: 472, source: "spotify" },
    { id: 23, title: "Postcard From 1952", artist: "Explosions in the Sky", duration: 336, source: "youtube" },
  ],
  "Chillwave": [
    { id: 24, title: "Myth", artist: "Beach House", duration: 294, source: "spotify" },
    { id: 25, title: "Sanctuary", artist: "Washed Out", duration: 248, source: "apple" },
  ],
  "Electronic": [
    { id: 26, title: "Strobe", artist: "deadmau5", duration: 637, source: "spotify" },
    { id: 27, title: "Untitled", artist: "Four Tet", duration: 285, source: "youtube" },
  ],
  "Modern classical": [
    { id: 28, title: "Written on the Sky", artist: "Max Richter", duration: 264, source: "spotify" },
    { id: 29, title: "Spiegel im Spiegel", artist: "Arvo Pärt", duration: 498, source: "apple" },
  ],
};

// Generate playlist based on chapter analysis and preferences
const generatePlaylist = (chapter, preferences, musicSource) => {
  const analysis = chapterAnalysis[chapter] || chapterAnalysis["Chapter 4: The Library"];
  let songs = [];
  
  // Get songs from suggested genres
  analysis.suggestedGenres.forEach(genre => {
    if (songDatabase[genre]) {
      songs = [...songs, ...songDatabase[genre]];
    }
  });
  
  // Filter by preferences if set
  if (preferences.genres.length > 0) {
    const preferredSongs = [];
    preferences.genres.forEach(genre => {
      if (songDatabase[genre]) {
        preferredSongs.push(...songDatabase[genre]);
      }
    });
    if (preferredSongs.length > 0) {
      songs = [...songs, ...preferredSongs];
    }
  }
  
  // Filter by instrumental preference
  if (preferences.instrumentalOnly) {
    // In a real app, this would filter properly - for simulation, we keep ambient/classical
    songs = songs.filter(s => 
      !["Teardrop", "Everything In Its Right Place", "Myth"].includes(s.title)
    );
  }
  
  // Filter by source if not "all"
  if (musicSource !== 'all') {
    const sourceMap = { spotify: 'spotify', apple: 'apple', youtube: 'youtube', mp3: 'mp3' };
    songs = songs.filter(s => s.source === sourceMap[musicSource] || musicSource === 'mp3');
  }
  
  // Remove duplicates and limit to 6-8 songs
  const uniqueSongs = [...new Map(songs.map(s => [s.id, s])).values()];
  const shuffled = uniqueSongs.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(8, Math.max(6, shuffled.length)));
};

// Time formatter
const formatTime = (seconds) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  return `${m}:${s.toString().padStart(2, '0')}`;
};

// Progress bar component
const ProgressBar = ({ current, total, onChange, color }) => {
  const percentage = (current / total) * 100;
  
  return (
    <div className="relative w-full h-2 bg-white/10 rounded-full cursor-pointer group"
      onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = x / rect.width;
        onChange(percentage * total);
      }}
    >
      <div 
        className={`absolute left-0 top-0 h-full rounded-full ${color}`}
        style={{ width: `${percentage}%` }}
      />
      <div 
        className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 ${color} rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg`}
        style={{ left: `calc(${percentage}% - 8px)` }}
      />
    </div>
  );
};

// Crossfader component
const Crossfader = ({ value, onChange }) => {
  return (
    <div className="relative">
      <div className="flex justify-between text-sm text-gray-400 mb-2">
        <span className="flex items-center gap-1"><HeadphonesIcon className="w-4 h-4" /> Audiobook</span>
        <span className="flex items-center gap-1">Music <MusicIcon className="w-4 h-4" /></span>
      </div>
      <div className="relative h-12 bg-gradient-to-r from-amber-900/50 via-gray-800 to-purple-900/50 rounded-xl p-1">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-1 bg-white/20 rounded mx-4" />
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        <div 
          className="absolute top-1/2 -translate-y-1/2 w-8 h-10 bg-gradient-to-b from-gray-200 to-gray-400 rounded-lg shadow-lg border-2 border-white flex items-center justify-center"
          style={{ left: `calc(${value}% - 16px)` }}
        >
          <div className="w-1 h-6 bg-gray-600 rounded" />
        </div>
      </div>
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>{100 - value}%</span>
        <span>{value}%</span>
      </div>
    </div>
  );
};

// Preset button component
const PresetButton = ({ name, icon, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
      active 
        ? 'bg-gradient-to-r from-amber-500 to-purple-500 text-white' 
        : 'bg-white/5 hover:bg-white/10 text-gray-300'
    }`}
  >
    <span>{icon}</span>
    <span className="text-sm font-medium">{name}</span>
  </button>
);

// Bookmark item component
const BookmarkItem = ({ bookmark, onJump, onDelete }) => (
  <div className="flex items-center justify-between p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-all group">
    <button onClick={onJump} className="flex-1 text-left">
      <div className="text-sm font-medium text-white">{bookmark.name}</div>
      <div className="text-xs text-gray-400">{formatTime(bookmark.time)} • Chapter {bookmark.chapter}</div>
    </button>
    <button 
      onClick={onDelete}
      className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 p-1 transition-opacity"
    >
      ✕
    </button>
  </div>
);

// Main App Component
export default function AudiobookMixer() {
  // Audio sources state
  const [audiobookSource, setAudiobookSource] = useState('audible');
  const [musicSource, setMusicSource] = useState('spotify');
  
  // Playback state
  const [audiobookPlaying, setAudiobookPlaying] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [audiobookTime, setAudiobookTime] = useState(847); // 14:07
  const [musicTime, setMusicTime] = useState(42);
  const [audiobookSpeed, setAudiobookSpeed] = useState(1);
  const [musicSpeed, setMusicSpeed] = useState(1);
  
  // Mixer state
  const [crossfade, setCrossfade] = useState(50);
  const [masterVolume, setMasterVolume] = useState(80);
  
  // Features state
  const [activePreset, setActivePreset] = useState(null);
  const [sleepTimer, setSleepTimer] = useState(null);
  const [sleepTimeRemaining, setSleepTimeRemaining] = useState(null);
  const [showSleepModal, setShowSleepModal] = useState(false);
  const [bookmarks, setBookmarks] = useState([
    { id: 1, name: 'Interesting part', time: 423, chapter: 3 },
    { id: 2, name: 'Quote to remember', time: 1256, chapter: 5 },
  ]);
  const [showBookmarks, setShowBookmarks] = useState(false);
  
  // AI Playlist state
  const [showAIPanel, setShowAIPanel] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiPlaylist, setAiPlaylist] = useState([]);
  const [currentPlaylistIndex, setCurrentPlaylistIndex] = useState(0);
  const [loopSingle, setLoopSingle] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [songFeedback, setSongFeedback] = useState({}); // { songId: 'liked' | 'disliked' }
  const [showPreferences, setShowPreferences] = useState(false);
  const [aiPreferences, setAiPreferences] = useState({
    genres: [],
    instrumentalOnly: true,
    mood: 'any',
    tempo: 'any'
  });
  const [currentAnalysis, setCurrentAnalysis] = useState(null);
  
  // Mock data
  const audiobookData = {
    title: "The Midnight Library",
    author: "Matt Haig",
    chapter: "Chapter 4: The Library",
    duration: 9240, // ~2.5 hours
    cover: "📚"
  };
  
  const musicData = {
    title: "Weightless",
    artist: "Marconi Union",
    album: "Ambient Relaxation",
    duration: 480,
    cover: "🎵"
  };
  
  // Presets configuration
  const presets = [
    { id: 'focus', name: 'Focus Reading', icon: '📖', crossfade: 25, musicSpeed: 1 },
    { id: 'ambient', name: 'Ambient Mix', icon: '🌙', crossfade: 50, musicSpeed: 1 },
    { id: 'energize', name: 'Energize', icon: '⚡', crossfade: 60, musicSpeed: 1 },
    { id: 'sleep', name: 'Sleep Mode', icon: '😴', crossfade: 35, musicSpeed: 0.9 },
  ];
  
  // Apply preset
  const applyPreset = (preset) => {
    setActivePreset(preset.id);
    setCrossfade(preset.crossfade);
    setMusicSpeed(preset.musicSpeed);
  };
  
  // Sleep timer
  const startSleepTimer = (minutes) => {
    setSleepTimer(minutes);
    setSleepTimeRemaining(minutes * 60);
    setShowSleepModal(false);
  };
  
  // Countdown effect for sleep timer
  useEffect(() => {
    if (sleepTimeRemaining === null) return;
    if (sleepTimeRemaining <= 0) {
      setAudiobookPlaying(false);
      setMusicPlaying(false);
      setSleepTimer(null);
      setSleepTimeRemaining(null);
      return;
    }
    const interval = setInterval(() => {
      setSleepTimeRemaining(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [sleepTimeRemaining]);
  
  // Playback simulation
  useEffect(() => {
    if (!audiobookPlaying) return;
    const interval = setInterval(() => {
      setAudiobookTime(prev => Math.min(prev + audiobookSpeed, audiobookData.duration));
    }, 1000);
    return () => clearInterval(interval);
  }, [audiobookPlaying, audiobookSpeed]);
  
  useEffect(() => {
    if (!musicPlaying) return;
    const interval = setInterval(() => {
      setMusicTime(prev => {
        const duration = currentPlaylistSong ? currentPlaylistSong.duration : musicData.duration;
        const next = prev + musicSpeed;
        if (next >= duration) {
          if (aiPlaylist.length > 0) {
            // Trigger next song
            setTimeout(() => playNextSong(), 0);
            return 0;
          }
          return 0;
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [musicPlaying, musicSpeed, currentPlaylistSong, aiPlaylist.length, loopSingle, shuffle]);
  
  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT') return;
      
      switch(e.key.toLowerCase()) {
        case ' ':
          e.preventDefault();
          setAudiobookPlaying(p => !p);
          setMusicPlaying(p => !p);
          break;
        case 'a':
          setAudiobookPlaying(p => !p);
          break;
        case 'm':
          setMusicPlaying(p => !p);
          break;
        case 'arrowleft':
          setCrossfade(p => Math.max(0, p - 5));
          break;
        case 'arrowright':
          setCrossfade(p => Math.min(100, p + 5));
          break;
        case 'arrowup':
          setMasterVolume(p => Math.min(100, p + 5));
          break;
        case 'arrowdown':
          setMasterVolume(p => Math.max(0, p - 5));
          break;
        case 'b':
          addBookmark();
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [audiobookTime]);
  
  // Add bookmark
  const addBookmark = () => {
    const newBookmark = {
      id: Date.now(),
      name: `Bookmark ${bookmarks.length + 1}`,
      time: audiobookTime,
      chapter: 4
    };
    setBookmarks([...bookmarks, newBookmark]);
  };
  
  // AI Analysis function
  const analyzeChapter = () => {
    setIsAnalyzing(true);
    setShowAIPanel(true);
    
    // Simulate AI analysis delay
    setTimeout(() => {
      const analysis = chapterAnalysis[audiobookData.chapter] || chapterAnalysis["Chapter 4: The Library"];
      setCurrentAnalysis(analysis);
      const playlist = generatePlaylist(audiobookData.chapter, aiPreferences, musicSource);
      setAiPlaylist(playlist);
      setCurrentPlaylistIndex(0);
      setIsAnalyzing(false);
      
      // Auto-load first song into music player
      if (playlist.length > 0) {
        setMusicTime(0);
      }
    }, 2000);
  };
  
  // Playlist navigation
  const playNextSong = () => {
    if (loopSingle) {
      setMusicTime(0);
      return;
    }
    
    let nextIndex;
    if (shuffle) {
      nextIndex = Math.floor(Math.random() * aiPlaylist.length);
    } else {
      nextIndex = (currentPlaylistIndex + 1) % aiPlaylist.length;
    }
    
    // Skip disliked songs
    let attempts = 0;
    while (songFeedback[aiPlaylist[nextIndex]?.id] === 'disliked' && attempts < aiPlaylist.length) {
      nextIndex = (nextIndex + 1) % aiPlaylist.length;
      attempts++;
    }
    
    setCurrentPlaylistIndex(nextIndex);
    setMusicTime(0);
  };
  
  const playPreviousSong = () => {
    const prevIndex = currentPlaylistIndex === 0 ? aiPlaylist.length - 1 : currentPlaylistIndex - 1;
    setCurrentPlaylistIndex(prevIndex);
    setMusicTime(0);
  };
  
  const playSongAtIndex = (index) => {
    setCurrentPlaylistIndex(index);
    setMusicTime(0);
    setMusicPlaying(true);
  };
  
  // Song feedback
  const toggleFeedback = (songId, type) => {
    setSongFeedback(prev => ({
      ...prev,
      [songId]: prev[songId] === type ? null : type
    }));
  };
  
  // Toggle genre preference
  const toggleGenrePreference = (genre) => {
    setAiPreferences(prev => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter(g => g !== genre)
        : [...prev.genres, genre]
    }));
  };
  
  // Get current playlist song
  const currentPlaylistSong = aiPlaylist[currentPlaylistIndex];
  
  // Calculate volumes based on crossfade
  const audiobookVolume = ((100 - crossfade) / 100) * (masterVolume / 100);
  const musicVolume = (crossfade / 100) * (masterVolume / 100);
  
  // Get current music data (from AI playlist or default)
  const currentMusicData = currentPlaylistSong ? {
    title: currentPlaylistSong.title,
    artist: currentPlaylistSong.artist,
    album: "AI Suggested",
    duration: currentPlaylistSong.duration,
    cover: "🎵"
  } : musicData;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-purple-600 rounded-xl flex items-center justify-center">
              <HeadphonesIcon />
            </div>
            <div>
              <h1 className="text-2xl font-bold">AudioMix</h1>
              <p className="text-sm text-gray-400">Audiobook + Music Mixer</p>
            </div>
          </div>
          
          {/* Sleep Timer & Master Volume */}
          <div className="flex items-center gap-4">
            {sleepTimeRemaining && (
              <div className="flex items-center gap-2 px-3 py-1 bg-indigo-500/20 rounded-full">
                <MoonIcon />
                <span className="text-sm">{formatTime(sleepTimeRemaining)}</span>
                <button 
                  onClick={() => { setSleepTimer(null); setSleepTimeRemaining(null); }}
                  className="text-red-400 hover:text-red-300"
                >✕</button>
              </div>
            )}
            <button 
              onClick={() => setShowSleepModal(true)}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all"
              title="Sleep Timer"
            >
              <MoonIcon />
            </button>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">Master</span>
              <input
                type="range"
                min="0"
                max="100"
                value={masterVolume}
                onChange={(e) => setMasterVolume(parseInt(e.target.value))}
                className="w-20 accent-purple-500"
              />
              <span className="text-xs w-8">{masterVolume}%</span>
            </div>
          </div>
        </div>
        
        {/* Keyboard Shortcuts Help */}
        <div className="mb-6 p-3 bg-white/5 rounded-lg text-xs text-gray-400 flex flex-wrap gap-4">
          <span><kbd className="px-1 bg-white/10 rounded">Space</kbd> Play/Pause All</span>
          <span><kbd className="px-1 bg-white/10 rounded">A</kbd> Toggle Audiobook</span>
          <span><kbd className="px-1 bg-white/10 rounded">M</kbd> Toggle Music</span>
          <span><kbd className="px-1 bg-white/10 rounded">←→</kbd> Crossfade</span>
          <span><kbd className="px-1 bg-white/10 rounded">↑↓</kbd> Volume</span>
          <span><kbd className="px-1 bg-white/10 rounded">B</kbd> Bookmark</span>
        </div>
        
        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Audiobook Panel */}
          <div className="bg-gradient-to-br from-amber-900/30 to-amber-800/10 rounded-2xl p-6 border border-amber-500/20">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <HeadphonesIcon /> Audiobook
              </h2>
              <div className="text-xs px-2 py-1 bg-amber-500/20 rounded-full text-amber-300">
                Vol: {Math.round(audiobookVolume * 100)}%
              </div>
            </div>
            
            {/* Source Selection */}
            <div className="flex gap-3 mb-4 overflow-x-auto p-1 -m-1">
              <ServiceLogo service="audible" selected={audiobookSource === 'audible'} onClick={() => setAudiobookSource('audible')} />
              <ServiceLogo service="mp3" selected={audiobookSource === 'mp3'} onClick={() => setAudiobookSource('mp3')} />
            </div>
            
            {/* Now Playing */}
            <div className="flex gap-4 mb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-600 to-orange-700 rounded-xl flex items-center justify-center text-4xl shadow-lg">
                {audiobookData.cover}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white">{audiobookData.title}</h3>
                <p className="text-sm text-gray-400">{audiobookData.author}</p>
                <p className="text-xs text-amber-400 mt-1">{audiobookData.chapter}</p>
              </div>
            </div>
            
            {/* Progress */}
            <div className="mb-4">
              <ProgressBar 
                current={audiobookTime} 
                total={audiobookData.duration} 
                onChange={setAudiobookTime}
                color="bg-gradient-to-r from-amber-500 to-orange-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>{formatTime(audiobookTime)}</span>
                <span>{formatTime(audiobookData.duration)}</span>
              </div>
            </div>
            
            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mb-4">
              <button 
                onClick={() => setAudiobookTime(Math.max(0, audiobookTime - 30))}
                className="p-2 hover:bg-white/10 rounded-full transition-all"
              >
                <SkipBackIcon />
              </button>
              <button 
                onClick={() => setAudiobookPlaying(!audiobookPlaying)}
                className="w-14 h-14 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
              >
                {audiobookPlaying ? <PauseIcon /> : <PlayIcon />}
              </button>
              <button 
                onClick={() => setAudiobookTime(Math.min(audiobookData.duration, audiobookTime + 30))}
                className="p-2 hover:bg-white/10 rounded-full transition-all"
              >
                <SkipForwardIcon />
              </button>
            </div>
            
            {/* Speed & Bookmark */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">Speed:</span>
                {[0.75, 1, 1.25, 1.5, 2].map(speed => (
                  <button
                    key={speed}
                    onClick={() => setAudiobookSpeed(speed)}
                    className={`px-2 py-1 text-xs rounded ${
                      audiobookSpeed === speed 
                        ? 'bg-amber-500 text-white' 
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    {speed}x
                  </button>
                ))}
              </div>
              <button 
                onClick={addBookmark}
                className="p-2 hover:bg-white/10 rounded-full transition-all text-amber-400"
                title="Add Bookmark (B)"
              >
                <BookmarkIcon />
              </button>
            </div>
          </div>
          
          {/* Music Panel */}
          <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/10 rounded-2xl p-6 border border-purple-500/20">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <MusicIcon /> Music
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={analyzeChapter}
                  className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 rounded-lg text-sm font-medium transition-all"
                >
                  <SparklesIcon /> AI Suggest
                </button>
                <div className="text-xs px-2 py-1 bg-purple-500/20 rounded-full text-purple-300">
                  Vol: {Math.round(musicVolume * 100)}%
                </div>
              </div>
            </div>
            
            {/* Source Selection */}
            <div className="flex gap-3 mb-4 overflow-x-auto p-1 -m-1">
              <ServiceLogo service="spotify" selected={musicSource === 'spotify'} onClick={() => setMusicSource('spotify')} />
              <ServiceLogo service="apple" selected={musicSource === 'apple'} onClick={() => setMusicSource('apple')} />
              <ServiceLogo service="youtube" selected={musicSource === 'youtube'} onClick={() => setMusicSource('youtube')} />
              <ServiceLogo service="mp3" selected={musicSource === 'mp3'} onClick={() => setMusicSource('mp3')} />
            </div>
            
            {/* Now Playing */}
            <div className="flex gap-4 mb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-700 rounded-xl flex items-center justify-center text-4xl shadow-lg relative">
                {currentMusicData.cover}
                {aiPlaylist.length > 0 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full flex items-center justify-center">
                    <SparklesIcon className="w-3 h-3" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white">{currentMusicData.title}</h3>
                <p className="text-sm text-gray-400">{currentMusicData.artist}</p>
                <p className="text-xs text-purple-400 mt-1">{currentMusicData.album}</p>
                {aiPlaylist.length > 0 && (
                  <p className="text-xs text-fuchsia-400 mt-1">
                    Track {currentPlaylistIndex + 1} of {aiPlaylist.length}
                  </p>
                )}
              </div>
            </div>
            
            {/* Progress */}
            <div className="mb-4">
              <ProgressBar 
                current={musicTime} 
                total={currentMusicData.duration} 
                onChange={setMusicTime}
                color="bg-gradient-to-r from-purple-500 to-pink-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>{formatTime(musicTime)}</span>
                <span>{formatTime(currentMusicData.duration)}</span>
              </div>
            </div>
            
            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mb-4">
              <button 
                onClick={aiPlaylist.length > 0 ? playPreviousSong : () => setMusicTime(Math.max(0, musicTime - 10))}
                className="p-2 hover:bg-white/10 rounded-full transition-all"
              >
                <SkipBackIcon />
              </button>
              <button 
                onClick={() => setMusicPlaying(!musicPlaying)}
                className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
              >
                {musicPlaying ? <PauseIcon /> : <PlayIcon />}
              </button>
              <button 
                onClick={aiPlaylist.length > 0 ? playNextSong : () => setMusicTime(Math.min(currentMusicData.duration, musicTime + 10))}
                className="p-2 hover:bg-white/10 rounded-full transition-all"
              >
                <SkipForwardIcon />
              </button>
            </div>
            
            {/* Playlist Controls (when AI playlist active) */}
            {aiPlaylist.length > 0 && (
              <div className="flex items-center justify-center gap-3 mb-4">
                <button
                  onClick={() => setLoopSingle(!loopSingle)}
                  className={`p-2 rounded-lg transition-all ${loopSingle ? 'bg-fuchsia-500/30 text-fuchsia-300' : 'hover:bg-white/10 text-gray-400'}`}
                  title="Loop current song"
                >
                  <RepeatOneIcon />
                </button>
                <button
                  onClick={() => setShuffle(!shuffle)}
                  className={`p-2 rounded-lg transition-all ${shuffle ? 'bg-fuchsia-500/30 text-fuchsia-300' : 'hover:bg-white/10 text-gray-400'}`}
                  title="Shuffle playlist"
                >
                  <ShuffleIcon />
                </button>
                <button
                  onClick={() => setShowAIPanel(true)}
                  className="p-2 rounded-lg hover:bg-white/10 text-gray-400 transition-all"
                  title="View playlist"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                    <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>
                  </svg>
                </button>
              </div>
            )}
            
            {/* Speed */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">Speed:</span>
              {[0.8, 0.9, 1, 1.1, 1.2].map(speed => (
                <button
                  key={speed}
                  onClick={() => setMusicSpeed(speed)}
                  className={`px-2 py-1 text-xs rounded ${
                    musicSpeed === speed 
                      ? 'bg-purple-500 text-white' 
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                >
                  {speed}x
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Crossfader */}
        <div className="bg-white/5 rounded-2xl p-6 mb-6 border border-white/10">
          <h2 className="text-lg font-semibold mb-4 text-center">Mix Control</h2>
          <Crossfader value={crossfade} onChange={(v) => { setCrossfade(v); setActivePreset(null); }} />
        </div>
        
        {/* Presets */}
        <div className="bg-white/5 rounded-2xl p-6 mb-6 border border-white/10">
          <h2 className="text-lg font-semibold mb-4">Quick Presets</h2>
          <div className="flex flex-wrap gap-3">
            {presets.map(preset => (
              <PresetButton
                key={preset.id}
                name={preset.name}
                icon={preset.icon}
                active={activePreset === preset.id}
                onClick={() => applyPreset(preset)}
              />
            ))}
          </div>
        </div>
        
        {/* Bookmarks */}
        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <BookmarkIcon filled /> Bookmarks
            </h2>
            <button 
              onClick={() => setShowBookmarks(!showBookmarks)}
              className="text-sm text-purple-400 hover:text-purple-300"
            >
              {showBookmarks ? 'Hide' : 'Show'} ({bookmarks.length})
            </button>
          </div>
          
          {showBookmarks && (
            <div className="space-y-2">
              {bookmarks.length === 0 ? (
                <p className="text-gray-400 text-sm">No bookmarks yet. Press B to add one!</p>
              ) : (
                bookmarks.map(bookmark => (
                  <BookmarkItem
                    key={bookmark.id}
                    bookmark={bookmark}
                    onJump={() => setAudiobookTime(bookmark.time)}
                    onDelete={() => setBookmarks(bookmarks.filter(b => b.id !== bookmark.id))}
                  />
                ))
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Sleep Timer Modal */}
      {showSleepModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <MoonIcon /> Sleep Timer
            </h3>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[15, 30, 45, 60, 90, 120].map(mins => (
                <button
                  key={mins}
                  onClick={() => startSleepTimer(mins)}
                  className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all"
                >
                  {mins} min
                </button>
              ))}
            </div>
            <button 
              onClick={() => setShowSleepModal(false)}
              className="w-full p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      
      {/* AI Suggestions Panel */}
      {showAIPanel && (
        <div className="fixed inset-0 bg-black/50 flex items-end md:items-center justify-center z-50">
          <div className="bg-gray-900 rounded-t-2xl md:rounded-2xl w-full max-w-lg max-h-[85vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-lg flex items-center justify-center">
                  <SparklesIcon />
                </div>
                <h3 className="text-lg font-semibold">AI Music Suggestions</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowPreferences(!showPreferences)}
                  className={`p-2 rounded-lg transition-all ${showPreferences ? 'bg-white/20' : 'hover:bg-white/10'}`}
                >
                  <SettingsIcon />
                </button>
                <button
                  onClick={() => setShowAIPanel(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-all"
                >
                  <XIcon />
                </button>
              </div>
            </div>
            
            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {isAnalyzing ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-16 h-16 border-4 border-fuchsia-500/30 border-t-fuchsia-500 rounded-full animate-spin mb-4" />
                  <p className="text-gray-400">Analyzing chapter mood and themes...</p>
                </div>
              ) : (
                <>
                  {/* Preferences Panel */}
                  {showPreferences && (
                    <div className="mb-6 p-4 bg-white/5 rounded-xl border border-white/10">
                      <h4 className="font-medium mb-3 flex items-center gap-2">
                        <SettingsIcon /> Preferences
                      </h4>
                      
                      {/* Instrumental Toggle */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-gray-300">Instrumental only</span>
                        <button
                          onClick={() => setAiPreferences(p => ({ ...p, instrumentalOnly: !p.instrumentalOnly }))}
                          className={`w-12 h-6 rounded-full transition-all ${aiPreferences.instrumentalOnly ? 'bg-fuchsia-500' : 'bg-gray-600'}`}
                        >
                          <div className={`w-5 h-5 bg-white rounded-full transition-transform ${aiPreferences.instrumentalOnly ? 'translate-x-6' : 'translate-x-0.5'}`} />
                        </button>
                      </div>
                      
                      {/* Genre Preferences */}
                      <div className="mb-3">
                        <span className="text-sm text-gray-400 block mb-2">Preferred genres</span>
                        <div className="flex flex-wrap gap-2">
                          {['Ambient', 'Neo-classical', 'Piano ambient', 'Cinematic', 'Electronic', 'Downtempo', 'Post-rock'].map(genre => (
                            <button
                              key={genre}
                              onClick={() => toggleGenrePreference(genre)}
                              className={`px-3 py-1 text-xs rounded-full transition-all ${
                                aiPreferences.genres.includes(genre)
                                  ? 'bg-fuchsia-500 text-white'
                                  : 'bg-white/10 hover:bg-white/20 text-gray-300'
                              }`}
                            >
                              {genre}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      {/* Re-analyze button */}
                      <button
                        onClick={analyzeChapter}
                        className="w-full mt-2 px-4 py-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-lg text-sm font-medium hover:from-violet-600 hover:to-fuchsia-600 transition-all"
                      >
                        Re-analyze with preferences
                      </button>
                    </div>
                  )}
                  
                  {/* Chapter Analysis */}
                  {currentAnalysis && (
                    <div className="mb-6 p-4 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 rounded-xl border border-fuchsia-500/20">
                      <h4 className="font-medium mb-2 text-fuchsia-300">{audiobookData.chapter}</h4>
                      <p className="text-sm text-gray-300 mb-3">{currentAnalysis.description}</p>
                      <div className="flex flex-wrap gap-2 text-xs">
                        <span className="px-2 py-1 bg-white/10 rounded-full">🎭 {currentAnalysis.mood}</span>
                        <span className="px-2 py-1 bg-white/10 rounded-full">🎵 {currentAnalysis.tempo}</span>
                      </div>
                    </div>
                  )}
                  
                  {/* Playlist */}
                  <div>
                    <h4 className="font-medium mb-3 flex items-center justify-between">
                      <span>Suggested Playlist</span>
                      <span className="text-xs text-gray-400">{aiPlaylist.length} tracks</span>
                    </h4>
                    <div className="space-y-2">
                      {aiPlaylist.map((song, index) => (
                        <div
                          key={song.id}
                          className={`flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer ${
                            index === currentPlaylistIndex
                              ? 'bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 border border-fuchsia-500/30'
                              : songFeedback[song.id] === 'disliked'
                              ? 'bg-red-500/10 opacity-50'
                              : 'bg-white/5 hover:bg-white/10'
                          }`}
                          onClick={() => playSongAtIndex(index)}
                        >
                          {/* Track number / playing indicator */}
                          <div className="w-8 h-8 flex items-center justify-center">
                            {index === currentPlaylistIndex && musicPlaying ? (
                              <div className="flex items-end gap-0.5 h-4">
                                <div className="w-1 bg-fuchsia-400 animate-pulse" style={{ height: '100%' }} />
                                <div className="w-1 bg-fuchsia-400 animate-pulse" style={{ height: '60%', animationDelay: '0.2s' }} />
                                <div className="w-1 bg-fuchsia-400 animate-pulse" style={{ height: '80%', animationDelay: '0.4s' }} />
                              </div>
                            ) : (
                              <span className="text-sm text-gray-500">{index + 1}</span>
                            )}
                          </div>
                          
                          {/* Song info */}
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{song.title}</p>
                            <p className="text-xs text-gray-400 truncate">{song.artist}</p>
                          </div>
                          
                          {/* Duration */}
                          <span className="text-xs text-gray-500">{formatTime(song.duration)}</span>
                          
                          {/* Feedback buttons */}
                          <div className="flex items-center gap-1">
                            <button
                              onClick={(e) => { e.stopPropagation(); toggleFeedback(song.id, 'liked'); }}
                              className={`p-1.5 rounded-lg transition-all ${
                                songFeedback[song.id] === 'liked'
                                  ? 'bg-green-500/20 text-green-400'
                                  : 'hover:bg-white/10 text-gray-500'
                              }`}
                            >
                              <ThumbUpIcon filled={songFeedback[song.id] === 'liked'} />
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); toggleFeedback(song.id, 'disliked'); }}
                              className={`p-1.5 rounded-lg transition-all ${
                                songFeedback[song.id] === 'disliked'
                                  ? 'bg-red-500/20 text-red-400'
                                  : 'hover:bg-white/10 text-gray-500'
                              }`}
                            >
                              <ThumbDownIcon filled={songFeedback[song.id] === 'disliked'} />
                            </button>
                          </div>
                          
                          {/* Source indicator */}
                          <div className={`w-6 h-6 rounded flex items-center justify-center text-xs ${
                            song.source === 'spotify' ? 'bg-green-500/20 text-green-400' :
                            song.source === 'apple' ? 'bg-pink-500/20 text-pink-400' :
                            song.source === 'youtube' ? 'bg-red-500/20 text-red-400' :
                            'bg-gray-500/20 text-gray-400'
                          }`}>
                            {song.source === 'spotify' ? 'S' :
                             song.source === 'apple' ? '♫' :
                             song.source === 'youtube' ? '▶' : '📁'}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Liked songs summary */}
                  {Object.values(songFeedback).filter(f => f === 'liked').length > 0 && (
                    <div className="mt-4 p-3 bg-green-500/10 rounded-xl border border-green-500/20">
                      <p className="text-sm text-green-400">
                        ❤️ {Object.values(songFeedback).filter(f => f === 'liked').length} liked songs saved to favorites
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
            
            {/* Footer */}
            {!isAnalyzing && aiPlaylist.length > 0 && (
              <div className="p-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setLoopSingle(!loopSingle)}
                    className={`p-2 rounded-lg transition-all ${loopSingle ? 'bg-fuchsia-500/30 text-fuchsia-300' : 'bg-white/10 text-gray-400'}`}
                  >
                    <RepeatOneIcon />
                  </button>
                  <button
                    onClick={() => setShuffle(!shuffle)}
                    className={`p-2 rounded-lg transition-all ${shuffle ? 'bg-fuchsia-500/30 text-fuchsia-300' : 'bg-white/10 text-gray-400'}`}
                  >
                    <ShuffleIcon />
                  </button>
                </div>
                <button
                  onClick={() => { setMusicPlaying(true); setShowAIPanel(false); }}
                  className="px-6 py-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-lg font-medium hover:from-violet-600 hover:to-fuchsia-600 transition-all"
                >
                  Play Playlist
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
