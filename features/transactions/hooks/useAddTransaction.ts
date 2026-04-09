// features/transactions/hooks/useAddTransaction.ts
// ✅ Logic & State only

import { useRouter } from "expo-router";
import { useState } from "react";
import { useTransactionStore } from "../store/transactionStore";
import type {
  Category,
  CategoryId,
  QuickAddItem,
  TransactionType,
} from "../types/transaction.types";

// ── Static Data ───────────────────────────────────────────────────────────────
export const CATEGORIES: Category[] = [
  {
    id: "shopping",
    label: "Shopping",
    icon: "bag-outline",
    iconBgColor: "#EEF2FF",
    iconColor: "#3B5BDB",
  },
  {
    id: "food",
    label: "Food",
    icon: "restaurant-outline",
    iconBgColor: "#FFF7ED",
    iconColor: "#F59E0B",
  },
  {
    id: "transport",
    label: "Transport",
    icon: "car-outline",
    iconBgColor: "#EFF6FF",
    iconColor: "#3B82F6",
  },
  {
    id: "rent",
    label: "Rent",
    icon: "home-outline",
    iconBgColor: "#F0FDF4",
    iconColor: "#22C55E",
  },
  {
    id: "health",
    label: "Health",
    icon: "medical-outline",
    iconBgColor: "#FFF1F2",
    iconColor: "#F43F5E",
  },
  {
    id: "salary",
    label: "Salary",
    icon: "cash-outline",
    iconBgColor: "#DCFCE7",
    iconColor: "#16A34A",
  },
];

export const QUICK_ADD_ITEMS: QuickAddItem[] = [
  {
    id: "q1",
    label: "Morning Coffee",
    amount: 4.5,
    icon: "cafe-outline",
    iconBgColor: "#FFF7ED",
    iconColor: "#F59E0B",
    categoryId: "food",
  },
  {
    id: "q2",
    label: "Uber Ride",
    amount: 12.0,
    icon: "car-outline",
    iconBgColor: "#EFF6FF",
    iconColor: "#3B82F6",
    categoryId: "transport",
  },
];

// ── Hook ──────────────────────────────────────────────────────────────────────
export function useAddTransaction() {
  const router = useRouter();
  const addTransaction = useTransactionStore((s) => s.addTransaction);

  const [type, setType] = useState<TransactionType>("Expense");
  const [amountStr, setAmountStr] = useState("0");
  const [selectedCat, setSelectedCat] = useState<CategoryId>("shopping");

  // ── Numpad handler ─────────────────────────────────────────────────────────
  const handleKey = (key: string) => {
    setAmountStr((prev) => {
      if (key === "⌫") {
        const next = prev.slice(0, -1);
        return next === "" ? "0" : next;
      }
      if (key === "." && prev.includes(".")) return prev;
      if (prev === "0" && key !== ".") return key;
      if (prev.includes(".")) {
        const decimals = prev.split(".")[1];
        if (decimals.length >= 2) return prev; // max 2 decimal places
      }
      return prev + key;
    });
  };

  // ── Quick Add ──────────────────────────────────────────────────────────────
  const handleQuickAdd = (item: QuickAddItem) => {
    setAmountStr(item.amount.toFixed(2));
    setSelectedCat(item.categoryId);
  };

  // ── Submit ─────────────────────────────────────────────────────────────────
  const handleSubmit = () => {
    const numericAmount = parseFloat(amountStr);
    if (!numericAmount || numericAmount <= 0) return;

    const category = CATEGORIES.find((c) => c.id === selectedCat)!;
    const finalAmount = type === "Expense" ? -numericAmount : numericAmount;

    addTransaction({
      title: category.label,
      category: category.label,
      categoryId: selectedCat,
      time: "Just now",
      amount: finalAmount,
      status: type === "Expense" ? "APPROVED" : "COMPLETED",
      icon: category.icon,
      iconBgColor: category.iconBgColor,
      iconColor: category.iconColor,
    });

    router.back(); // rouh lel dashboard
  };

  // ── Formatted display amount ───────────────────────────────────────────────
  const displayAmount = amountStr.includes(".") ? amountStr : `${amountStr}.00`;

  return {
    type,
    setType,
    amountStr,
    displayAmount,
    selectedCat,
    setSelectedCat,
    handleKey,
    handleQuickAdd,
    handleSubmit,
  };
}
