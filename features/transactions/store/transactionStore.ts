// features/transactions/store/transactionStore.ts
// ✅ This is the important file — shared state between Dashboard and Add Transaction
// Install: npm install zustand

import { create } from "zustand";
import type { Transaction } from "../types/transaction.types";

// ─ Initial mock transactions (same as old dashboard) ───────────────────
const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: "1",
    title: "Apple Store",
    category: "Subscription",
    categoryId: "shopping",
    time: "2h ago",
    amount: -19.99,
    status: "APPROVED",
    icon: "bag-handle-outline",
    iconBgColor: "#F1F5F9",
    iconColor: "#475569",
    createdAt: Date.now() - 7200000,
  },
  {
    id: "2",
    title: "Salary Deposit",
    category: "Income",
    categoryId: "salary",
    time: "Yesterday",
    amount: 4250.0,
    status: "COMPLETED",
    icon: "cash-outline",
    iconBgColor: "#DCFCE7",
    iconColor: "#16A34A",
    createdAt: Date.now() - 86400000,
  },
  {
    id: "3",
    title: "The Kitchen NYC",
    category: "Dining",
    categoryId: "food",
    time: "Oct 24",
    amount: -84.5,
    status: "APPROVED",
    icon: "restaurant-outline",
    iconBgColor: "#F1F5F9",
    iconColor: "#475569",
    createdAt: Date.now() - 172800000,
  },
];

// ── Store Interface ───────────────────────────────────────────────────────────
interface TransactionStore {
  transactions: Transaction[];
  balance: number;

  addTransaction: (tx: Omit<Transaction, "id" | "createdAt">) => void;
  deleteTransaction: (id: string) => void;
  getRecentTransactions: (limit?: number) => Transaction[];
}

// ── Store ─────────────────────────────────────────────────────────────────────
export const useTransactionStore = create<TransactionStore>((set, get) => ({
  transactions: INITIAL_TRANSACTIONS,
  balance: 48562.0,

  // ── Add new transaction ────────────────────────────────────────────────────
  addTransaction: (tx) => {
    const newTx: Transaction = {
      ...tx,
      id: Date.now().toString(),
      createdAt: Date.now(),
    };

    set((state) => ({
      transactions: [newTx, ...state.transactions],
      balance: state.balance + tx.amount, // positif = income, negatif = expense
    }));
  },

  // ── Delete transaction ─────────────────────────────────────────────────────
  deleteTransaction: (id) => {
    const tx = get().transactions.find((t) => t.id === id);
    if (!tx) return;

    set((state) => ({
      transactions: state.transactions.filter((t) => t.id !== id),
      balance: state.balance - tx.amount,
    }));
  },

  // ── Get recent (dashboard yesta3mlha) ──────────────────────────────────────
  getRecentTransactions: (limit = 5) => {
    return get()
      .transactions.slice()
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, limit);
  },
}));
