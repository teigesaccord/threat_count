'use client';

import { useState } from 'react';
import { useGameState } from '@/hooks/useGameState';
import { ProjectSelection } from '@/components/ProjectSelection';
import { KnittingInterface } from '@/components/KnittingInterface';
import { ProjectCompletionModal } from '@/components/ProjectCompletionModal';
import { Shop } from '@/components/Shop';
import { PROJECTS } from '@/types/game';

type Tab = 'knitting' | 'shop';

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('knitting');
  const {
    gameState,
    incrementKnits,
    selectProject,
    getAvailableProjects,
    getCurrentProject,
    getJustCompletedProject,
    clearJustCompletedProject,
    buyFollower,
    buyNeedleUpgrade,
    unlockProject,
    getCurrentNeedleUpgrade,
    getNextNeedleUpgrade,
    getTotalKnitsPerSecond,
    isLoaded,
  } = useGameState();

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <div className="text-lg text-zinc-600 dark:text-zinc-400">Loading...</div>
      </div>
    );
  }

  const currentProject = getCurrentProject();
  const availableProjects = PROJECTS; // Show all projects, locking handled in component
  const justCompletedProject = getJustCompletedProject();
  const knitsPerSecond = getTotalKnitsPerSecond();
  const currentNeedleUpgrade = getCurrentNeedleUpgrade();
  const needleMultiplier = currentNeedleUpgrade ? currentNeedleUpgrade.multiplier : 1;

  const abandonProject = () => {
    selectProject('');
  };

  return (
    <div className="flex min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full flex-col bg-white dark:bg-black">
        {/* Header */}
        <div className="text-center py-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-4xl font-bold text-black dark:text-zinc-50 mb-4">
            Thread Count
          </h1>

          {/* Stats Bar */}
          <div className="flex justify-center gap-8 text-sm">
            <div className="text-center">
              <div className="font-mono text-lg text-blue-600 dark:text-blue-400">
                {gameState.totalKnits.toLocaleString()}
              </div>
              <div className="text-gray-600 dark:text-gray-400">Total Knits</div>
            </div>
            <div className="text-center">
              <div className="font-mono text-lg text-purple-600 dark:text-purple-400">
                {gameState.experience.toLocaleString()}
              </div>
              <div className="text-gray-600 dark:text-gray-400">Experience</div>
            </div>
            {knitsPerSecond > 0 && (
              <div className="text-center">
                <div className="font-mono text-lg text-green-600 dark:text-green-400">
                  {knitsPerSecond.toFixed(1)}/s
                </div>
                <div className="text-gray-600 dark:text-gray-400">Auto Knits</div>
              </div>
            )}
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mt-4">
            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('knitting')}
                className={`px-6 py-2 rounded-md transition-colors ${
                  activeTab === 'knitting'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                🧶 Knitting
              </button>
              <button
                onClick={() => setActiveTab('shop')}
                className={`px-6 py-2 rounded-md transition-colors ${
                  activeTab === 'shop'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                🏪 Shop
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex items-center justify-center p-4">
          {activeTab === 'knitting' ? (
            <div className="flex flex-col items-center gap-8 text-center w-full">
              {!currentProject ? (
                <ProjectSelection
                  availableProjects={availableProjects}
                  totalKnits={gameState.totalKnits}
                  completedProjects={gameState.completedProjects}
                  onSelectProject={selectProject}
                />
              ) : (
                <KnittingInterface
                  currentProject={currentProject}
                  progress={gameState.currentProject?.progress || 0}
                  totalKnits={gameState.totalKnits}
                  experience={gameState.experience}
                  onKnit={incrementKnits}
                  onAbandonProject={abandonProject}
                  needleMultiplier={needleMultiplier}
                />
              )}
            </div>
          ) : (
            <Shop
              gameState={gameState}
              buyFollower={buyFollower}
              buyNeedleUpgrade={buyNeedleUpgrade}
              unlockProject={unlockProject}
              getNextNeedleUpgrade={getNextNeedleUpgrade}
              getCurrentNeedleUpgrade={getCurrentNeedleUpgrade}
            />
          )}
        </div>

        {/* Footer */}
        <div className="text-center py-4 text-sm text-zinc-500 dark:text-zinc-500 border-t border-gray-200 dark:border-gray-700">
          Your progress is automatically saved
        </div>

        {justCompletedProject && (
          <ProjectCompletionModal
            project={justCompletedProject}
            onContinue={clearJustCompletedProject}
          />
        )}
      </main>
    </div>
  );
}
