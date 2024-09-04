import React from 'react';
import styles from './MoreInfo.module.css';
import { useMediaQuery } from '@uidotdev/usehooks';

// SVGs
import Arrow from './Svgs/Arrow';
import UserIcon from './Svgs/UserIcon';
import WifiIcon from './Svgs/Wifi';
import Flag from './Svgs/flag';
import ArrowUp from './Svgs/ArrowUp';
import ArrowDown from './Svgs/ArrowDown';


interface MoreInfoPageProps {
  onClose: () => void; // Prop to handle closing the overlay
}

const MoreInfoPage: React.FC<MoreInfoPageProps> = ({ onClose }) => {
  // UseMediaQuery hook to detect mobile screen
  const isMobile = useMediaQuery('(max-width: 1000px)');

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
                  <td className={`${styles.iconCell}`} rowSpan={2}><Flag width="5vh" height="5vh" className={`More-Info-Flag ${styles.svgIcon}`} /></td>
                  <td className={`${styles.labelCell}`}>CITY</td>
                  <td className={`${styles.dataCell}`}>LONDON</td>
                </tr>
                <tr>
                  <td className={`${styles.labelCell}`}>COUNTRY</td>
                  <td className={`${styles.dataCell}`}>UNITED KINGDOM</td>
                </tr>
                <tr>
                  <td className={`${styles.emptyCell}`} rowSpan={1}></td>
                  <td className={`${styles.emptyLabelCell}`}></td>
                  <td className={`${styles.emptyDataCell}`}></td>
                </tr>
                <tr>
                  <td className={`${styles.iconCell}`} rowSpan={5}><UserIcon width="5vh" height="5vh" className={` ${styles.svgIcon}`} /></td>
                  <td className={`${styles.labelCell}`}>LATITUDE</td>
                  <td className={`${styles.dataCell}`}>51.514882</td>
                </tr>
                <tr>
                  <td className={`${styles.labelCell}`}>LONGITUDE</td>
                  <td className={`${styles.dataCell}`}>-0.123563</td>
                </tr>
                <tr>
                  <td className={`${styles.labelCell}`}>INTERNAL IP</td>
                  <td className={`${styles.dataCell}`}>10.0.0.186</td>
                </tr>
                <tr>
                  <td className={`${styles.labelCell}`}>EXTERNAL IP</td>
                  <td className={`${styles.dataCell}`}>82.41.174.63</td>
                </tr>
                <tr>
                  <td className={`${styles.labelCell}`}>MAC ADDRESS</td>
                  <td className={`${styles.dataCell}`}>5D:C3:07:7A:C4:88</td>
                </tr>
                <tr>
                  <td className={`${styles.emptyCell}`} rowSpan={1}></td>
                  <td className={`${styles.emptyLabelCell}`}></td>
                  <td className={`${styles.emptyDataCell}`}></td>
                </tr>
                <tr>
                  <td className={`${styles.iconCell}`} rowSpan={4}><WifiIcon width="5vh" height="5vh" className={` ${styles.svgIcon}`} /></td>
                  <td className={`${styles.labelCell}`}>PROVIDER</td>
                  <td className={`${styles.dataCell}`}>VIRGIN MEDIA</td>
                </tr>
                <tr>
                  <td className={`${styles.labelCell}`}>ROUTER NAME</td>
                  <td className={`${styles.dataCell}`}>TP LINK</td>
                </tr>
                <tr>
                  <td className={`${styles.labelCell}`}>SERVER</td>
                  <td className={`${styles.dataCell}`}>LONDON</td>
                </tr>
                <tr>
                  <td className={`${styles.labelCell}`}>PING</td>
                  <td className={`${styles.dataCell}`}>12 ms</td>
                </tr>
                <tr>
                  <td className={`${styles.emptyCell}`} rowSpan={1}></td>
                  <td className={`${styles.emptyLabelCell}`}></td>
                  <td className={`${styles.emptyDataCell}`}></td>
                </tr>
                <tr>
                  <td className={`${styles.emptyCell}`} rowSpan={2}></td>
                  <td className={`${styles.labelCell}`}>DATE</td>
                  <td className={`${styles.dataCell}`}>27/03/2024</td>
                </tr>
                <tr>
                  <td className={`${styles.labelCell}`}>TIME</td>
                  <td className={`${styles.dataCell}`}>15:45</td>
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
              105.31
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
              52.97
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
