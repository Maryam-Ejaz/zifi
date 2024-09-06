"use client"
// components/SpeedChecker.tsx
import { useEffect } from 'react';

const SpeedChecker: React.FC = () => {
  useEffect(() => {
    // Create the script element
    const scScript = document.createElement('script');
    scScript.src = `${document.location.protocol === 'https:' ? 'https' : 'http'}://www.speedcheckercdn.com/speedchecker.api.js`;
    scScript.async = true;

    // Add script to head
    document.head.appendChild(scScript);

    // Initialize the API once the script is loaded
    scScript.addEventListener('load', () => {
      (window as any).SCAPI.init();

      // Example: Check if API has methods for events or state
      if ((window as any).SCAPI && typeof (window as any).SCAPI.getStatus === 'function') {
        const interval = setInterval(() => {
          const status = (window as any).SCAPI.getStatus();
          console.log('Speed Test Status:', status);
          if (status === 'completed') {
            clearInterval(interval);
          }
        }, 1000);
      } else {
        console.error('SpeedChecker API does not support event listeners or status methods.');
      }
    });

    // Clean up the script on component unmount
    return () => {
      document.head.removeChild(scScript);
    };
  }, []);

  // Method to start the speed test
  const startTest = () => {
    if (window.SCApplication) {
      window.SCApplication.startTest();
    } else {
      console.error('SpeedChecker API is not initialized.');
    }
  };

  return (
    <div>
      <button onClick={startTest}>Start Speed Test</button>
      <div id="speedcheckerdiv"></div>
    </div>
  );
};

export default SpeedChecker;
