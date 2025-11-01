interface ShopItemProps {
  emoji: string;
  name: string;
  description: string;
  cost: number;
  owned?: number;
  maxOwned?: number;
  canAfford: boolean;
  onPurchase: () => void;
  extraInfo?: string;
}

export function ShopItem({
  emoji,
  name,
  description,
  cost,
  owned = 0,
  maxOwned,
  canAfford,
  onPurchase,
  extraInfo,
}: ShopItemProps) {
  const isMaxedOut = maxOwned !== undefined && owned >= maxOwned;
  const isDisabled = !canAfford || isMaxedOut;

  return (
    <div
      className={`
        border-2 rounded-lg p-4 transition-all
        ${
          isDisabled
            ? 'border-gray-300 bg-gray-100 dark:border-gray-600 dark:bg-gray-800 cursor-not-allowed'
            : 'border-blue-300 bg-white dark:border-blue-600 dark:bg-gray-900 hover:border-blue-500 hover:shadow-lg cursor-pointer'
        }
      `}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="text-3xl">{emoji}</div>
        <div className="flex-1">
          <h3 className={`font-semibold ${isDisabled ? 'text-gray-500' : 'text-black dark:text-white'}`}>
            {name}
          </h3>
          {owned > 0 && (
            <div className="text-sm text-green-600 dark:text-green-400">
              Owned: {owned}{maxOwned ? `/${maxOwned}` : ''}
            </div>
          )}
        </div>
      </div>

      <p className={`text-sm mb-3 ${isDisabled ? 'text-gray-500' : 'text-gray-600 dark:text-gray-300'}`}>
        {description}
      </p>

      {extraInfo && (
        <p className={`text-xs mb-3 ${isDisabled ? 'text-gray-500' : 'text-blue-600 dark:text-blue-400'}`}>
          {extraInfo}
        </p>
      )}

      <div className="flex justify-between items-center">
        <div className={`font-semibold ${isDisabled ? 'text-gray-500' : 'text-purple-600 dark:text-purple-400'}`}>
          {isMaxedOut ? 'Maxed Out' : `${cost} XP`}
        </div>

        <button
          onClick={onPurchase}
          disabled={isDisabled}
          className={`
            px-4 py-2 rounded-lg font-medium transition-colors
            ${
              isDisabled
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }
          `}
        >
          {isMaxedOut ? 'Max' : 'Buy'}
        </button>
      </div>
    </div>
  );
}