"use client"
import { useEffect } from 'react';
import Script from 'next/script';

const SpeedTestComponent = () => {
  useEffect(() => {
    // Inject the SpeedChecker script
    const script = document.createElement('script');
    script.src = 'https://www.speedcheckercdn.com/speedchecker.api.js';
    script.async = true;
    script.onload = () => {
      if (window.SCAPI) {
        window.SCAPI.init();
      }
    };
    document.body.appendChild(script);

    // Define the event listeners
    window.speedcheckerReady = function () {
      window.SCApplication.startTest(); 
      console.log('Speed test is ready.');
    };

    window.speedcheckerTakenTestSaved = function (data) {
      console.log("Test has just finished, following some details.");
      console.log("Visitor’s ISP:", data.Provider.Title);
      console.log("Visitor’s country:", data.TakenTest.User.CountryCode);
      console.log("Ping:", data.TakenTest.Ping.time, "ms");
      console.log("Download:", data.TakenTest.Download.speedInKbps);
      console.log("Upload:", data.TakenTest.Upload.speedInKbps);
    };

    window.speedcheckerPingStarted = function () {
      console.log('Ping test has started.');
    };

    window.speedcheckerPingFinished = function (name, country, pingInMs) {
      console.log('Ping test has finished.');
      console.log('Server name:', name);
      console.log('Server country:', country);
      console.log('Ping:', pingInMs, 'ms');
    };

    window.speedcheckerDownloadProgress = function (speedInKbps) {
      console.log('Current download speed:', speedInKbps, 'Kbps');
    };

    window.speedcheckerDownloadFinished = function (speedInKbps) {
      console.log('Download test has finished.');
      console.log('Download speed:', speedInKbps, 'Kbps');
    };

    window.speedcheckerUploadProgress = function (speedInKbps) {
      console.log('Current upload speed:', speedInKbps, 'Kbps');
    };

    window.speedcheckerUploadFinished = function (speedInKbps) {
      console.log('Upload test has finished.');
      console.log('Upload speed:', speedInKbps, 'Kbps');
    };

    // Clean up the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div>Your speed test is running. Check the console for results.
    <Script
          id="speedchecker-api"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var sc_api_mode='1';
              var sc_script = document.createElement("script");
              sc_script.setAttribute("src", ("https:" == document.location.protocol ? "https" : "http") + "://www.speedcheckercdn.com/speedchecker.api.js");
              sc_script.addEventListener("load", function () {
                window.SCAPI.init();
              });
              document.body.appendChild(sc_script);
            `,
          }}
        />
  </div>;
};

export default SpeedTestComponent;
