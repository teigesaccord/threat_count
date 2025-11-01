export interface Project {
  id: string;
  name: string;
  emoji: string;
  description: string;
  knitRequirement: number;
  experienceReward: number;
  unlockRequirement?: number; // Total knits needed to unlock this project
}

export interface ShopItem {
  id: string;
  name: string;
  emoji: string;
  description: string;
  type: 'follower' | 'needle' | 'unlock';
  cost: number;
  maxPurchases?: number; // Undefined means unlimited
  currentLevel?: number; // For upgradeable items
}

export interface Follower {
  id: string;
  name: string;
  emoji: string;
  knitsPerSecond: number;
  cost: number;
}

export interface NeedleUpgrade {
  id: string;
  name: string;
  emoji: string;
  multiplier: number;
  cost: number;
}

export interface GameState {
  knits: number;
  totalKnits: number; // Total knits ever made (for unlocking projects)
  experience: number;
  currentProject: {
    projectId: string;
    progress: number;
  } | null;
  completedProjects: {
    [projectId: string]: number; // How many times completed
  };
  followers: {
    [followerId: string]: number; // How many of each follower type
  };
  needleLevel: number; // Current needle upgrade level (0 = basic)
  unlockedProjects: string[]; // Projects unlocked early via shop
}

export const PROJECTS: Project[] = [
  {
    id: 'dishcloth',
    name: 'Dishcloth',
    emoji: '🧽',
    description: 'A simple square dishcloth. Perfect for beginners!',
    knitRequirement: 25,
    experienceReward: 10,
    unlockRequirement: 0,
  },
  {
    id: 'coaster',
    name: 'Coaster',
    emoji: '⭕',
    description: 'A round coaster to protect your furniture.',
    knitRequirement: 40,
    experienceReward: 18,
    unlockRequirement: 0,
  },
  {
    id: 'scarf',
    name: 'Scarf',
    emoji: '🧣',
    description: 'A warm scarf to keep you cozy.',
    knitRequirement: 150,
    experienceReward: 75,
    unlockRequirement: 100,
  },
  {
    id: 'hat',
    name: 'Beanie Hat',
    emoji: '🧢',
    description: 'A comfortable beanie for cold days.',
    knitRequirement: 200,
    experienceReward: 120,
    unlockRequirement: 200,
  },
  {
    id: 'mittens',
    name: 'Mittens',
    emoji: '🧤',
    description: 'A pair of warm mittens.',
    knitRequirement: 300,
    experienceReward: 200,
    unlockRequirement: 400,
  },
  {
    id: 'socks',
    name: 'Socks',
    emoji: '🧦',
    description: 'A cozy pair of hand-knitted socks.',
    knitRequirement: 450,
    experienceReward: 350,
    unlockRequirement: 800,
  },
  {
    id: 'sweater',
    name: 'Sweater',
    emoji: '🧥',
    description: 'A beautiful hand-knitted sweater.',
    knitRequirement: 1000,
    experienceReward: 800,
    unlockRequirement: 1500,
  },
  {
    id: 'blanket',
    name: 'Blanket',
    emoji: '🛏️',
    description: 'A large, warm blanket for cold nights.',
    knitRequirement: 2500,
    experienceReward: 2000,
    unlockRequirement: 3000,
  },
];

export const FOLLOWERS: Follower[] = [
  {
    id: 'apprentice',
    name: 'Knitting Apprentice',
    emoji: '👨‍🎓',
    knitsPerSecond: 0.5,
    cost: 50,
  },
  {
    id: 'grandmother',
    name: 'Grandmother Helper',
    emoji: '👵',
    knitsPerSecond: 1,
    cost: 200,
  },
  {
    id: 'expert',
    name: 'Knitting Expert',
    emoji: '👩‍🏫',
    knitsPerSecond: 2,
    cost: 500,
  },
  {
    id: 'master',
    name: 'Knitting Master',
    emoji: '🧙‍♀️',
    knitsPerSecond: 5,
    cost: 1500,
  },
  {
    id: 'guild',
    name: 'Knitting Guild',
    emoji: '🏭',
    knitsPerSecond: 10,
    cost: 5000,
  },
];

export const NEEDLE_UPGRADES: NeedleUpgrade[] = [
  {
    id: 'level1',
    name: 'Bamboo Needles',
    emoji: '🎋',
    multiplier: 2,
    cost: 100,
  },
  {
    id: 'level2',
    name: 'Steel Needles',
    emoji: '🔧',
    multiplier: 3,
    cost: 300,
  },
  {
    id: 'level3',
    name: 'Carbon Fiber Needles',
    emoji: '⚡',
    multiplier: 5,
    cost: 800,
  },
  {
    id: 'level4',
    name: 'Magical Needles',
    emoji: '✨',
    multiplier: 8,
    cost: 2000,
  },
  {
    id: 'level5',
    name: 'Legendary Needles',
    emoji: '🌟',
    multiplier: 15,
    cost: 5000,
  },
];

export const getProjectUnlockCost = (project: Project): number => {
  // Cost to unlock project early is 10x the experience reward
  return project.experienceReward * 10;
};