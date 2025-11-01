import { ShopItem } from './ShopItem';
import { FOLLOWERS, NEEDLE_UPGRADES, PROJECTS, getProjectUnlockCost } from '@/types/game';
import { GameState } from '@/types/game';

interface ShopProps {
  gameState: GameState;
  buyFollower: (id: string) => boolean;
  buyNeedleUpgrade: () => boolean;
  unlockProject: (id: string) => boolean;
  getNextNeedleUpgrade: () => any;
  getCurrentNeedleUpgrade: () => any;
}

export function Shop({
  gameState,
  buyFollower,
  buyNeedleUpgrade,
  unlockProject,
  getNextNeedleUpgrade,
  getCurrentNeedleUpgrade,
}: ShopProps) {
  const nextNeedleUpgrade = getNextNeedleUpgrade();
  const currentNeedleUpgrade = getCurrentNeedleUpgrade();

  const lockedProjects = PROJECTS.filter(
    project =>
      (project.unlockRequirement || 0) > gameState.totalKnits &&
      !gameState.unlockedProjects.includes(project.id)
  );

  return (
    <div className="w-full max-w-6xl">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-black dark:text-white mb-2">
          🏪 Shop
        </h2>
        <div className="text-lg text-purple-600 dark:text-purple-400 font-semibold">
          Experience Points: {gameState.experience.toLocaleString()}
        </div>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Spend your experience points to unlock powerful upgrades!
        </p>
      </div>

      {/* Followers Section */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-black dark:text-white mb-4">
          🧑‍🤝‍🧑 Followers (Auto-Knitters)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FOLLOWERS.map((follower) => {
            const owned = gameState.followers[follower.id] || 0;
            return (
              <ShopItem
                key={follower.id}
                emoji={follower.emoji}
                name={follower.name}
                description="Automatically knits for you while you work on projects."
                cost={follower.cost}
                owned={owned}
                canAfford={gameState.experience >= follower.cost}
                onPurchase={() => buyFollower(follower.id)}
                extraInfo={`+${follower.knitsPerSecond} knits/second`}
              />
            );
          })}
        </div>
      </div>

      {/* Needle Upgrades Section */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-black dark:text-white mb-4">
          🪡 Needle Upgrades
        </h3>
        {currentNeedleUpgrade && (
          <div className="mb-4 p-4 bg-green-100 dark:bg-green-900/30 rounded-lg">
            <div className="text-green-800 dark:text-green-200">
              <strong>Current:</strong> {currentNeedleUpgrade.emoji} {currentNeedleUpgrade.name}
              <span className="ml-2">({currentNeedleUpgrade.multiplier}x multiplier)</span>
            </div>
          </div>
        )}

        {nextNeedleUpgrade ? (
          <div className="grid grid-cols-1 max-w-md">
            <ShopItem
              emoji={nextNeedleUpgrade.emoji}
              name={nextNeedleUpgrade.name}
              description="Multiplies all knits you make!"
              cost={nextNeedleUpgrade.cost}
              canAfford={gameState.experience >= nextNeedleUpgrade.cost}
              onPurchase={buyNeedleUpgrade}
              extraInfo={`${nextNeedleUpgrade.multiplier}x knit multiplier`}
            />
          </div>
        ) : (
          <div className="text-center p-8 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🌟</div>
            <div className="text-lg font-semibold text-gray-600 dark:text-gray-300">
              All needle upgrades purchased!
            </div>
          </div>
        )}
      </div>

      {/* Early Project Unlocks Section */}
      {lockedProjects.length > 0 && (
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-black dark:text-white mb-4">
            🔓 Early Project Unlocks
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lockedProjects.map((project) => {
              const cost = getProjectUnlockCost(project);
              return (
                <ShopItem
                  key={project.id}
                  emoji={project.emoji}
                  name={`Unlock ${project.name}`}
                  description={`Unlock this project early! ${project.description}`}
                  cost={cost}
                  canAfford={gameState.experience >= cost}
                  onPurchase={() => unlockProject(project.id)}
                  extraInfo={`Normally unlocks at ${project.unlockRequirement} total knits`}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}