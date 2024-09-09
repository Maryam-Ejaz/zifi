"use client"
import React, { useState, useEffect, useRef } from 'react';
import styles from './Speed.module.css';
import { useMediaQuery } from '@uidotdev/usehooks';

// SVGs
import GreenCircle from './Svgs/GreenCircle';
import YellowCircle from './Svgs/YellowCircle';
import MoreInfoPage from './MoreInfo';

interface SpeedProps {
  onButtonClick: () => void;
}

const Speed: React.FC<SpeedProps> = ({ onButtonClick }) => {
  const [svg, setSvg] = useState(
    <div className="relative flex justify-center items-center">
      <YellowCircle width="95px" height="95px" />
      <span className="absolute text-white text-[20px] font-light tracking-[.1vw] cursor-pointer" style={{ zIndex: 10 }}>GO</span>
    </div>
  );

  const [speed, setSpeed] = useState("0"); // Initial speed
  const [speed_, setSpeed_] = useState("0"); // Initial speed
  const [isCounting, setIsCounting] = useState(false); // To track if the counter is running
  const [showInfo, setShowInfo] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const [download, setDownload] = useState('LOADING..');
  const [upload, setUpload] = useState('LOADING..');
  const [ping, setPing] = useState('LOADING..');

  const [download_, setDownload_] = useState('LOADING..');
  const [upload_, setUpload_] = useState('LOADING..');
  const [ping_, setPing_] = useState('LOADING..');



  // UseMediaQuery hook to detect mobile screen
  const isMobile = useMediaQuery('(max-width: 1000px)');

  // Function to get download speed test
  const getSpeedTestResults = async () => {
    try {
      const response = await fetch('/api/getTestResults');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return {
        download: data.downloadSpeed.toFixed(2), 
        upload: data.uploadSpeed.toFixed(2),
        ping: data.latency,
      };
    } catch (error) {
      console.error('Error fetching speed test results:', error);
      return {
        download: 'LOADING..',
        upload: 'LOADING..',
        ping: 'LOADING..',
      };
    }
  };

  // Handler for click event on "MORE INFORMATION"
  const handleMoreInfoClick = () => {
    setShowOverlay(true); // Show the overlay
    onButtonClick();
  };

  // Handler for click event on YellowCircle
  const handleYellowCircleClick = async () => {
    setSvg(<GreenCircle width="100px" height="100px" />); // Change SVG to GreenCircle
    setShowInfo(false);
    setIsCounting(true); // Start the counter    
  };

  // Function to handle closing the overlay
  const handleCloseOverlay = () => {
    setShowOverlay(false);
    onButtonClick();
  };

  useEffect(() => {
    const interval = 500; // Interval 

    const fetchSpeedTestResults = async () => {
      const { download, upload, ping } = await getSpeedTestResults();
      console.log(download,upload,ping);
      setSpeed_(download);
      setDownload_(download);
      setUpload_(upload);
      setPing_(ping);
    };

    // Fetch initial results and set interval for subsequent calls
    fetchSpeedTestResults(); 
    const timer = setInterval(fetchSpeedTestResults, interval);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(timer);
  }, []); 

  useEffect(() => {
    if (isCounting) {
      const intervalId = setInterval(() => {
        const randomSpeed = (Math.random() * 1000).toFixed(2);
        setSpeed(randomSpeed);
      }, 200);

      // Stop updating after 20 seconds
      const timeoutId = setTimeout(() => {
        clearInterval(intervalId);
        setIsCounting(false);
        setSvg(<div className="relative flex justify-center items-center">
          <YellowCircle width="95px" height="95px" />
          <span className="absolute text-white text-[20px] font-light tracking-[.1vw] cursor-pointer" style={{ zIndex: 10 }}>GO</span>
        </div>);
        setShowInfo(true);
        setSpeed(speed_);
        setDownload(download_);
        setUpload(upload_);
        setPing(ping_);
      }, 5000); 

      return () => {
        clearInterval(intervalId);
        clearTimeout(timeoutId);
      };
    }
  }, [isCounting]);

  return (
    <div className={`flex-grow ${styles.speedMainContainer} flex justify-end items-end h-full w-full`}>
      {isMobile && showOverlay ?
        (
          <div className={`${styles.overlay} relative m1-[20px] w-[96vw] h-100 bg-black opacity-100`}>
            <MoreInfoPage download={download}
              upload={upload}
              ping={ping}
              onClose={handleCloseOverlay} />
          </div>
        ) :
        (
          <>
            <div className={`flex items-center ${styles.speedMainRow} h-full`}>
              {/* Sub Row */}
              <div className={`flex items-center justify-center ${styles.speedSubRow}`} >
                {speed}
              </div>

              {/* Sub Column */}
              <div className={`flex flex-col justify-center items-center ${styles.speedSubColumn}`}>
                <div className={`${styles.speedSubColumnText}`}>
                  Mbps
                </div>

                {/* Conditionally render "MORE INFORMATION" before or after the SVG based on screen size */}
                {isMobile && showInfo && (
                  <div
                    className={`${styles.speedMoreInfoText} mt-[20px] cursor-pointer`}
                    onClick={handleMoreInfoClick}
                  >
                    MORE INFORMATION
                  </div>
                )}

                <div
                  className={`${styles.speedSubColumnSvg} flex items-center justify-center mt-2 relative`}
                  onClick={handleYellowCircleClick}
                  style={{ cursor: 'pointer' }}
                >
                  {svg}
                </div>

              </div>

            </div>
            {!isMobile && showInfo && (
              <div
                className={`${styles.speedMoreInfoText} mt-[20px] cursor-pointer`}
                onClick={handleMoreInfoClick}
              >
                MORE INFORMATION
              </div>
            )}

            {/* Conditionally render the overlay */}
            {showOverlay && (
              <div className={`${styles.overlay} absolute top-15 w-[96vw] h-90 bg-black opacity-90`}>
                <MoreInfoPage
                download={download}
                upload={upload}
                ping={ping}
                 onClose={handleCloseOverlay} />
              </div>
            )}



          </>
        )}

    </div>
  );
};

export default Speed;
