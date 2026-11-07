import { useEffect, useRef, type RefObject } from 'react';
import { projects } from '../data/projects';
import { profile } from '../data/profile';
import { Arrow } from '../components/ui/Arrow';
import { Icon } from '../components/ui/Icon';
import { ProjectRow } from '../components/projects/ProjectRow';
import { SiteHeader, SiteFooter } from '../components/layout/SiteChrome';
import { MotionBackdrop } from '../components/layout/MotionBackdrop';
import { gsap } from 'gsap';

const topics = ['Network security', 'Linux hardening', 'Secure access management', 'Zero trust architecture', 'Security automation'];

function useGSAPAnimations(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
        intro.from('.hero-top', { autoAlpha: 0, y: 14, duration: 0.55 })
          .from('.hero h1', { autoAlpha: 0, y: 34, duration: 0.8 }, '-=0.2')
          .from('.hero-portrait, .hero-statement, .hero-meta', { autoAlpha: 0, y: 20, duration: 0.6, stagger: 0.1 }, '-=0.25')
          .from('.hero-index', { autoAlpha: 0, duration: 0.35 }, '-=0.15');

        root.current?.querySelectorAll<HTMLElement>('.section-head').forEach((heading) => {
          gsap.fromTo(heading, { autoAlpha: 0, y: 24 }, {
            autoAlpha: 1,
            y: 0,
            duration: 0.65,
            ease: 'power3.out',
            scrollTrigger: { trigger: heading, start: 'top 84%', once: true },
          });
        });

        root.current?.querySelectorAll<HTMLElement>('.project-row').forEach((project) => {
          gsap.fromTo(project, { autoAlpha: 0, y: 22 }, {
            autoAlpha: 1,
            y: 0,
            duration: 0.55,
            ease: 'power3.out',
            scrollTrigger: { trigger: project, start: 'top 88%', once: true },
          });
        });

        gsap.fromTo('.about-body', { autoAlpha: 0, y: 20 }, {
          autoAlpha: 1,
          y: 0,
          duration: 0.65,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.about-body', start: 'top 84%', once: true },
        });
        gsap.fromTo('.topics li', { autoAlpha: 0, x: -10 }, {
          autoAlpha: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.06,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.topics', start: 'top 84%', once: true },
        });
        gsap.fromTo('.beat-copy', { autoAlpha: 0, y: 18 }, {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.beat-note', start: 'top 86%', once: true },
        });
        gsap.fromTo('.contact-content', { autoAlpha: 0, y: 18 }, {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.contact-content', start: 'top 86%', once: true },
        });
      }, root);
      return () => context.revert();
    });

    return () => media.revert();
  }, [root]);
}

