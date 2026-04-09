// features/goals/hooks/useCreateGoal.ts
// ✅ Logic & State for the Create Goal screen

import { useRouter } from "expo-router";
import { useState } from "react";
import { useGoalsStore } from "../store/goalsStore";
import type {
  CreateGoalForm,
  DepositFrequency,
  GoalCategoryId,
  GoalDuration,
} from "../types/goals.types";
import { GOAL_CATEGORIES } from "./useGoalsData";

export function useCreateGoal() {
  const router = useRouter();
  const addGoal = useGoalsStore((s) => s.addGoal);

  const [form, setForm] = useState<CreateGoalForm>({
    categoryId: "travel",
    targetAmount: "5000",
    goalName: "Vacation in Bali",
    targetDate: "September 15, 2026",
    duration: "12mo",
    frequency: "Weekly",
  });

  // ── Field updaters ─────────────────────────────────────────────────────────
  const setCategory = (id: GoalCategoryId) =>
    setForm((p) => ({ ...p, categoryId: id }));
  const setDuration = (d: GoalDuration) =>
    setForm((p) => ({ ...p, duration: d }));
  const setFrequency = (f: DepositFrequency) =>
    setForm((p) => ({ ...p, frequency: f }));
  const setGoalName = (name: string) =>
    setForm((p) => ({ ...p, goalName: name }));

  // ── Numpad for amount ─────────────────────────────────────────────────────
  const handleAmountKey = (key: string) => {
    setForm((prev) => {
      const cur = prev.targetAmount;
      if (key === "⌫") {
        const next = cur.slice(0, -1);
        return { ...prev, targetAmount: next === "" ? "0" : next };
      }
      if (cur === "0" && key !== ".") return { ...prev, targetAmount: key };
      return { ...prev, targetAmount: cur + key };
    });
  };

  // ── Display amount formatted ───────────────────────────────────────────────
  const displayAmount = Number(form.targetAmount).toLocaleString("en-US");

  // ── AI estimation ─────────────────────────────────────────────────────────
  const aiDate = "Aug 20, 2026";

  // ── Submit ─────────────────────────────────────────────────────────────────
  const handleContinue = () => {
    addGoal(form);
    router.back(); // back to goals screen
  };

  return {
    form,
    displayAmount,
    aiDate,
    categories: GOAL_CATEGORIES,
    setCategory,
    setDuration,
    setFrequency,
    setGoalName,
    handleAmountKey,
    handleContinue,
  };
}
