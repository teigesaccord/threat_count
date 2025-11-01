'use client';

import { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import { GameState, PROJECTS, FOLLOWERS, NEEDLE_UPGRADES } from '@/types/game';

const defaultGameState: GameState = {
  knits: 0,
  totalKnits: 0,
  experience: 0,
  currentProject: null,
  completedProjects: {},
  followers: {},
  needleLevel: 0,
  unlockedProjects: [],
};

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>(defaultGameState);
  const [isLoaded, setIsLoaded] = useState(false);
  const [justCompletedProject, setJustCompletedProject] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Load game state from cookies on mount
  useEffect(() => {
    const savedState = Cookies.get('threadCountGameState');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        setGameState({
          ...defaultGameState,
          ...parsedState,
        });
      } catch (error) {
        console.error('Error parsing saved game state:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save game state to cookies whenever it changes
  useEffect(() => {
    if (isLoaded) {
      Cookies.set('threadCountGameState', JSON.stringify(gameState), { expires: 365 });
    }
  }, [gameState, isLoaded]);

  // Auto-clicker system for followers
  useEffect(() => {
    if (!isLoaded || !gameState.currentProject) return;

    const totalKnitsPerSecond = Object.entries(gameState.followers).reduce(
      (total, [followerId, count]) => {
        const follower = FOLLOWERS.find(f => f.id === followerId);
        return total + (follower ? follower.knitsPerSecond * count : 0);
      },
      0
    );

    if (totalKnitsPerSecond > 0) {
      intervalRef.current = setInterval(() => {
        incrementKnits(totalKnitsPerSecond);
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isLoaded, gameState.currentProject, gameState.followers]);

  const selectProject = (projectId: string) => {
    setGameState(prev => ({
      ...prev,
      currentProject: {
        projectId,
        progress: 0,
      },
    }));
  };

  const incrementKnits = (amount: number = 1) => {
    if (!gameState.currentProject) return;

    const project = PROJECTS.find(p => p.id === gameState.currentProject?.projectId);
    if (!project) return;

    // Apply needle multiplier
    const needleUpgrade = NEEDLE_UPGRADES[gameState.needleLevel];
    const multiplier = needleUpgrade ? needleUpgrade.multiplier : 1;
    const actualAmount = amount * multiplier;

    setGameState(prev => {
      const newProgress = (prev.currentProject?.progress || 0) + actualAmount;
      const isCompleted = newProgress >= project.knitRequirement;

      if (isCompleted) {
        // Project completed!
        setJustCompletedProject(project.id);
        return {
          ...prev,
          knits: prev.knits + actualAmount,
          totalKnits: prev.totalKnits + actualAmount,
          experience: prev.experience + project.experienceReward,
          currentProject: null,
          completedProjects: {
            ...prev.completedProjects,
            [project.id]: (prev.completedProjects[project.id] || 0) + 1,
          },
        };
      } else {
        // Continue working on project
        return {
          ...prev,
          knits: prev.knits + actualAmount,
          totalKnits: prev.totalKnits + actualAmount,
          currentProject: {
            ...prev.currentProject!,
            progress: newProgress,
          },
        };
      }
    });
  };

  const getAvailableProjects = () => {
    return PROJECTS.filter(project =>
      (project.unlockRequirement || 0) <= gameState.totalKnits ||
      gameState.unlockedProjects.includes(project.id)
    );
  };

  const buyFollower = (followerId: string) => {
    const follower = FOLLOWERS.find(f => f.id === followerId);
    if (!follower || gameState.experience < follower.cost) return false;

    setGameState(prev => ({
      ...prev,
      experience: prev.experience - follower.cost,
      followers: {
        ...prev.followers,
        [followerId]: (prev.followers[followerId] || 0) + 1,
      },
    }));
    return true;
  };

  const buyNeedleUpgrade = () => {
    const nextLevel = gameState.needleLevel + 1;
    const upgrade = NEEDLE_UPGRADES[nextLevel];
    if (!upgrade || gameState.experience < upgrade.cost) return false;

    setGameState(prev => ({
      ...prev,
      experience: prev.experience - upgrade.cost,
      needleLevel: nextLevel,
    }));
    return true;
  };

  const unlockProject = (projectId: string) => {
    const project = PROJECTS.find(p => p.id === projectId);
    if (!project || gameState.unlockedProjects.includes(projectId)) return false;

    const cost = project.experienceReward * 10;
    if (gameState.experience < cost) return false;

    setGameState(prev => ({
      ...prev,
      experience: prev.experience - cost,
      unlockedProjects: [...prev.unlockedProjects, projectId],
    }));
    return true;
  };

  const getCurrentNeedleUpgrade = () => {
    return NEEDLE_UPGRADES[gameState.needleLevel] || null;
  };

  const getNextNeedleUpgrade = () => {
    return NEEDLE_UPGRADES[gameState.needleLevel + 1] || null;
  };

  const getTotalKnitsPerSecond = () => {
    return Object.entries(gameState.followers).reduce(
      (total, [followerId, count]) => {
        const follower = FOLLOWERS.find(f => f.id === followerId);
        return total + (follower ? follower.knitsPerSecond * count : 0);
      },
      0
    );
  };

  const getCurrentProject = () => {
    if (!gameState.currentProject) return null;
    return PROJECTS.find(p => p.id === gameState.currentProject?.projectId) || null;
  };

  const getJustCompletedProject = () => {
    if (!justCompletedProject) return null;
    return PROJECTS.find(p => p.id === justCompletedProject) || null;
  };

  const clearJustCompletedProject = () => {
    setJustCompletedProject(null);
  };

  return {
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
  };
}