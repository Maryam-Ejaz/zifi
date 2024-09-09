import React, { useState, useEffect } from 'react';
import styles from './MoreInfo.module.css';
import { useMediaQuery } from '@uidotdev/usehooks';
import { useLocation } from '../contexts/LocationContext';


// SVGs
import Arrow from './Svgs/Arrow';
import UserIcon from './Svgs/UserIcon';
import WifiIcon from './Svgs/Wifi';
import ArrowUp from './Svgs/ArrowUp';
import ArrowDown from './Svgs/ArrowDown';

interface MoreInfoPageProps {
  download: string;
  upload: string;
  ping: string;
  onClose: () => void; // Prop to handle closing the overlay
}

// Function to get IP address 
const getIpAddress = async () => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error('Error fetching IP address:', error);
    return 'N/A';
  }
};

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

const MoreInfoPage: React.FC<MoreInfoPageProps> = ({ download, upload, ping, onClose }) => {
  // UseMediaQuery hook to detect mobile screen
  const isMobile = useMediaQuery('(max-width: 1000px)');
  const { locationData, isLoading } = useLocation();

  // State for date and time
  const [currentDate, setCurrentDate] = useState<string>('LOADING..');
  const [currentTime, setCurrentTime] = useState<string>('LOADING..');
  const [macAddress, setMacAddress] = useState<string>('LOADING..');
  const [internalIp, setInternalIp] = useState<string>('LOADING..');
  const [externalIp, setExternalIp] = useState<string>('LOADING..');
  const [isp, setIsp] = useState<string>('LOADING..');
  const [server, setServer] = useState<string>('LOADING..');
  const [router, setRouter] = useState<string>('LOADING..');

  // Function to format date and time
  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatTime = (date: Date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };


   // Update date and time every second
   useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      setCurrentDate(formatDate(now));
      setCurrentTime(formatTime(now));
    }, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);


  // Fetch  IP addresses
  useEffect(() => {
    
    getIpAddress().then(ip => {
      setExternalIp(ip);
    });

  }, []);

  useEffect(() => {
    const fetchWifiNetworks = async () => {
      try {
        const response = await fetch('/api/getRouter');
        if (!response.ok) {
          throw new Error('Failed to fetch Wi-Fi networks');
        }
        const data = await response.json();
        setRouter(data.networks[0].ssid.toUpperCase());
        setMacAddress(data.networks[0].mac.toUpperCase());
      } catch (error) {
        console.error('Error fetching Wi-Fi networks:', error);
      }
    };

    fetchWifiNetworks();
  }, []);

  useEffect(() => {
    const fetchInternalIps = async () => {
      try {
        const response = await fetch('/api/getInternalIp');
        if (!response.ok) {
          throw new Error('Failed to fetch internal IP addresses');
        }
        const data = await response.json();
        setInternalIp(data.ipv4);
      } catch (error) {
        console.error('Error fetching internal IP addresses:', error);
      }
    };

    fetchInternalIps();
  }, []);


  useEffect(() => {
    const fetchFastData = async () => {
      try {
        const response = await fetch(
          'https://api.fast.com/netflix/speedtest/v2?https=true&token=YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm&urlCount=1'
        );
        const data = await response.json();
        const clientIsp = data.client.isp || 'LOADING..';
        const firstServerCity = data.targets[0].location.city || 'LOADING..';

        setIsp(clientIsp);
        setServer(firstServerCity);
      } catch (error) {
        console.error('Error fetching Fast.com data:', error);
        setIsp('ERROR');
        setServer('ERROR');
      }
    };

    fetchFastData();
  }, []);

  return (
    <div className={`flex w-full h-full ${styles.moreInfoRow}`}>
      <div className={`flex flex-col ${styles.moreInfoColumn} `}>
        {/* Left Column */}
        <div className={`flex flex-col ${styles.moreInfoColumnOne}`}>
          {/* Row 1: Text */}
          <h2 className={`${styles.MoreInfoText}`}>MORE INFORMATION</h2>
          {/* Row 2: SVG */}
          <Arrow width="20" height="20" onClick={onClose} className={styles.arrowIcon} />

          {/* Table Section */}
          <div className={`${styles['more-info-table-container']}`}>
            <table className={`${styles.moreInfoTable}`}>
              <tbody>
                <tr>
                  <td className={`${styles.iconCell}`} rowSpan={2}><a href="" target="_blank" rel="noopener noreferrer" className={` ${styles['speed-screen-flag-a']}`}>
          {locationData?.countryCode ? (
            <span className={`flag-icon-squared fi-${locationData.countryCode.toLowerCase()} ${styles['speed-screen-flag']}`}></span>
          ) : (
            <span className="flag-icon-squaredfi-gb"></span> 
          )}
        </a></td>
                  <td className={`${styles.labelCell}`}>CITY</td>
                  <td className={`${styles.dataCell}`}>{locationData?.city.toLocaleUpperCase()}</td>
                </tr>
                <tr>
                  <td className={`${styles.labelCell}`}>COUNTRY</td>
                  <td className={`${styles.dataCell}`}>{locationData?.country.toLocaleUpperCase()}</td>
                </tr>
                <tr>
                  <td className={`${styles.emptyCell}`} rowSpan={1}></td>
                  <td className={`${styles.emptyLabelCell}`}></td>
                  <td className={`${styles.emptyDataCell}`}></td>
                </tr>
                <tr>
                  <td className={`${styles.iconCell}`} rowSpan={5}><UserIcon width="5vh" height="5vh" className={` ${styles.svgIcon}`} /></td>
                  <td className={`${styles.labelCell}`}>LATITUDE</td>
                  <td className={`${styles.dataCell}`}>{locationData?.latitude}</td>
                </tr>
                <tr>
                  <td className={`${styles.labelCell}`}>LONGITUDE</td>
                  <td className={`${styles.dataCell}`}>{locationData?.longitude}</td>
                </tr>
                <tr>
                  <td className={`${styles.labelCell}`}>INTERNAL IP</td>
                  <td className={`${styles.dataCell}`}>{internalIp}</td>
                </tr>
                <tr>
                  <td className={`${styles.labelCell}`}>EXTERNAL IP</td>
                  <td className={`${styles.dataCell}`}>{externalIp}</td>
                </tr>
                <tr>
                  <td className={`${styles.labelCell}`}>MAC ADDRESS</td>
                  <td className={`${styles.dataCell}`}>{macAddress}</td>
                </tr>
                <tr>
                  <td className={`${styles.emptyCell}`} rowSpan={1}></td>
                  <td className={`${styles.emptyLabelCell}`}></td>
                  <td className={`${styles.emptyDataCell}`}></td>
                </tr>
                <tr>
                  <td className={`${styles.iconCell}`} rowSpan={4}><WifiIcon width="5vh" height="5vh" className={` ${styles.svgIcon}`} /></td>
                  <td className={`${styles.labelCell}`}>PROVIDER</td>
                  <td className={`${styles.dataCell}`}>{isp.toUpperCase()}</td>
                </tr>
                <tr>
                  <td className={`${styles.labelCell}`}>ROUTER NAME</td>
                  <td className={`${styles.dataCell}`}>{router}</td>
                </tr>
                <tr>
                  <td className={`${styles.labelCell}`}>SERVER</td>
                  <td className={`${styles.dataCell}`}>{server.toUpperCase()}</td>
                </tr>
                <tr>
                  <td className={`${styles.labelCell}`}>PING</td>
                  <td className={`${styles.dataCell}`}>{ping} ms</td>
                </tr>
                <tr>
                  <td className={`${styles.emptyCell}`} rowSpan={1}></td>
                  <td className={`${styles.emptyLabelCell}`}></td>
                  <td className={`${styles.emptyDataCell}`}></td>
                </tr>
                <tr>
                  <td className={`${styles.emptyCell}`} rowSpan={2}></td>
                  <td className={`${styles.labelCell}`}>DATE</td>
                  <td className={`${styles.dataCell}`}>{currentDate}</td>
                </tr>
                <tr>
                  <td className={`${styles.labelCell}`}>TIME</td>
                  <td className={`${styles.dataCell}`}>{currentTime}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className={`flex ${styles.moreInfoColumn} ${styles.moreInfoColumnTwo}`}>
        {/* Right Column */}
        <div className={`flex ${styles.speedMainContainer} ${styles.speedMainContainerOne} flex items-end w-full flex-col`}>
          <div className={`flex items-center ${styles.speedMainRow}`}>
            {/* Sub Row */}
            <div className={`flex items-end justify-end ${styles.speedSubRow}`}>
              {download}
            </div>

            {/* Sub Column */}
            <div className={`flex flex-col justify-center items-end ${styles.speedSubColumn}`}>
              <div className={`${styles.speedSubColumnText}`}>
                Mbps
              </div>
              <div
                className={`${styles.speedSubColumnSvg} flex items-center justify-center mt-2 relative`}
              >
                <ArrowDown width="5vh" height="5vh" />
              </div>


            </div>

          </div>
          <div className={`${styles.speedMoreInfoText} justify-center items-center`}>
            DOWNLOAD
          </div>




        </div>

        <div className={`flex ${styles.speedMainContainer} flex items-end justify-center w-full flex-col mt-[3vw]`}>
          <div className={`flex items-center ${styles.speedMainRow} `}>
            {/* Sub Row */}
            <div className={`flex items-end justify-end ${styles.speedSubRow}`}>
              {upload}
            </div>

            {/* Sub Column */}
            <div className={`flex flex-col justify-center items-center ${styles.speedSubColumn}`}>
              <div className={`${styles.speedSubColumnText}`}>
                Mbps
              </div>
              <div
                className={`${styles.speedSubColumnSvg} flex items-center justify-center mt-2 relative `}>
                <ArrowUp width="5vh" height="5vh" />
              </div>

            </div>

          </div>
          <div className={`${styles.speedMoreInfoText}`}>
            UPLOAD
          </div>




        </div>
      </div>

      {isMobile && (

        <div
          className={`${styles.speedMoreInfoTitle} mt-[20px] cursor-pointer`}
        >
          MORE INFORMATION
        </div>
      )}
    </div>
  );
};

export default MoreInfoPage;
