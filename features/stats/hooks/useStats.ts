// features/stats/hooks/useStats.ts
// ✅ Logic & State only

import { useState } from "react";
import type {
  ChartDataPoint,
  SpendingCategory,
  SummaryCard,
  TabPeriod,
} from "../types/stats.types";

export function useStats() {
  const [activePeriod, setActivePeriod] = useState<TabPeriod>("Weekly");

  // ── Balance ──────────────────────────────────────────────────────────────────
  const balance = 24582.4;
  const balanceGrowth = "+2.4%";

  // ── Chart Data — Weekly ──────────────────────────────────────────────────────
  const weeklyData: ChartDataPoint[] = [
    { day: "Mon", income: 1200, expense: 800 },
    { day: "Tue", income: 900, expense: 1100 },
    { day: "Wed", income: 4250, expense: 1800 },
    { day: "Thu", income: 700, expense: 500 },
    { day: "Fri", income: 1500, expense: 900 },
    { day: "Sat", income: 600, expense: 1200 },
    { day: "Sun", income: 300, expense: 400 },
  ];

  // ── Chart Data — Monthly ─────────────────────────────────────────────────────
  const monthlyData: ChartDataPoint[] = [
    { day: "Jan", income: 5200, expense: 3100 },
    { day: "Feb", income: 4800, expense: 2900 },
    { day: "Mar", income: 6100, expense: 4200 },
    { day: "Apr", income: 5500, expense: 3800 },
    { day: "May", income: 7200, expense: 4100 },
    { day: "Jun", income: 6800, expense: 5200 },
    { day: "Jul", income: 7500, expense: 3900 },
    { day: "Aug", income: 8200, expense: 4600 },
    { day: "Sep", income: 7100, expense: 5100 },
    { day: "Oct", income: 9400, expense: 5800 },
    { day: "Nov", income: 8600, expense: 4900 },
    { day: "Dec", income: 10200, expense: 6100 },
  ];

  const chartData = activePeriod === "Weekly" ? weeklyData : monthlyData;

  // ── Active chart income displayed ───────────────────────────────────────────
  const totalIncome = activePeriod === "Weekly" ? 4250.0 : 8420.0;
  const incomeGrowth = activePeriod === "Weekly" ? "+12.5%" : "+8.3%";

  // ── Summary Cards ────────────────────────────────────────────────────────────
  const summaryCards: SummaryCard[] = [
    {
      id: "savings",
      label: "Savings",
      amount: 8420,
      icon: "wallet-outline",
      iconBgColor: "#EEF2FF",
      iconColor: "#3B5BDB",
      accentColor: "#3B5BDB",
    },
    {
      id: "expenses",
      label: "Expenses",
      amount: 3150,
      icon: "receipt-outline",
      iconBgColor: "#EEF2FF",
      iconColor: "#6366F1",
      accentColor: "#6366F1",
    },
  ];

  // ── Spending Categories ───────────────────────────────────────────────────────
  const categories: SpendingCategory[] = [
    {
      id: "food",
      label: "Food & Dining",
      icon: "restaurant-outline",
      iconBgColor: "#FFF7ED",
      iconColor: "#F59E0B",
      amount: 450.2,
      maxAmount: 600,
      barColor: "#F59E0B",
    },
    {
      id: "transport",
      label: "Transport",
      icon: "car-outline",
      iconBgColor: "#EFF6FF",
      iconColor: "#3B82F6",
      amount: 210.5,
      maxAmount: 600,
      barColor: "#3B82F6",
    },
    {
      id: "shopping",
      label: "Shopping",
      icon: "bag-outline",
      iconBgColor: "#F5F3FF",
      iconColor: "#8B5CF6",
      amount: 1200.0,
      maxAmount: 1500,
      barColor: "#8B5CF6",
    },
    {
      id: "health",
      label: "Health",
      icon: "medical-outline",
      iconBgColor: "#FFF1F2",
      iconColor: "#F43F5E",
      amount: 180.0,
      maxAmount: 600,
      barColor: "#F43F5E",
    },
  ];

  // ── Formatters ───────────────────────────────────────────────────────────────
  const formatBalance = (n: number) =>
    `$${n.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;

  const formatAmount = (n: number) =>
    `$${n.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;

  const formatShort = (n: number) =>
    `$${n.toLocaleString("en-US", { minimumFractionDigits: 0 })}`;

  return {
    activePeriod,
    setActivePeriod,
    balance,
    balanceGrowth,
    chartData,
    totalIncome,
    incomeGrowth,
    summaryCards,
    categories,
    formatBalance,
    formatAmount,
    formatShort,
    user: { fullName: "Alex Rivers" },
  };
}
