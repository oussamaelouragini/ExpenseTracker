// features/dashboard/components/DashboardScreen.tsx
// ✅ Render (JSX) only — all UI elements here

import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDashboard } from "../hooks/useDashboard";
import type { QuickAction, Transaction } from "../types/dashboard.types";
import { styles } from "./Dashboardscreen.styles";

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components — each section has its own component
// ─────────────────────────────────────────────────────────────────────────────

// ── 1. Header ─────────────────────────────────────────────────────────────────
function Header({ userName }: { userName: string }) {
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        {/* Avatar */}
        <View style={styles.avatar}>
          <Text style={styles.avatarPlaceholder}>{initials}</Text>
        </View>
        {/* Name */}
        <View>
          <Text style={styles.welcomeText}>WELCOME BACK,</Text>
          <Text style={styles.userName}>{userName}</Text>
        </View>
      </View>

      {/* Bell */}
      <TouchableOpacity style={styles.bellBtn} activeOpacity={0.8}>
        <Ionicons name="notifications-outline" size={22} color="#1E2A4A" />
      </TouchableOpacity>
    </View>
  );
}

// ── 2. Balance Card ───────────────────────────────────────────────────────────
function BalanceCard({
  balance,
  formatBalance,
}: {
  balance: number;
  formatBalance: (n: number) => string;
}) {
  return (
    <View style={styles.balanceCard}>
      {/* Top row — label + wallet icon */}
      <View style={styles.cardTopRow}>
        <Text style={styles.balanceLabel}>Total Balance</Text>
        <View style={styles.cardIconWrapper}>
          <Ionicons name="wallet-outline" size={22} color="#fff" />
        </View>
      </View>

      {/* Amount */}
      <Text style={styles.balanceAmount}>{formatBalance(balance)}</Text>

      {/* Divider */}
      <View style={styles.cardDivider} />

      {/* Bottom row — VISA circles + View Details */}
      <View style={styles.cardBottomRow}>
        {/* VISA overlapping circles */}
        <View style={styles.visaGroup}>
          <View style={styles.visaCircle}>
            <Text style={styles.visaText}>VIS</Text>
          </View>
          <View style={styles.visaCircle2}>
            <Ionicons name="ellipse" size={12} color="rgba(255,255,255,0.6)" />
          </View>
        </View>

        {/* View Details Button */}
        <TouchableOpacity style={styles.viewDetailsBtn} activeOpacity={0.85}>
          <Text style={styles.viewDetailsText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ── 3. Quick Actions ──────────────────────────────────────────────────────────
function QuickActions({ actions }: { actions: QuickAction[] }) {
  return (
    <View style={styles.actionsRow}>
      {actions.map((action) => (
        <TouchableOpacity
          key={action.id}
          style={styles.actionItem}
          onPress={action.onPress}
          activeOpacity={0.8}
          disabled={!action.onPress}
        >
          <View style={styles.actionCircle}>
            <Ionicons name={action.icon as any} size={22} color="#3B5BDB" />
          </View>
          <Text style={styles.actionLabel}>{action.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

// ── 4. Transaction Item ───────────────────────────────────────────────────────
function TransactionItem({
  transaction,
  formatAmount,
}: {
  transaction: Transaction;
  formatAmount: (n: number) => string;
}) {
  const isPositive = transaction.amount >= 0;

  return (
    <View style={styles.transactionCard}>
      {/* Icon */}
      <View
        style={[
          styles.txIconWrapper,
          { backgroundColor: transaction.iconBgColor },
        ]}
      >
        <Ionicons
          name={transaction.icon as any}
          size={22}
          color={transaction.iconColor}
        />
      </View>

      {/* Info */}
      <View style={styles.txInfo}>
        <Text style={styles.txTitle}>{transaction.title}</Text>
        <Text style={styles.txMeta}>
          {transaction.category} • {transaction.time}
        </Text>
      </View>

      {/* Amount + Status */}
      <View style={styles.txRight}>
        <Text
          style={[
            styles.txAmount,
            isPositive ? styles.txAmountPos : styles.txAmountNeg,
          ]}
        >
          {formatAmount(transaction.amount)}
        </Text>
        <Text style={styles.txStatus}>{transaction.status}</Text>
      </View>
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────────────────────
export default function DashboardScreen() {
  const {
    balance,
    transactions,
    quickActions,
    formatAmount,
    formatBalance,
    user,
  } = useDashboard();

  return (
    <View style={{ flex: 1, backgroundColor: "#ECEEF5" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#ECEEF5" />

      {/* Scrollable content */}
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {/* 1 — Header */}
          <Header userName={user.fullName} />

          {/* 2 — Balance Card */}
          <BalanceCard balance={balance} formatBalance={formatBalance} />

          {/* 3 — Quick Actions */}
          <QuickActions actions={quickActions} />

          {/* 4 — Recent Transactions */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          {transactions.map((tx) => (
            <TransactionItem
              key={tx.id}
              transaction={tx}
              formatAmount={formatAmount}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
