import MainSpeedPage from "./pages/MainSpeedPage";
import { ThemeProvider } from "./theme/ThemeProvider";

export default function Home() {
  return (
    <ThemeProvider>
      <MainSpeedPage/>
    </ThemeProvider>
  );
}
