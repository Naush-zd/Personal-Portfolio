import { BackgroundFX } from "./components/BackgroundFX";
import { Cursor } from "./components/Cursor";
import { Preloader } from "./components/Preloader";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { Achievements } from "./components/Achievements";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Chatbot } from "./components/Chatbot";
import { CinemaEasterEgg } from "./components/CinemaEasterEgg";
import { MarqueeBanner } from "./components/MarqueeBanner";
import { ScrollProgress } from "./components/ScrollProgress";
import { ThemeProvider } from "./components/ThemeProvider";
import { Confetti } from "./components/Confetti";
import { HireRocket } from "./components/HireRocket";

function App() {
  return (
    <ThemeProvider>
      <Preloader />
      <ScrollProgress />
      <Cursor />
      <BackgroundFX />
      <Navbar />
      <main>
        <Hero />
        <MarqueeBanner />
        <About />
        <Experience />
        <Projects />
        <MarqueeBanner reverse />
        <Skills />
        <Achievements />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
      <CinemaEasterEgg />
      <Confetti />
      <HireRocket />
    </ThemeProvider>
  );
}

export default App;