export function HomePage() {
  const animationRoot = useRef<HTMLElement>(null);

  useGSAPAnimations(animationRoot);

  return <>
    <SiteHeader/>
    <main id="main-content" ref={animationRoot}>
      <section id="top" className="hero page-grid">
        <MotionBackdrop/>
        <div className="hero-top"><span className="eyebrow">Computer science · security · software</span><span className="hero-coordinate">Hammam Sousse / Tunisia</span></div>
        <h1>Build. Break. <em>Secure.</em></h1>
        <div className="hero-bottom">
          <figure className="hero-portrait"><img src="/skander-wali.webp" alt="Skander Wali" width="640" height="800" fetchPriority="high"/><figcaption>Skander Wali <span>·</span> Tunisia</figcaption></figure>
          <div className="hero-statement">
            <p>I’m Skander, a final-year Computer Science student at ISITCom in Hammam Sousse. I focus on offensive security, vulnerability analysis, and security tooling.</p>
            <div className="hero-actions"><a className="text-link" href="#work">Selected work <Arrow diagonal={false}/></a><a className="text-link" href="#contact">Start a conversation <Arrow/></a></div>
          </div>
          <div className="hero-meta"><div><span>Based in</span><b>Tunisia</b></div><div><span>Focus</span><b>Offensive security</b></div><div><span>Looking for</span><b>PFE internship</b></div></div>
        </div>
        <div className="hero-index"><span>Portfolio / 2026</span><span>01 — 06 / selected projects</span></div>
      </section>

      <section className="work section-wrap" id="work">
        <div className="section-head reveal"><div className="section-kicker"><span>01</span> / Selected work</div><div><h2>Made to be<br/><em>understood.</em></h2><p>Tools, experiments, and learning environments built around curiosity about how things work.</p></div></div>
        <div className="project-list">{projects.map(project => <ProjectRow key={project.slug} project={project}/>)}</div>
      </section>

      <section className="about section-wrap" id="about">
        <div className="section-head reveal"><div className="section-kicker"><span>02</span> / About</div><div><h2>Curious by<br/><em>construction.</em></h2></div></div>
        <div className="about-body reveal">
          <div className="about-copy"><p className="about-lead">Final-year Computer Science student at ISITCom, focused on offensive security, vulnerability analysis, and security tooling.</p><p>My CTF practice spans web and binary exploitation, reverse engineering, digital forensics, cryptography, and network analysis. I build Python automation for reconnaissance, packet and log analysis, and repetitive security workflows.</p><p>I also develop secure full-stack applications with React, REST APIs, and SQL or NoSQL databases. I’m seeking a PFE internship in offensive or application security, security engineering, or SOC operations.</p></div>
          <div className="skills"><div><h3>Security</h3><p>Web security · Penetration testing<br/>Vulnerability assessment<br/>Binary exploitation · Reverse engineering<br/>Digital forensics · Cryptography · CTFs</p></div><div><h3>Development</h3><p>Python · C · C++ · JavaScript<br/>React · Vite · REST APIs<br/>PostgreSQL · MongoDB · SQLite</p></div><div><h3>Infrastructure</h3><p>Linux · Bash · Docker<br/>Networking · Network enumeration<br/>Packet analysis · Wireshark · tshark</p></div></div>
          <div className="profile-notes">
            <div className="profile-note"><h3><Icon name="education"/>Education</h3><p>{profile.education}</p></div>
            <div className="profile-note"><h3><Icon name="award"/>Leadership &amp; activities</h3><ul>{profile.activities.map(activity => <li key={activity}>{activity}</li>)}</ul></div>
            <div className="profile-note"><h3><Icon name="award"/>Certifications &amp; languages</h3><p>{profile.certifications.join(' · ')}<br/>{profile.languages.join(' · ')}</p></div>
          </div>
        </div>
      </section>

      <section className="notes section-wrap" id="notes">
        <div className="section-head reveal"><div className="section-kicker"><span>03</span> / Notes</div><div><h2>Currently<br/><em>exploring.</em></h2></div></div>
        <ol className="topics reveal">{topics.map((topic, index) => <li key={topic}><span>0{index + 1}</span><b>{topic}</b><span className="topic-mark" aria-hidden="true">↗</span></li>)}</ol>
      </section>

      <section className="beat-note section-wrap" aria-labelledby="beat-title">
        <div className="beat-label">AFTER HOURS / 001</div>
        <div className="beat-copy"><h2 id="beat-title">I make beats, too.</h2><p>Outside security and software, I produce under the name <strong>prodbyskn</strong>.</p><a href={profile.instagram} target="_blank" rel="noreferrer" className="beat-link"><Icon name="instagram" size={18}/>Follow the music <Arrow/></a></div>
        <svg className="beat-wave" aria-hidden="true" viewBox="0 0 700 240" preserveAspectRatio="none"><path d="M8 106v28m20-59v90m20-108v126m20-72v48m20-104v160m20-121v83m20-58v34m20-110v186m20-149v112m20-81v50m20-126v202m20-151v100m20-61v22m20-116v210m20-177v144m20-92v38m20-126v214m20-173v132m20-87v42m20-132v222m20-179v136m20-91v46m20-129v212m20-158v104m20-73v42m20-122v202m20-156v110m20-71v32m20-106v180m20-138v96m20-55v22m20-116v210m20-162v114m20-78v42m20-119v196"/></svg>
      </section>

      <section className="contact section-wrap" id="contact">
        <div className="section-kicker reveal"><span>04</span> / Contact</div>
        <div className="contact-content reveal"><h2>Have something<br/><em>interesting in mind?</em></h2><div className="contact-bottom"><div className="contact-intro"><p>Open to PFE opportunities in offensive security, application security, security engineering, or SOC operations.</p><nav className="cv-downloads" aria-label="Download my CV"><span>CV</span><a href="/cv/skander-wali-cv-en.pdf" download>English <Arrow/></a><a href="/cv/skander-wali-cv-fr.pdf" download>Français <Arrow/></a></nav></div><div className="contact-links"><a href={`mailto:${profile.email}`} className="contact-link"><span className="contact-label"><Icon name="mail"/>Email Skander</span><Arrow/></a><a href={profile.linkedin} target="_blank" rel="noreferrer" className="contact-link"><span className="contact-label"><Icon name="linkedin"/>LinkedIn</span><Arrow/></a><a href={profile.github} target="_blank" rel="noreferrer" className="contact-link"><span className="contact-label"><Icon name="github"/>GitHub</span><Arrow/></a></div></div></div>
      </section>
    </main>
    <SiteFooter/>
  </>;
}
