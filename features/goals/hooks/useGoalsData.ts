// features/goals/hooks/useGoalsData.ts
// ✅ Static shared data — categories + explore

import type { GoalCategory } from "../types/goals.types";

export const GOAL_CATEGORIES: GoalCategory[] = [
  {
    id: "travel",
    label: "Travel",
    icon: "airplane-outline",
    iconColor: "#3B5BDB",
    iconBgColor: "#EEF2FF",
    description: "Global adventures and local escapes.",
  },
  {
    id: "home",
    label: "Home",
    icon: "home-outline",
    iconColor: "#475569",
    iconBgColor: "#F1F5F9",
    description:
      "From first-time buyer deposits to interior renovations, build your future home.",
  },
  {
    id: "car",
    label: "Car",
    icon: "car-outline",
    iconColor: "#475569",
    iconBgColor: "#F1F5F9",
    description: "Your next vehicle, financed on your terms.",
  },
  {
    id: "education",
    label: "Education",
    icon: "school-outline",
    iconColor: "#7C3AED",
    iconBgColor: "#F5F3FF",
    description: "Upskilling and academic dreams.",
  },
  {
    id: "investment",
    label: "Investment",
    icon: "trending-up-outline",
    iconColor: "#16A34A",
    iconBgColor: "#DCFCE7",
    description: "Stocks, crypto, and compounding.",
  },
  {
    id: "tech",
    label: "Tech",
    icon: "desktop-outline",
    iconColor: "#475569",
    iconBgColor: "#F1F5F9",
    description: "Upgrading your digital workspace.",
  },
  {
    id: "emergency",
    label: "Emergency",
    icon: "medkit-outline",
    iconColor: "#EF4444",
    iconBgColor: "#FEF2F2",
    description: "Build a safety net for the unexpected.",
  },
];

// The FIRST category in explore gets the "featured" card treatment
export const EXPLORE_FEATURED_ID = "home";
