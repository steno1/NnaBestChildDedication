import React from 'react';

const MusicControls = ({ isPlaying, toggleAudio, adjustVolume, volume, audioRef }) => {
  return (
    <div className="music-controls">
      <button onClick={toggleAudio}>{isPlaying ? 'Pause Music' : 'Play Music'}</button>
      <button onClick={() => adjustVolume(0.1)}>Volume +</button>
      <button onClick={() => adjustVolume(-0.1)}>Volume -</button>
      <p className="volume-text">Volume: {(volume * 100).toFixed(0)}%</p>
      <audio ref={audioRef} src={`${process.env.PUBLIC_URL}/audio/judeNnam.mp3`} loop />
    </div>
  );
};

export default MusicControls;
