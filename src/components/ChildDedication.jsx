import React, { useState, useEffect, useRef } from 'react';
import './ChildDedication.css';
import MusicControls from './MusicControls';

const eventDate = new Date('April 20, 2025 09:00:00').getTime();

function calculateTimeLeft() {
  const now = new Date().getTime();
  const difference = eventDate - now;

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((difference % (1000 * 60)) / 1000),
  };
}

const ChildDedication = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [balloons, setBalloons] = useState([]);
  const audioRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const spawnBalloons = () => {
      setBalloons((prevBalloons) => [
        ...prevBalloons.filter((b) => b.top > -10),
        {
          id: Math.random(),
          left: Math.random() < 0.5 ? `${Math.random() * 20}vw` : `${80 + Math.random() * 20}vw`,
          top: 100,
          opacity: 0.6,
          size: `${Math.random() * 30 + 20}px`,
          color: ['#ff9999', '#ffcc99', '#ff66b2'][Math.floor(Math.random() * 3)],
        },
      ]);
    };
    const interval = setInterval(spawnBalloons, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const moveBalloons = setInterval(() => {
      setBalloons((prevBalloons) =>
        prevBalloons.map((b) => ({ ...b, top: b.top - 2 }))
      );
    }, 50);
    return () => clearInterval(moveBalloons);
  }, []);

  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const adjustVolume = (change) => {
    let newVolume = Math.min(1, Math.max(0, volume + change));
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  return (
    <>
      <div className="dedication-container">
        <div className="balloon-container">
          {balloons.map((balloon) => (
            <div
              key={balloon.id}
              className="balloon"
              style={{
                left: balloon.left,
                top: `${balloon.top}%`,
                opacity: balloon.opacity,
                width: balloon.size,
                height: balloon.size,
                backgroundColor: balloon.color,
              }}
            />
          ))}
        </div>

        <header className="dedication-header">
          <img
            src={`${process.env.PUBLIC_URL}/images/NnabestBaby.jpg`}
            alt="Baby Jesse"
            className="baby-image"
          />
          <h1>Chigozirim Jesse Goes To Church</h1>
          <p className="invitation-text">Special Invitation</p>
        </header>

        <section className="dedication-details">
          <p className="host-names">
            <strong>Engr Okebaram Nnamdi (Nnabest) And Mrs Ifeyinwa E. Okebaram</strong>
          </p>
          <p>Joyfully invite you to the Thanksgiving Mass and Child Dedication of their beloved Son</p>
          <h2 className="child-name">Master Jesse Chigozirim Anayochukwu</h2>

          <p className="event-details"><strong>📍 Venue:</strong> St Mary's Catholic Church, Umuaka, Njaba LGA, Imo State</p>
          <p className="event-details"><strong>📅 Date:</strong> Sunday, April 20, 2025</p>
          <p className="event-details"><strong>⏰ Time:</strong> 9:00 AM Mass</p>

          <div className="countdown-timer">
            <p>Countdown to Dedication:</p>
            <div className="timer">
              <span>{timeLeft.days}d</span> : 
              <span>{timeLeft.hours}h</span> : 
              <span>{timeLeft.minutes}m</span> : 
              <span>{timeLeft.seconds}s</span>
            </div>
          </div>
        </section>

        {/* Music Controls */}
        <MusicControls 
          isPlaying={isPlaying} 
          toggleAudio={toggleAudio} 
          adjustVolume={adjustVolume} 
          volume={volume} 
          audioRef={audioRef} 
        />
      </div>

      <footer className="footer">Designed by Princeley</footer>
    </>
  );
};

export default ChildDedication;
