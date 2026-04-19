import { useScrollReveal } from './hooks/useScrollReveal';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import NeuralLab from './components/NeuralLab';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-[#04040f] text-[#f0f4ff]">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Skills />
        <NeuralLab />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;


