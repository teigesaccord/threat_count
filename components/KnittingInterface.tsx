import { Project } from '@/types/game';

interface KnittingInterfaceProps {
  currentProject: Project;
  progress: number;
  totalKnits: number;
  experience: number;
  onKnit: () => void;
  onAbandonProject: () => void;
  needleMultiplier?: number;
}

export function KnittingInterface({
  currentProject,
  progress,
  totalKnits,
  experience,
  onKnit,
  onAbandonProject,
  needleMultiplier = 1,
}: KnittingInterfaceProps) {
  const progressPercentage = (progress / currentProject.knitRequirement) * 100;
  const remainingKnits = currentProject.knitRequirement - progress;

  return (
    <div className="w-full max-w-2xl">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">{currentProject.emoji}</div>
        <h2 className="text-3xl font-bold text-black dark:text-white mb-2">
          Knitting: {currentProject.name}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {currentProject.description}
        </p>
      </div>

      {/* Stats bar */}
      <div className="flex justify-around mb-8 text-center">
        <div>
          <div className="text-2xl font-mono text-blue-600 dark:text-blue-400">
            {totalKnits.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Knits</div>
        </div>
        <div>
          <div className="text-2xl font-mono text-green-600 dark:text-green-400">
            {experience.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Experience</div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
          <span>Progress: {progress}/{currentProject.knitRequirement}</span>
          <span>{remainingKnits} knits remaining</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
          <div
            className="bg-blue-600 h-4 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="text-center mt-2 text-sm text-gray-600 dark:text-gray-400">
          {progressPercentage.toFixed(1)}% complete
        </div>
      </div>

      {/* Knit button */}
      <div className="text-center mb-6">
        <button
          onClick={onKnit}
          className="flex h-20 w-60 items-center justify-center mx-auto rounded-lg bg-blue-600 px-8 text-2xl font-semibold text-white transition-colors hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          🧶 Knit (+{needleMultiplier})
        </button>
        {needleMultiplier > 1 && (
          <div className="text-sm text-green-600 dark:text-green-400 mt-2">
            {needleMultiplier}x needle multiplier active!
          </div>
        )}
      </div>

      {/* Abandon project button */}
      <div className="text-center">
        <button
          onClick={onAbandonProject}
          className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-sm underline"
        >
          Abandon Project
        </button>
      </div>
    </div>
  );
}