import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Arrow } from '../ui/Arrow';
import { Icon } from '../ui/Icon';
import { profile } from '../../data/profile';

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const closeMenu = () => setMenuOpen(false);
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    let previousY = window.scrollY;
    const onScroll = () => {
      const currentY = Math.max(0, window.scrollY);
      const distance = currentY - previousY;
      const shouldStayVisible = currentY < 24 || menuOpen || header.contains(document.activeElement);

      if (shouldStayVisible) header.classList.remove('is-hidden');
      else if (Math.abs(distance) >= 8 && currentY > 96) {
        header.classList.toggle('is-hidden', distance > 0);
      }

      previousY = currentY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [menuOpen]);

  return <header ref={headerRef} className="site-header"><div className="header-inner">
    <Link className="wordmark" to="/" onClick={closeMenu}>SKANDER WALI<span> / PORTFOLIO</span></Link>
    <button type="button" className="menu-toggle" aria-expanded={menuOpen} aria-controls="site-nav" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? 'CLOSE' : 'MENU'} <span aria-hidden="true">{menuOpen ? '−' : '+'}</span></button>
    <nav id="site-nav" className={menuOpen ? 'open' : ''} aria-label="Main navigation"><Link to="/#work" onClick={closeMenu}>Work</Link><Link to="/#about" onClick={closeMenu}>About</Link><Link to="/#notes" onClick={closeMenu}>Notes</Link><Link to="/#contact" onClick={closeMenu}>Contact</Link><a href={profile.github} target="_blank" rel="noreferrer" onClick={closeMenu}><Icon name="github" size={14}/>GitHub <Arrow/></a></nav>
  </div></header>;
}
export function SiteFooter() { return <footer><div className="footer-inner"><span>SKANDER WALI · 2026</span><span>TUNISIA</span><Link to="/">BACK TO PORTFOLIO ↑</Link></div></footer>; }
