// MoreInfoPage.tsx
import React from 'react';
import styles from './MoreInfo.module.css';

//svgs
import Arrow from './Svgs/Arrow';
import UserIcon from './Svgs/UserIcon';

interface MoreInfoPageProps {
    onClose: () => void; // Prop to handle closing the overlay
  }

const MoreInfoPage: React.FC<MoreInfoPageProps>  = ({ onClose }) =>  {
    return (
        <div className={`flex w-full h-full ${styles.moreInfoRow}`}>
          <div className={`flex flex-col ${styles.moreInfoColumn} ${styles.moreInfoColumnOne}`}>
            {/* Left Column */}
            <div className="flex flex-col justify-start items-start gap-4">
              {/* Row 1: Text */}
              <h2 className={`${styles.MoreInfoText} text-white text-xl mb-2`}>MORE INFORMATION</h2>
              {/* Row 2: SVG */}
              <Arrow width="20" height="20" onClick={onClose} // Attach the onClick handler
            style={{ cursor: 'pointer' }}/>
            <div className={`${styles['more-info-table-container']}`}>
        {/* Table */}
        {/* <table className={`${styles['more-info-table']} w-full text-white`}>
          <tbody>
            <tr>
              <td className={`${styles['more-info-table-svg']} flex justify-center items-center`}>
                <UserIcon width="24" height="24" />
              </td>
              <td className={`${styles['more-info-table-text']} text-left`}>
                <div>CITY</div>
                <div>COUNTRY</div>
              </td>
              <td className={`${styles['more-info-table-text']} text-left`}>
                <div>LONDON</div>
                <div>UNITED KINGDOM</div>
              </td>
            </tr>
          </tbody>
        </table> */}
      </div>
            </div>
          </div>
          <div className={`flex ${styles.moreInfoColumn} ${styles.moreInfoColumnTwo}`}>
            {/* Right Column */}
            <h2 className="text-white">Right Column</h2>
          </div>
        </div>
      );
};

export default MoreInfoPage;
