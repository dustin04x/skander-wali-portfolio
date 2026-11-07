export type Project = {
  slug: string;
  number: string;
  name: string;
  category: string;
  description: string;
  stack: string[];
  href: string;
  visual: 'rootlab' | 'threat' | 'metascan' | 'crypto' | 'algo' | 'radio';
  live?: string;
  details: { heading: string; body: string }[];
};

// Descriptions and technologies are based on each repository's README and language metadata.
export const projects: Project[] = [
  { slug: 'rootlab', number: '01', name: 'RootLab', category: 'Security education', description: 'A browser-based security lab where terminal-led missions simulate host discovery, exploitation, privilege escalation, and flag capture without touching live infrastructure.', stack: ['Next.js', 'TypeScript', 'Tailwind CSS'], href: 'https://github.com/dustin04x/RootLab', live: 'https://dustin04x.github.io/RootLab/', visual: 'rootlab', details: [
    { heading: 'A safe place to practice', body: 'RootLab runs mission scenarios in a deterministic simulated environment. The terminal experience is interpreted by a local engine rather than a real shell, so exercises do not require live infrastructure.' },
    { heading: 'Mission flow', body: 'Scenarios guide learners through host and service enumeration, exploitation, privilege escalation, and flag capture.' },
    { heading: 'Learning by doing', body: 'The project turns offensive-security workflows into replayable browser missions for students and self-learners.' },
  ] },
  { slug: 'threatcanvas', number: '02', name: 'ThreatCanvas', category: 'Threat visualization', description: 'An interactive security learning platform for exploring simulated attacks through MITRE ATT&CK mapping, attack chains, network graphs, process trees, and timelines.', stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'], href: 'https://github.com/dustin04x/ThreatCanvas', live: 'https://dustin04x.github.io/ThreatCanvas/', visual: 'threat', details: [
    { heading: 'Make attack activity legible', body: 'ThreatCanvas presents simulated malware scenarios as connected views of attack sequences, system relationships, and defensive strategies.' },
    { heading: 'Multiple ways to investigate', body: 'The interface brings together MITRE ATT&CK technique mapping, network graphs, process trees, event timelines, and activity logs.' },
    { heading: 'Practice both sides', body: 'Quiz and defend modes let learners test their understanding and explore responses without running real malware.' },
  ] },
  { slug: 'metascan', number: '03', name: 'MetaScan', category: 'Digital forensics', description: 'A browser-based image forensics tool for inspecting EXIF and GPS metadata, file signatures, entropy, readable strings, and steganography indicators.', stack: ['HTML', 'CSS', 'JavaScript'], href: 'https://github.com/dustin04x/Metascan', live: 'https://dustin04x.github.io/Metascan/', visual: 'metascan', details: [
    { heading: 'Inspect an image file', body: 'MetaScan combines metadata extraction with binary inspection: EXIF and GPS fields, magic bytes, entropy, readable strings, and image properties.' },
    { heading: 'Useful for CTF analysis', body: 'CTF-focused checks look for flag patterns, null bytes, unusual file signatures, and potential steganography clues.' },
    { heading: 'Files stay in the browser', body: 'Analysis happens client-side. The selected image is not uploaded to a server, which keeps the workflow local to the user.' },
  ] },
  { slug: 'crypto-toolbox', number: '04', name: 'Crypto Toolbox', category: 'Cryptography · CLI', description: 'A Python command-line toolkit with 30+ encoding, cipher, hashing, and analysis utilities, including frequency analysis and heuristic cipher identification.', stack: ['Python', 'Rich'], href: 'https://github.com/dustin04x/crypto-toolbox', visual: 'crypto', details: [
    { heading: 'One CLI for common tasks', body: 'The toolbox groups more than 30 encoding, cipher, hashing, and analysis utilities into a single Python command-line workflow.' },
    { heading: 'Reason about unknown text', body: 'Analysis tools include frequency analysis and heuristic cipher identification using character sets, entropy, index of coincidence, and chi-squared scoring.' },
    { heading: 'Designed for hands-on learning', body: 'The project brings practical cryptography and encoding experiments together for CTF practice and investigation.' },
  ] },
  { slug: 'algovision', number: '05', name: 'AlgoVision', category: 'Algorithms · Learning', description: 'An interactive web application that visualizes programming algorithms in real time.', stack: ['React', 'TypeScript', 'Vite'], href: 'https://github.com/dustin04x/algovision', live: 'https://algovision-nine.vercel.app', visual: 'algo', details: [
    { heading: 'See algorithms as they run', body: 'AlgoVision turns programming algorithm steps into an interactive, real-time visual explanation.' },
    { heading: 'Built for exploration', body: 'The web interface gives learners a visual way to follow how an algorithm changes its data as it executes.' },
  ] },
  { slug: 'pulseradio', number: '06', name: 'PulseRadio', category: 'Web · Audio', description: 'A browser-based electronic radio tuner bringing together curated SomaFM and RadioBrowser stations.', stack: ['JavaScript', 'HTML', 'CSS'], href: 'https://github.com/dustin04x/PulseRadio', live: 'https://dustin04x.github.io/PulseRadio/', visual: 'radio', details: [
    { heading: 'A focused listening interface', body: 'PulseRadio brings curated electronic stations from SomaFM and RadioBrowser into one browser-based tuner.' },
    { heading: 'Lightweight web build', body: 'The project is built with vanilla JavaScript, HTML, and CSS and is available as a live web app.' },
  ] },
];
