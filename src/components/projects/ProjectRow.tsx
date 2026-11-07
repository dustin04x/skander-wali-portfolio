import { Link } from 'react-router-dom';
import type { Project } from '../../data/projects';
import { Arrow } from '../ui/Arrow';
import { ProjectVisual } from './ProjectVisual';
import { ProjectFrame } from './ProjectFrame';

export function ProjectRow({ project }: { project: Project }) {
  return <article className="project-row reveal">
    <span className="project-number">{project.number}</span>
    <div className="project-info"><div className="eyebrow">{project.category}</div><h3>{project.name}</h3><p>{project.description}</p><ul className="stack">{project.stack.map(item=><li key={item}>{item}</li>)}</ul><div className="project-links"><Link to={`/work/${project.slug}`}>Case study <Arrow/></Link><a href={project.href} target="_blank" rel="noreferrer">Repository <Arrow/></a>{project.live && <a href={project.live} target="_blank" rel="noreferrer">Live project <Arrow/></a>}</div></div>
    <Link className={`project-preview preview-${project.visual}`} to={`/work/${project.slug}`} aria-label={`Read the ${project.name} case study`}><ProjectFrame project={project}><ProjectVisual type={project.visual}/></ProjectFrame></Link>
  </article>;
}
