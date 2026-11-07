import type { ReactNode } from 'react';
import type { Project } from '../../data/projects';

export function ProjectFrame({ project, children }: { project: Project; children: ReactNode }) {
  return <div className="project-frame">
    <div className="project-frame-bar" aria-hidden="true"><span className="frame-dots"><i/><i/><i/></span><span>{project.name}</span><span>{project.number}</span></div>
    {children}
  </div>;
}
