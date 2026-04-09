// features/goals/types/goals.types.ts

export type GoalCategoryId =
  | "travel"
  | "home"
  | "car"
  | "education"
  | "investment"
  | "tech"
  | "emergency"
  | "other";

export type DepositFrequency = "Weekly" | "Monthly";

export type GoalDuration = "6mo" | "12mo" | "2yrs";

export interface GoalCategory {
  id: GoalCategoryId;
  label: string;
  icon: string; // Ionicons name
  iconColor: string;
  iconBgColor: string;
  description: string; // for explore screen
}

export interface ActiveGoal {
  id: string;
  name: string;
  categoryId: GoalCategoryId;
  icon: string;
  iconColor: string;
  iconBgColor: string;
  targetAmount: number;
  savedAmount: number;
  monthsRemaining: number;
}

export interface CreateGoalForm {
  categoryId: GoalCategoryId;
  targetAmount: string; // string for numpad input
  goalName: string;
  targetDate: string; // display string e.g. "September 15, 2026"
  duration: GoalDuration;
  frequency: DepositFrequency;
}
