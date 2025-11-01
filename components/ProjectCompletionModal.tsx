import { Project } from '@/types/game';

interface ProjectCompletionModalProps {
  project: Project;
  onContinue: () => void;
}

export function ProjectCompletionModal({ project, onContinue }: ProjectCompletionModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg p-8 max-w-md w-full text-center shadow-2xl">
        <div className="text-6xl mb-4">🎉</div>

        <h2 className="text-2xl font-bold text-black dark:text-white mb-2">
          Project Complete!
        </h2>

        <div className="text-4xl mb-4">{project.emoji}</div>

        <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
          You've finished your <strong>{project.name}</strong>!
        </p>

        <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-4 mb-6">
          <div className="text-green-800 dark:text-green-200">
            <div className="font-semibold mb-1">Rewards Earned:</div>
            <div>+{project.experienceReward} Experience Points</div>
          </div>
        </div>

        <button
          onClick={onContinue}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          Choose Next Project
        </button>
      </div>
    </div>
  );
}