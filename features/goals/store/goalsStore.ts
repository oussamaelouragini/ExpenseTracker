// features/goals/store/goalsStore.ts
// ✅ Shared state — active goals list

import { create } from "zustand";
import { GOAL_CATEGORIES } from "../hooks/useGoalsData";
import type { ActiveGoal, CreateGoalForm } from "../types/goals.types";

interface GoalsStore {
  goals: ActiveGoal[];
  addGoal: (form: CreateGoalForm) => void;
  deleteGoal: (id: string) => void;
}

const INITIAL_GOALS: ActiveGoal[] = [
  {
    id: "g1",
    name: "New Car",
    categoryId: "car",
    icon: "car-outline",
    iconColor: "#3B5BDB",
    iconBgColor: "#EEF2FF",
    targetAmount: 26000,
    savedAmount: 18200,
    monthsRemaining: 4,
  },
  {
    id: "g2",
    name: "Emergency Fund",
    categoryId: "emergency",
    icon: "medkit-outline",
    iconColor: "#7C3AED",
    iconBgColor: "#F5F3FF",
    targetAmount: 10000,
    savedAmount: 4000,
    monthsRemaining: 12,
  },
];

export const useGoalsStore = create<GoalsStore>((set) => ({
  goals: INITIAL_GOALS,

  addGoal: (form) => {
    const cat = GOAL_CATEGORIES.find((c) => c.id === form.categoryId)!;
    const durationMonths =
      form.duration === "6mo" ? 6 : form.duration === "12mo" ? 12 : 24;

    const newGoal: ActiveGoal = {
      id: Date.now().toString(),
      name: form.goalName || cat.label,
      categoryId: form.categoryId,
      icon: cat.icon,
      iconColor: cat.iconColor,
      iconBgColor: cat.iconBgColor,
      targetAmount: parseFloat(form.targetAmount) || 0,
      savedAmount: 0,
      monthsRemaining: durationMonths,
    };

    set((state) => ({ goals: [newGoal, ...state.goals] }));
  },

  deleteGoal: (id) =>
    set((state) => ({ goals: state.goals.filter((g) => g.id !== id) })),
}));
