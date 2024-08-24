import './App.css';
import styled, { ThemeProvider } from 'styled-components';
import { useState, useEffect } from "react";
import { darkTheme, lightTheme } from './utils/Themes.js';
import Navbar from './components/Navbar';
import HeroSection from "./components/HeroSection";
import Skills from "./components/Skills";
import Education from './components/Education';
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import ProjectDetails from "./components/ProjectDetails";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { BrowserRouter as Router } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Body = styled.div`
  background-color: ${({ theme }) => theme.bg};
  width: 100%;
  height: 100%;
  overflow-x: hidden;
`;

const Wrapper = styled.div`
  background: linear-gradient(38.73deg, rgba(204, 0, 187, 0.15) 0%, rgba(201, 32, 184, 0) 50%), linear-gradient(141.27deg, rgba(0, 70, 209, 0) 50%, rgba(0, 70, 209, 0.15) 100%);
  width: 100%;
  clip-path: polygon(0 0, 100% 0, 100% 100%,30% 98%, 0 100%);
`;

const Section = styled(motion.section)`
  padding: 0px 0;
`;

const scrollVariants = {
  hidden: { opacity: 0, y: 75 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeInOut" } },
};

function ScrollReveal({ children } ) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <Section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={scrollVariants}
    >
      {children}
    </Section>
  );
}

function App() {
  const [darkMode] = useState(true);
  const [openModal, setOpenModal] = useState({ state: false, project: null });

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Router>
        <Navbar/>
        <Body>
          <ScrollReveal><HeroSection/></ScrollReveal>
          <Wrapper>
            <ScrollReveal><Skills/></ScrollReveal>
            <ScrollReveal><Experience/></ScrollReveal>
          </Wrapper>
          <ScrollReveal>
            <Projects openModal={openModal} setOpenModal={setOpenModal} />
          </ScrollReveal>
          <Wrapper>
            <ScrollReveal><Education /></ScrollReveal>
            <ScrollReveal><Contact /></ScrollReveal>
          </Wrapper>
          <Footer />
          {openModal.state &&
            <ProjectDetails openModal={openModal} setOpenModal={setOpenModal} />
          }
        </Body>
      </Router>
    </ThemeProvider>
  );
};

export default App;
