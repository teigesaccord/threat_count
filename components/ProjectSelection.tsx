import { ProjectCard } from './ProjectCard';
import { Project } from '@/types/game';

interface ProjectSelectionProps {
  availableProjects: Project[];
  totalKnits: number;
  completedProjects: { [projectId: string]: number };
  onSelectProject: (projectId: string) => void;
}

export function ProjectSelection({
  availableProjects,
  totalKnits,
  completedProjects,
  onSelectProject,
}: ProjectSelectionProps) {
  return (
    <div className="w-full max-w-4xl">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-black dark:text-white mb-2">
          Choose Your Next Project
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Select what you'd like to knit. Larger projects require more knits but give more experience!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {availableProjects.map((project) => {
          const isLocked = (project.unlockRequirement || 0) > totalKnits;
          const timesCompleted = completedProjects[project.id] || 0;

          return (
            <ProjectCard
              key={project.id}
              project={project}
              isLocked={isLocked}
              timesCompleted={timesCompleted}
              onSelect={() => onSelectProject(project.id)}
            />
          );
        })}
      </div>
    </div>
  );
}