import React, { useState, useEffect, useRef } from "react";
import AudioControls from "./AudioControls";
import "./index.css";
import sound from '../../../data/sound';


const AudioPlayer = ({tracks}) => {

  // State
  const [trackIndex, setTrackIndex] = useState(0);
  const [albumIndex, setAlbumIndex] = useState(0);
  const [albumCategory, setAlbumCategory] = useState('main');
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Destructure for conciseness
  const { tracklist } = sound.fibonacci.main[albumIndex];
  const { title, audioSrc } = tracklist[trackIndex];

  // Refs
  const audioRef = useRef(new Audio(audioSrc));
  const intervalRef = useRef();
  const isReady = useRef(false);


  // Destructure for conciseness
  const { duration } = audioRef.current;

  const currentPercentage = duration
    ? `${(trackProgress / duration) * 100}%`
    : "0%";
  const trackStyling = `
    -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))
  `;

  const startTimer = () => {
    // Clear any timers already running
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        toNextTrack();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, [1000]);
  };

  const onScrub = (value) => {
    // Clear any timers already running
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
  };

  const onScrubEnd = () => {
    // If not already playing, start
    if (!isPlaying) {
      setIsPlaying(true);
    }
    startTimer();
  };

  const toPrevTrack = () => {
    if (trackIndex > 0) {
      let newTrack = trackIndex - 1;
      setTrackIndex(newTrack);
    } else {
      let newAlbum = albumIndex - 1;
      setAlbumIndex(newAlbum);
      setTrackIndex(tracklist.length - 1);
    }
    console.log(trackIndex)
    console.log(albumIndex);
  };

  const toNextTrack = () => {
    if (trackIndex < tracklist.length - 1) {
      let newTrack = trackIndex + 1;
      setTrackIndex(newTrack);
    } else {
      let newAlbum = albumIndex + 1;
      setAlbumIndex(newAlbum);
      setTrackIndex(0);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      audioRef.current.pause();
    }
    if (document.querySelector('video') !== null){
      var pgvideo = document.querySelector('video');
      if (pgvideo.currentTime !== 0){
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Handles cleanup and setup when changing tracks
  useEffect(() => {
    audioRef.current.pause();

    audioRef.current = new Audio(audioSrc);
    setTrackProgress(audioRef.current.currentTime);

    if (isReady.current) {
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    } else {
      // Set the isReady ref as true for the next pass
      isReady.current = true;
    }
  }, [trackIndex]);

  useEffect(() => {
    // Pause and clean up on unmount
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="audio-player">
      <div className="track-info">
        <AudioControls
          isPlaying={isPlaying}
          onPrevClick={toPrevTrack}
          onNextClick={toNextTrack}
          onPlayPauseClick={setIsPlaying}
        />
        <div className="trackname">
        {title}
        </div>
      </div>
    
      <div className="progress-container">
        <input
          type="range"
          value={trackProgress}
          step="1"
          min="0"
          max={duration ? duration : `${duration}`}
          className="progress"
          onChange={(e) => onScrub(e.target.value)}
          onMouseUp={onScrubEnd}
          onKeyUp={onScrubEnd}
          style={{ background: trackStyling }}
        />
        </div>  
      </div>

  );
};

export default AudioPlayer;

//<img
//className="artwork"
//src={image}
//alt={`track artwork for ${title} by ${artist}`}
///>

//<Backdrop
//        trackIndex={trackIndex}
//        activeColor={color}
//        isPlaying={isPlaying}
//      />
