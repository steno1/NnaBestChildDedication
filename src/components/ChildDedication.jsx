import React, { useState, useEffect } from 'react';
import './ChildDedication.css';

const eventDate = new Date('April 6, 2025 09:00:00').getTime();

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

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []); 

  return (
    <>
      <div className="dedication-container">
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
          <p className="event-details"><strong>📅 Date:</strong> Sunday, April 6, 2025</p>
          <p className="event-details"><strong>⏰ Time:</strong> 9:00 AM Mass</p>

          {/* Countdown Timer */}
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
      </div>

      {/* Footer outside the card */}
      <footer className="footer">Designed by Princeley</footer>
    </>
  );
};

export default ChildDedication;
