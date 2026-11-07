import { useEffect, type ReactNode } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ReactLenis, useLenis } from 'lenis/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'lenis/dist/lenis.css';
import { HomePage } from './pages/HomePage';
import { CaseStudyPage } from './pages/CaseStudyPage';

gsap.registerPlugin(ScrollTrigger);

function SmoothScroll({ children }: { children: ReactNode }) {
  return <ReactLenis root options={{ autoRaf: false, anchors: true, stopInertiaOnNavigate: true, lerp: 0.1 }}><LenisGSAPBridge/>{children}</ReactLenis>;
}

function LenisGSAPBridge() {
  const lenis = useLenis();
  useEffect(() => {
    if (!lenis) return;

    const updateScrollTrigger = () => ScrollTrigger.update();
    const updateLenis = (time: number) => lenis.raf(time * 1000);
    lenis.on('scroll', updateScrollTrigger);
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off('scroll', updateScrollTrigger);
      gsap.ticker.remove(updateLenis);
    };
  }, [lenis]);
  return null;
}

export function App() {
  return <SmoothScroll><BrowserRouter><Routes><Route path="/" element={<HomePage/>}/><Route path="/work/:slug" element={<CaseStudyPage/>}/><Route path="*" element={<CaseStudyPage/>}/></Routes></BrowserRouter></SmoothScroll>;
}
