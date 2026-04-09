// features/wallet/hooks/useWallet.ts
// ✅ Logic & State only

import { useState } from "react";
import type { Account, Card, WalletActivity } from "../types/wallet.types";

export function useWallet() {
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  // ── Cards ─────────────────────────────────────────────────────────────────
  const cards: Card[] = [
    {
      id: "c1",
      label: "ACTIVE CARD",
      name: "Digital Black",
      last4: "1095",
      expiry: "08/28",
      network: "VISA",
      isDark: false,
      color1: "EEF2FF",
      color2: "E0E7FF",
    },
    {
      id: "c2",
      label: "SECOND CARD",
      name: "Travel Plus",
      last4: "4872",
      expiry: "03/27",
      network: "GLOBAL",
      isDark: true,
      color1: "1E293B",
      color2: "0F172A",
    },
  ];

  // ── Accounts ──────────────────────────────────────────────────────────────
  const accounts: Account[] = [
    {
      id: "a1",
      name: "Main Checking",
      bank: "Chase",
      last4: "4421",
      balance: 82400.0,
      icon: "business-outline",
      iconBgColor: "#EEF2FF",
      iconColor: "#3B5BDB",
    },
    {
      id: "a2",
      name: "Premium Savings",
      bank: "Vault",
      last4: "9002",
      balance: 42192.4,
      icon: "wallet-outline",
      iconBgColor: "#F5F3FF",
      iconColor: "#7C3AED",
      badge: "4.2% APY",
      badgeColor: "#16A34A",
    },
  ];

  // ── Activity ──────────────────────────────────────────────────────────────
  const activity: WalletActivity[] = [
    {
      id: "w1",
      title: "Apple Store Soho",
      time: "Today, 2:45 PM",
      amount: -1299.0,
      icon: "bag-handle-outline",
      iconBgColor: "#F1F5F9",
      iconColor: "#475569",
    },
    {
      id: "w2",
      title: "Nobu Downtown",
      time: "Yesterday, 9:15 PM",
      amount: -342.12,
      icon: "restaurant-outline",
      iconBgColor: "#F1F5F9",
      iconColor: "#475569",
    },
    {
      id: "w3",
      title: "Dividend Payout",
      time: "Oct 24, 10:00 AM",
      amount: +85.2,
      icon: "trending-up-outline",
      iconBgColor: "#EEF2FF",
      iconColor: "#3B5BDB",
    },
  ];

  // ── Total net worth — sum of all accounts ─────────────────────────────────
  const totalNetWorth = accounts.reduce((sum, a) => sum + a.balance, 0);

  // ── Formatters ────────────────────────────────────────────────────────────
  const formatBalance = (n: number) =>
    `$${n.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;

  const formatAmount = (n: number) => {
    const abs = Math.abs(n).toLocaleString("en-US", {
      minimumFractionDigits: 2,
    });
    return n >= 0 ? `+$${abs}` : `-$${abs}`;
  };

  return {
    cards,
    accounts,
    activity,
    totalNetWorth,
    activeCardIndex,
    setActiveCardIndex,
    formatBalance,
    formatAmount,
  };
}
