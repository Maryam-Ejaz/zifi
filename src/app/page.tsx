import dynamic from 'next/dynamic';
const MainSpeedPage = dynamic(() => import('./pages/MainSpeedPage'), { ssr: false });
import { ThemeProvider } from "./theme/ThemeProvider";
import SpeedCheckerComponent from './components/SpeedCheckerComponent';
import { LocationProvider } from './contexts/LocationContext';

export default function Home() {
  return (
    <ThemeProvider>
      <LocationProvider>
      {/* <SpeedCheckerComponent/> */}
      <MainSpeedPage/>
      </LocationProvider>
    </ThemeProvider>
  );
}
