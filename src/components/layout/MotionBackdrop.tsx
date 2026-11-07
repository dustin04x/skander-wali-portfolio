import { useEffect, useRef } from 'react';

export function MotionBackdrop() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let isVisible = false;
    let canPlay = false;
    let idleCallbackId: number | undefined;
    let fallbackTimerId: number | undefined;
    const idleWindow = window as Window & {
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
      cancelIdleCallback?: (handle: number) => void;
    };
    const syncPlayback = () => {
      const connection = navigator as Navigator & { connection?: { saveData?: boolean } };
      if (!canPlay || !isVisible || document.hidden || reducedMotion.matches || connection.connection?.saveData) {
        video.pause();
        return;
      }
      void video.play().catch(() => undefined);
    };
    const allowPlaybackWhenIdle = () => {
      const activate = () => {
        canPlay = true;
        syncPlayback();
      };
      if (idleWindow.requestIdleCallback) {
        idleCallbackId = idleWindow.requestIdleCallback(activate, { timeout: 2500 });
      } else {
        fallbackTimerId = window.setTimeout(activate, 1200);
      }
    };
    const onPageLoad = () => allowPlaybackWhenIdle();
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = Boolean(entry?.isIntersecting);
      syncPlayback();
    });

    observer.observe(video);
    if (document.readyState === 'complete') allowPlaybackWhenIdle();
    else window.addEventListener('load', onPageLoad, { once: true });
    reducedMotion.addEventListener('change', syncPlayback);
    document.addEventListener('visibilitychange', syncPlayback);
    return () => {
      observer.disconnect();
      window.removeEventListener('load', onPageLoad);
      if (idleCallbackId !== undefined) idleWindow.cancelIdleCallback?.(idleCallbackId);
      if (fallbackTimerId !== undefined) window.clearTimeout(fallbackTimerId);
      reducedMotion.removeEventListener('change', syncPlayback);
      document.removeEventListener('visibilitychange', syncPlayback);
      video.pause();
    };
  }, []);

  return <video
    ref={videoRef}
    className="hero-motion"
    muted
    loop
    playsInline
    preload="none"
    poster="/motion/contour-poster.webp"
    aria-hidden="true"
    tabIndex={-1}
  ><source src="/motion/contour.mp4" type="video/mp4"/></video>;
}
