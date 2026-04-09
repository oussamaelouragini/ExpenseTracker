// features/goals/hooks/useExploreGoals.ts
// ✅ Logic for the Goals explore screen

import { useGoalsStore } from "../store/goalsStore";
import { GOAL_CATEGORIES } from "./useGoalsData";

export function useExploreGoals() {
  const goals = useGoalsStore((s) => s.goals);

  const formatShort = (n: number): string => {
    if (n >= 1000) return `$${(n / 1000).toFixed(0)}k`;
    return `$${n.toLocaleString()}`;
  };

  const formatBalance = (n: number): string =>
    `$${n.toLocaleString("en-US", { minimumFractionDigits: 0 })}`;

  const getProgress = (saved: number, target: number): number =>
    Math.min(Math.round((saved / target) * 100), 100);

  return {
    goals,
    categories: GOAL_CATEGORIES,
    formatShort,
    formatBalance,
    getProgress,
  };
}
