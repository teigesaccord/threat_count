import { Project } from '@/types/game';

interface ProjectCardProps {
  project: Project;
  isLocked: boolean;
  timesCompleted: number;
  onSelect: () => void;
}

export function ProjectCard({ project, isLocked, timesCompleted, onSelect }: ProjectCardProps) {
  return (
    <div
      className={`
        relative border-2 rounded-lg p-4 transition-all cursor-pointer
        ${
          isLocked
            ? 'border-gray-300 bg-gray-100 dark:border-gray-600 dark:bg-gray-800 cursor-not-allowed'
            : 'border-blue-300 bg-white dark:border-blue-600 dark:bg-gray-900 hover:border-blue-500 hover:shadow-lg'
        }
      `}
      onClick={isLocked ? undefined : onSelect}
    >
      {isLocked && (
        <div className="absolute inset-0 bg-gray-500/20 rounded-lg flex items-center justify-center">
          <div className="text-2xl">🔒</div>
        </div>
      )}

      <div className="flex items-center gap-3 mb-2">
        <div className="text-3xl">{project.emoji}</div>
        <div>
          <h3 className={`font-semibold ${isLocked ? 'text-gray-500' : 'text-black dark:text-white'}`}>
            {project.name}
          </h3>
          {timesCompleted > 0 && (
            <div className="text-sm text-green-600 dark:text-green-400">
              Completed {timesCompleted} time{timesCompleted > 1 ? 's' : ''}
            </div>
          )}
        </div>
      </div>

      <p className={`text-sm mb-3 ${isLocked ? 'text-gray-500' : 'text-gray-600 dark:text-gray-300'}`}>
        {project.description}
      </p>

      <div className="flex justify-between items-center text-sm">
        <div className={`${isLocked ? 'text-gray-500' : 'text-blue-600 dark:text-blue-400'}`}>
          {project.knitRequirement} knits
        </div>
        <div className={`${isLocked ? 'text-gray-500' : 'text-green-600 dark:text-green-400'}`}>
          +{project.experienceReward} XP
        </div>
      </div>

      {isLocked && project.unlockRequirement && (
        <div className="mt-2 text-xs text-gray-500">
          Unlocks at {project.unlockRequirement} total knits
        </div>
      )}
    </div>
  );
}