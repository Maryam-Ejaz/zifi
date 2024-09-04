import dynamic from 'next/dynamic';
const MainSpeedPage = dynamic(() => import('./pages/MainSpeedPage'), { ssr: false });
import { ThemeProvider } from "./theme/ThemeProvider";

export default function Home() {
  return (
    <ThemeProvider>
      <MainSpeedPage/>
    </ThemeProvider>
  );
}
