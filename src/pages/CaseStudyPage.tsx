import { Link, useParams } from 'react-router-dom';
import { projects } from '../data/projects';
import { Arrow } from '../components/ui/Arrow';
import { ProjectVisual } from '../components/projects/ProjectVisual';
import { ProjectFrame } from '../components/projects/ProjectFrame';
import { SiteHeader, SiteFooter } from '../components/layout/SiteChrome';

export function CaseStudyPage() {
  const { slug } = useParams();
  const project = projects.find(item => item.slug === slug);
  if (!project) return <><SiteHeader/><main className="case-inner"><div className="section-kicker">404 / NOT FOUND</div><h1>That project<br/><em>isn’t here.</em></h1><Link className="text-link" to="/#work">Return to portfolio <Arrow/></Link></main><SiteFooter/></>;
  return <><SiteHeader/><main className="case-inner"><Link className="back-link" to="/#work">← Selected work</Link><header className="case-title"><div className="section-kicker">{project.number} / {project.category}</div><h1>{project.name}<br/><em>Case study</em></h1><p>{project.description}</p></header><ProjectFrame project={project}><ProjectVisual type={project.visual}/></ProjectFrame><div className="case-facts"><div><span>TECHNOLOGIES</span><b>{project.stack.join(' · ')}</b></div><div><span>REPOSITORY</span><a href={project.href} target="_blank" rel="noreferrer">Open on GitHub <Arrow/></a></div>{project.live && <div><span>LIVE PROJECT</span><a href={project.live} target="_blank" rel="noreferrer">Visit project <Arrow/></a></div>}</div><div className="case-sections"><div className="section-kicker">CASE STUDY / DETAILS</div><div>{project.details.map((detail,i)=><section key={detail.heading}><span>{String(i + 1).padStart(2, '0')}</span><div><h2>{detail.heading}</h2><p>{detail.body}</p></div></section>)}</div></div></main><SiteFooter/></>;
}
