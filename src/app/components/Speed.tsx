"use client"
import React, { useState, useEffect } from 'react';
import SpeedSvg from '../../../public/next.svg'; // Initial SVG
import styles from './Speed.module.css'; // Assuming you are using CSS modules

// SVGs
import GreenCircle from './Svgs/GreenCircle';
import YellowCircle from './Svgs/YellowCircle';
import MoreInfoPage from './MoreInfo';

const Speed: React.FC = () => {
  // State to manage the SVG, speed, and information display
  const [svg, setSvg] = useState(
    <div className="relative flex justify-center items-center">
      <YellowCircle width="6vw" height="6vw" />
      <span className="absolute text-white text-[1.7vw] font-light tracking-[.1vw] cursor-pointer">GO</span>
    </div>
  ); // Initial SVG with "GO" text

  const [speed, setSpeed] = useState(0); // Initial speed
  const [isCounting, setIsCounting] = useState(false); // To track if the counter is running
  const [showInfo, setShowInfo] = useState(false); 
  const [showOverlay, setShowOverlay] = useState(false);

  // Handler for click event on "MORE INFORMATION"
  const handleMoreInfoClick = () => {
    setShowOverlay(true); // Show the overlay
  };

  // Handler for click event on YellowCircle
  const handleYellowCircleClick = () => {
    setSvg(<GreenCircle width="6vw" height="6vw" />); // Change SVG to GreenCircle
    setShowInfo(false);
    setIsCounting(true); // Start the counter
  };

  // Function to handle closing the overlay
  const handleCloseOverlay = () => {
    setShowOverlay(false);
  };

  // Effect to handle the pseudo counter
  useEffect(() => {
    if (isCounting) {
      const intervalId = setInterval(() => {
        const randomSpeed = (Math.random() * 100).toFixed(2); 
        setSpeed(parseFloat(randomSpeed)); 
      }, 200); 

      // After 3 seconds, stop the counter and set the final speed
      const timeoutId = setTimeout(() => {
        clearInterval(intervalId); 
        setSpeed(105.31); // Set the final speed to 105.31
        setSvg(<div className="relative flex justify-center items-center">
          <YellowCircle width="6vw" height="6vw" />
          <span className="absolute text-white text-[1.7vw] font-light tracking-[.1vw] cursor-pointer">GO</span>
        </div>);
        setIsCounting(false); 
        setShowInfo(true); // Show the "MORE INFORMATION" text
      }, 3000); 

      // Cleanup on component unmount or when counting stops
      return () => {
        clearInterval(intervalId);
        clearTimeout(timeoutId);
      };
    }
  }, [isCounting]);

  return (
    <div className={`flex-grow ${styles.speedMainContainer} flex justify-end items-endh-full w-full flex-col`}>
      <div className={`flex items-center ${styles.speedMainRow} h-full`}>
        {/* Sub Row */}
        <div className={`flex items-center justify-center ${styles.speedSubRow}`}>
          {speed}
        </div>

        {/* Sub Column */}
        <div className={`flex flex-col justify-center items-center ${styles.speedSubColumn}`}>
          <div className={`${styles.speedSubColumnText}`}>
            Mbps
          </div>
          <div
            className={`${styles.speedSubColumnSvg} flex items-center justify-center mt-2 relative`}
            onClick={handleYellowCircleClick}
            style={{ cursor: 'pointer' }} // Optional: change cursor to pointer
          >
            {svg}
          </div>
        </div>
        
      </div>
      {/* Conditionally render the "MORE INFORMATION" row */}
      {showInfo && (
            <div 
              className={`${styles.speedMoreInfoText} mt-4 cursor-pointer`}
              onClick={handleMoreInfoClick}
            >
              MORE INFORMATION
            </div>
          )}
       {/* Conditionally render the overlay */}
       {showOverlay && (
        <div className={`${styles.overlay} absolute top-10 bottom-10 w-[96vw] h-90 bg-black opacity-80`}>
            <MoreInfoPage onClose={handleCloseOverlay} />
          </div>

      )}
    </div>
  );
};

export default Speed;
