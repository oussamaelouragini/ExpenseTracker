// app/(tabs)/all-goals.tsx
// ✅ Screen that shows all active goals with progress

import { useGoalsStore } from "@/features/goals/store/goalsStore";
import type { ActiveGoal } from "@/features/goals/types/goals.types";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

function ProgressRing({ percent }: { percent: number }) {
  const rotation = (percent / 100) * 360;
  return (
    <View style={s.ringWrapper}>
      <View style={s.ringBg} />
      <View
        style={[
          s.ringFill,
          {
            borderTopColor: "#3B5BDB",
            borderRightColor: percent > 50 ? "#3B5BDB" : "transparent",
            transform: [{ rotate: `${rotation}deg` }],
          },
        ]}
      />
      <Text style={s.ringText}>{percent}%</Text>
    </View>
  );
}

function GoalCard({ goal, formatShort, formatBalance, getProgress, onDelete }: {
  goal: ActiveGoal;
  formatShort: (n: number) => string;
  formatBalance: (n: number) => string;
  getProgress: (s: number, t: number) => number;
  onDelete: (id: string) => void;
}) {
  const pct = getProgress(goal.savedAmount, goal.targetAmount);
  const remaining = goal.targetAmount - goal.savedAmount;
  
  return (
    <View style={s.goalCard}>
      <View style={s.goalTopRow}>
        <View style={[s.goalIcon, { backgroundColor: goal.iconBgColor }]}>
          <Ionicons name={goal.icon as any} size={24} color={goal.iconColor} />
        </View>
        <View style={s.topRight}>
          <ProgressRing percent={pct} />
          <TouchableOpacity style={s.deleteBtn} onPress={() => onDelete(goal.id)} activeOpacity={0.7}>
            <Ionicons name="trash-outline" size={18} color="#EF4444" />
          </TouchableOpacity>
        </View>
      </View>
      
      <Text style={s.goalName}>{goal.name}</Text>
      <Text style={s.goalCategory}>{goal.categoryId}</Text>
      
      <View style={s.goalAmounts}>
        <View style={s.amountBlock}>
          <Text style={s.amountLabel}>Saved</Text>
          <Text style={s.amountValue}>{formatBalance(goal.savedAmount)}</Text>
        </View>
        <View style={s.amountDivider} />
        <View style={s.amountBlock}>
          <Text style={s.amountLabel}>Target</Text>
          <Text style={s.amountValue}>{formatShort(goal.targetAmount)}</Text>
        </View>
        <View style={s.amountDivider} />
        <View style={s.amountBlock}>
          <Text style={s.amountLabel}>Remaining</Text>
          <Text style={[s.amountValue, s.amountRemaining]}>
            {formatShort(remaining)}
          </Text>
        </View>
      </View>
      
      <View style={s.goalFooter}>
        <View style={s.footerLeft}>
          <Ionicons name="time-outline" size={14} color="#64748B" />
          <Text style={s.footerText}>{goal.monthsRemaining} months left</Text>
        </View>
        <View style={s.progressBar}>
          <View style={[s.progressFill, { width: `${pct}%` }]} />
        </View>
      </View>
    </View>
  );
}

export default function AllGoalsScreen() {
  const router = useRouter();
  const goals = useGoalsStore((s) => s.goals);
  const deleteGoal = useGoalsStore((s) => s.deleteGoal);
  const [searchQuery, setSearchQuery] = React.useState("");

  const formatShort = (n: number): string => {
    if (n >= 1000) return `$${(n / 1000).toFixed(0)}k`;
    return `$${n.toLocaleString()}`;
  };

  const formatBalance = (n: number): string =>
    `$${n.toLocaleString("en-US", { minimumFractionDigits: 0 })}`;

  const getProgress = (saved: number, target: number): number =>
    Math.min(Math.round((saved / target) * 100), 100);

  const filteredGoals = searchQuery.trim()
    ? goals.filter((g) =>
        g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.categoryId.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : goals;

  return (
    <SafeAreaView style={s.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f7f9" />
      
      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity style={s.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#0F172A" />
        </TouchableOpacity>
        <Text style={s.headerTitle}>All Goals</Text>
        <View style={s.placeholder} />
      </View>

      {/* Search Bar */}
      <View style={s.searchWrapper}>
        <Ionicons name="search" size={20} color="#94A3B8" />
        <TextInput
          style={s.searchInput}
          placeholder="Search by name or category..."
          placeholderTextColor="#94A3B8"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <Ionicons name="close-circle" size={20} color="#94A3B8" />
          </TouchableOpacity>
        )}
      </View>

      {/* Results count */}
      {searchQuery.trim() && (
        <View style={s.resultsHeader}>
          <Text style={s.resultsText}>
            {filteredGoals.length}{filteredGoals.length === 1 ? " result" : " results"} for "{searchQuery}"
          </Text>
        </View>
      )}

      {/* Goals List */}
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        {filteredGoals.length === 0 ? (
          <View style={s.emptyState}>
            <Ionicons name="flag-outline" size={64} color="#CBD5E1" />
            <Text style={s.emptyText}>
              {searchQuery.trim() ? "No goals found" : "No active goals yet"}
            </Text>
            <Text style={s.emptySubText}>
              {searchQuery.trim()
                ? "Try searching for a different name or category"
                : "Create your first savings goal to get started"}
            </Text>
          </View>
        ) : (
          filteredGoals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              formatShort={formatShort}
              formatBalance={formatBalance}
              getProgress={getProgress}
              onDelete={deleteGoal}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f5f7f9" },
  scroll: { padding: 20, paddingBottom: 100 },
  
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  headerTitle: { fontSize: 20, fontWeight: "800", color: "#0F172A" },
  placeholder: { width: 44 },

  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingHorizontal: 16,
    marginHorizontal: 20,
    marginBottom: 10,
    height: 50,
    gap: 10,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  searchInput: { flex: 1, fontSize: 16, color: "#0F172A" },
  resultsHeader: { paddingHorizontal: 20, marginBottom: 10 },
  resultsText: { fontSize: 14, color: "#64748B", fontWeight: "500" },

  // Progress Ring
  ringWrapper: {
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
  },
  ringBg: {
    position: "absolute",
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 5,
    borderColor: "#E2E8F0",
  },
  ringFill: {
    position: "absolute",
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 5,
    borderColor: "transparent",
  },
  ringText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#3B5BDB",
  },

  // Goal Card
  goalCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  goalTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  topRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  deleteBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#FEE2E2",
    alignItems: "center",
    justifyContent: "center",
  },
  goalIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  goalName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 4,
  },
  goalCategory: {
    fontSize: 13,
    color: "#64748B",
    textTransform: "capitalize",
    marginBottom: 16,
  },
  goalAmounts: {
    flexDirection: "row",
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  amountBlock: { flex: 1, alignItems: "center" },
  amountDivider: {
    width: 1,
    backgroundColor: "#E2E8F0",
    marginHorizontal: 8,
  },
  amountLabel: {
    fontSize: 11,
    color: "#94A3B8",
    fontWeight: "600",
    marginBottom: 4,
    textTransform: "uppercase",
  },
  amountValue: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
  },
  amountRemaining: { color: "#3B5BDB" },
  goalFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  footerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  footerText: {
    fontSize: 12,
    color: "#64748B",
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: "#E2E8F0",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#3B5BDB",
    borderRadius: 3,
  },

  emptyState: { alignItems: "center", paddingVertical: 80, gap: 10 },
  emptyText: { fontSize: 17, fontWeight: "700", color: "#94A3B8" },
  emptySubText: { fontSize: 14, color: "#CBD5E1", textAlign: "center" },
});
