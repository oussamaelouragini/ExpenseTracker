// features/dashboard/hooks/useDashboard.ts
// ✅ Logic & State only — all business logic here, zero UI

import { useState } from "react";
import { useUser } from "@/providers/UserProvider";
import type { QuickAction, Transaction } from "../types/dashboard.types";

export function useDashboard() {
  const [balance] = useState(48562.0);
  const [loading] = useState(false);
  const { user } = useUser();

  // ── Mock transactions — later tbadlhom bel API ──────────────────────────────
  const [transactions] = useState<Transaction[]>([
    {
      id: "1",
      title: "Apple Store",
      category: "Subscription",
      time: "2h ago",
      amount: -19.99,
      status: "APPROVED",
      icon: "bag-handle-outline",
      iconBgColor: "#F1F5F9",
      iconColor: "#475569",
    },
    {
      id: "2",
      title: "Salary Deposit",
      category: "Income",
      time: "Yesterday",
      amount: 4250.0,
      status: "COMPLETED",
      icon: "cash-outline",
      iconBgColor: "#DCFCE7",
      iconColor: "#16A34A",
    },
    {
      id: "3",
      title: "The Kitchen NYC",
      category: "Dining",
      time: "Oct 24",
      amount: -84.5,
      status: "APPROVED",
      icon: "restaurant-outline",
      iconBgColor: "#F1F5F9",
      iconColor: "#475569",
    },
  ]);

  // ── Quick Actions ────────────────────────────────────────────────────────────
  const quickActions: QuickAction[] = [
    {
      id: "send",
      label: "Send",
      icon: "arrow-redo-outline",
    },
    {
      id: "receive",
      label: "Receive",
      icon: "arrow-undo-outline",
    },
    {
      id: "cards",
      label: "Cards",
      icon: "card-outline",
    },
    {
      id: "more",
      label: "More",
      icon: "grid-outline",
    },
  ];

  // ── Format amount for display ────────────────────────────────────────────────
  const formatAmount = (amount: number): string => {
    const abs = Math.abs(amount).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return amount >= 0 ? `+$${abs}` : `-$${abs}`;
  };

  const formatBalance = (amount: number): string => {
    return `$${amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return {
    balance,
    loading,
    transactions,
    quickActions,
    formatAmount,
    formatBalance,
    user,
  };
}
