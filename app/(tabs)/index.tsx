// app/(tabs)/index.tsx — Home / Dashboard Screen
// ✅ Using real transactions from store — not mock data
// Every time a transaction is added, the dashboard updates automatically
// ⚠️ edges=["top","left","right"] — without "bottom" because tab bar is handled separately

import { useTransactionStore } from "@/features/transactions/store/transactionStore";
import type { Transaction } from "@/features/transactions/types/transaction.types";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// ─── Constants ────────────────────────────────────────────────────────────────
const USER = { fullName: "Alex Rivera" };

const QUICK_ACTIONS = [
  { id: "send", label: "Send", icon: "arrow-redo-outline" },
  { id: "receive", label: "Receive", icon: "arrow-undo-outline" },
  { id: "cards", label: "Cards", icon: "card-outline" },
  { id: "more", label: "More", icon: "grid-outline" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const formatBalance = (n: number) =>
  `$${n.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;

const formatAmount = (n: number) => {
  const abs = Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: 2 });
  return n >= 0 ? `+$${abs}` : `-$${abs}`;
};

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────
function Header() {
  const initials = USER.fullName
    .split(" ")
    .map((n) => n[0])
    .join("");
  return (
    <View style={s.header}>
      <View style={s.headerLeft}>
        <View style={s.avatar}>
          <Text style={s.avatarText}>{initials}</Text>
        </View>
        <View>
          <Text style={s.welcomeText}>WELCOME BACK,</Text>
          <Text style={s.userName}>{USER.fullName}</Text>
        </View>
      </View>
      <TouchableOpacity style={s.bellBtn}>
        <Ionicons name="notifications-outline" size={22} color="#1E2A4A" />
      </TouchableOpacity>
    </View>
  );
}

function BalanceCard({ balance }: { balance: number }) {
  return (
    <View style={s.balanceCard}>
      <View style={s.cardTopRow}>
        <Text style={s.balanceLabel}>Total Balance</Text>
        <View style={s.cardIconWrapper}>
          <Ionicons name="wallet-outline" size={22} color="#fff" />
        </View>
      </View>
      <Text style={s.balanceAmount}>{formatBalance(balance)}</Text>
      <View style={s.cardDivider} />
      <View style={s.cardBottomRow}>
        <View style={s.visaGroup}>
          <View style={s.visaCircle1}>
            <Text style={s.visaText}>VIS</Text>
          </View>
          <View style={s.visaCircle2}>
            <Ionicons name="ellipse" size={10} color="rgba(255,255,255,0.5)" />
          </View>
        </View>
        <TouchableOpacity style={s.viewDetailsBtn}>
          <Text style={s.viewDetailsText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function QuickActionsRow() {
  const router = useRouter();
  return (
    <View style={s.actionsRow}>
      {QUICK_ACTIONS.map((action) => (
        <TouchableOpacity
          key={action.id}
          style={s.actionItem}
          activeOpacity={0.8}
          onPress={() => {
            if (action.id === "cards") router.push("/(tabs)/wallet");
            if (action.id === "more") router.push("/(tabs)/stats");
          }}
        >
          <View style={s.actionCircle}>
            <Ionicons name={action.icon as any} size={22} color="#3B5BDB" />
          </View>
          <Text style={s.actionLabel}>{action.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

function TransactionItem({ tx }: { tx: Transaction }) {
  const isPos = tx.amount >= 0;
  return (
    <View style={s.txCard}>
      <View style={[s.txIcon, { backgroundColor: tx.iconBgColor }]}>
        <Ionicons name={tx.icon as any} size={22} color={tx.iconColor} />
      </View>
      <View style={s.txInfo}>
        <Text style={s.txTitle}>{tx.title}</Text>
        <Text style={s.txMeta}>
          {tx.category} • {tx.time}
        </Text>
      </View>
      <View style={s.txRight}>
        <Text style={[s.txAmount, isPos ? s.txPos : s.txNeg]}>
          {formatAmount(tx.amount)}
        </Text>
        <Text style={s.txStatus}>{tx.status}</Text>
      </View>
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Screen
// ─────────────────────────────────────────────────────────────────────────────
export default function HomeScreen() {
  // ✅ Real data from store — updates automatically after every new transaction
  const balance = useTransactionStore((s) => s.balance);
  const getRecentTransactions = useTransactionStore(
    (s) => s.getRecentTransactions,
  );
  const recentTransactions = getRecentTransactions(5);

  return (
    <SafeAreaView style={s.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#ECEEF5" />
      <ScrollView
        contentContainerStyle={s.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* 1 — Header */}
        <Header />

        {/* 2 — Balance Card (real balance from store) */}
        <BalanceCard balance={balance} />

        {/* 3 — Quick Actions */}
        <QuickActionsRow />

        {/* 4 — Recent Transactions (real data from store) */}
        <View style={s.sectionHeader}>
          <Text style={s.sectionTitle}>Recent Transactions</Text>
          <TouchableOpacity>
            <Text style={s.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        {recentTransactions.length === 0 ? (
          // Empty state
          <View style={s.emptyState}>
            <Ionicons name="receipt-outline" size={48} color="#CBD5E1" />
            <Text style={s.emptyText}>No transactions yet</Text>
            <Text style={s.emptySubText}>
              Press + to add your first transaction
            </Text>
          </View>
        ) : (
          recentTransactions.map((tx) => (
            <TransactionItem key={tx.id} tx={tx} />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#ECEEF5" },
  scroll: { padding: 20, paddingBottom: 16 },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: "#F4C99A",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { fontSize: 18, fontWeight: "800", color: "#fff" },
  welcomeText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#94A3B8",
    letterSpacing: 1.5,
    marginBottom: 2,
  },
  userName: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
    letterSpacing: -0.3,
  },
  bellBtn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },

  balanceCard: {
    borderRadius: 28,
    padding: 24,
    marginBottom: 28,
    backgroundColor: "#3B5BDB",
    shadowColor: "#3B5BDB",
    shadowOpacity: 0.45,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 10 },
    elevation: 12,
  },
  cardTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  balanceLabel: {
    fontSize: 14,
    color: "rgba(255,255,255,0.75)",
    fontWeight: "500",
  },
  cardIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  balanceAmount: {
    fontSize: 38,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: -1,
    marginBottom: 20,
  },
  cardDivider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.2)",
    marginBottom: 20,
  },
  cardBottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  visaGroup: { flexDirection: "row", alignItems: "center" },
  visaCircle1: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#1A3CB8",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.3)",
  },
  visaCircle2: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#2D4ED8",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -14,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.3)",
  },
  visaText: { fontSize: 9, fontWeight: "800", color: "#fff" },
  viewDetailsBtn: {
    backgroundColor: "#fff",
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  viewDetailsText: { fontSize: 14, fontWeight: "700", color: "#3B5BDB" },

  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
    paddingHorizontal: 8,
  },
  actionItem: { alignItems: "center", gap: 10 },
  actionCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  actionLabel: { fontSize: 13, fontWeight: "500", color: "#475569" },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0F172A",
    letterSpacing: -0.4,
  },
  seeAll: { fontSize: 15, fontWeight: "600", color: "#3B5BDB" },

  txCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  txIcon: {
    width: 50,
    height: 50,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  txInfo: { flex: 1 },
  txTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 4,
  },
  txMeta: { fontSize: 13, color: "#94A3B8" },
  txRight: { alignItems: "flex-end" },
  txAmount: { fontSize: 16, fontWeight: "700", marginBottom: 4 },
  txPos: { color: "#16A34A" },
  txNeg: { color: "#0F172A" },
  txStatus: {
    fontSize: 10,
    fontWeight: "600",
    color: "#94A3B8",
    letterSpacing: 0.8,
  },

  emptyState: { alignItems: "center", paddingVertical: 48, gap: 10 },
  emptyText: { fontSize: 17, fontWeight: "700", color: "#94A3B8" },
  emptySubText: { fontSize: 14, color: "#CBD5E1" },
});
