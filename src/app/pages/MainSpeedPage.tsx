import React from 'react';
import Speed from '../components/Speed';
import styles from './MainSpeedPage.module.css';

// Svgs
import ZifiHeaderIcon from '../components/Svgs/ZifiHeaderIcon';
import ZtfrFooter from '../components/Svgs/ZtfrFooter';
import ZimoFooter from '../components/Svgs/Zimo-footer';
import ZmeetFooter from '../components/Svgs/Zmeet-footer';

const MainSpeedPage: React.FC = () => {
  return (
    <div className={`${styles['speed-main-screen-container']} min-h-screen bg-black text-white flex flex-col`}>
      {/* Header */}
      <header className={`${styles['speed-main-screen-header']} flex justify-between items-center mb-4`}>
        <a href="https://example.com/header-link" target="_blank" rel="noopener noreferrer">
          <ZifiHeaderIcon width="42" height="42" fill='white' />
        </a>
        <span className={`${styles['speed-main-screen-text']} text-center`}>YOUR INTERNET SPEED</span>
        <a href="https://example.com/footer-link" target="_blank" rel="noopener noreferrer">
          <ZtfrFooter width="52" height="52" fill='white' />
        </a>
      </header>

      {/* Speed Component */}
      <main className="flex-grow flex items-center justify-center">
        <Speed />
      </main>

      {/* Footer */}
      <footer className={`${styles['speed-main-screen-footer']} flex flex-row mt-4`}>
        {/* First Row */}
        <div className={`${styles['speed-main-screen-footer-row-1']} flex items-center mb-2`}>
          <a href="https://zimogroup.org/" target="_blank" rel="noopener noreferrer">
            <ZimoFooter width="72" height="32" fill='white' />
          </a>
        </div>

        {/* Second Row */}
        <div className={`${styles['speed-main-screen-footer-row-2']} flex justify-end items-center`}>
          <div className={`${styles['speed-main-screen-footer-svg-column']} flex items-center`}>
            <a href="https://ztfr.org/" target="_blank" rel="noopener noreferrer">
              <ZtfrFooter width="52" height="52" fill='white' />
            </a>
          </div>
          <div className={`${styles['speed-main-screen-footer-svg-column']} flex items-center ml-2`}>
            <a href="https://www.zimomeet.com/" target="_blank" rel="noopener noreferrer">
              <ZmeetFooter width="52" height="52" fill='white' />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainSpeedPage;
