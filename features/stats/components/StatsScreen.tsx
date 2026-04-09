// features/stats/components/StatsScreen.tsx
// ✅ Render (JSX) only — all UI elements here with real chart

import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useStats } from "../hooks/useStats";
import type {
  ChartDataPoint,
  SpendingCategory,
  SummaryCard,
  TabPeriod,
} from "../types/stats.types";
import { CHART_HEIGHT, styles } from "./StatsScreen.styles";

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

// ── 1. Header ─────────────────────────────────────────────────────────────────
function Header({ userName }: { userName: string }) {
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <View style={styles.avatarCircle}>
          <Ionicons name="person" size={22} color="#3B5BDB" />
        </View>
        <View>
          <Text style={styles.welcomeSmall}>Welcome back,</Text>
          <Text style={styles.headerName}>{userName}</Text>
        </View>
      </View>
      <View style={styles.headerRight}>
        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="search-outline" size={20} color="#475569" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="notifications" size={20} color="#475569" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ── 2. Balance Card ───────────────────────────────────────────────────────────
function BalanceCard({
  balance,
  growth,
  formatBalance,
}: {
  balance: number;
  growth: string;
  formatBalance: (n: number) => string;
}) {
  return (
    <View style={styles.balanceCard}>
      <Text style={styles.balanceLabel}>Total Balance</Text>
      <Text style={styles.balanceAmount}>{formatBalance(balance)}</Text>
      <View style={styles.growthBadge}>
        <Ionicons name="trending-up" size={14} color="#fff" />
        <Text style={styles.growthText}>{growth}</Text>
        <Text style={styles.growthSub}>from last month</Text>
      </View>
    </View>
  );
}

// ── 3. Period Toggle ──────────────────────────────────────────────────────────
function PeriodToggle({
  active,
  onChange,
}: {
  active: TabPeriod;
  onChange: (p: TabPeriod) => void;
}) {
  return (
    <View style={styles.periodToggle}>
      {(["Weekly", "Monthly"] as TabPeriod[]).map((p) => (
        <TouchableOpacity
          key={p}
          style={[styles.periodBtn, active === p && styles.periodBtnActive]}
          onPress={() => onChange(p)}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.periodBtnText,
              active === p && styles.periodBtnTextActive,
            ]}
          >
            {p}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

// ── 4. Real Bar Chart ─────────────────────────────────────────────────────────
function BarChart({
  data,
  totalIncome,
  incomeGrowth,
}: {
  data: ChartDataPoint[];
  totalIncome: number;
  incomeGrowth: string;
}) {
  // Find max value to scale bars
  const maxVal = Math.max(...data.flatMap((d) => [d.income, d.expense]));
  const chartInnerHeight = CHART_HEIGHT - 24;

  const getBarHeight = (val: number) =>
    Math.max(4, (val / maxVal) * chartInnerHeight);

  // Wednesday = active day (index 2 for weekly)
  const activeIndex = data.length === 7 ? 2 : 9;

  return (
    <View style={styles.chartCard}>
      {/* Top info */}
      <View style={styles.chartTopRow}>
        <View>
          <Text style={styles.chartLabel}>Income vs Expenses</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.chartAmount}>
              $
              {totalIncome.toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </Text>
            <Text style={styles.chartGrowth}>{incomeGrowth}</Text>
          </View>
        </View>
        {/* Legend */}
        <View style={styles.legendRow}>
          <View style={[styles.legendDot, { backgroundColor: "#3B5BDB" }]} />
          <Text style={styles.legendText}>Income</Text>
          <View style={[styles.legendDot, { backgroundColor: "#CBD5E1" }]} />
          <Text style={styles.legendText}>Exp.</Text>
        </View>
      </View>

      {/* Bars */}
      <View style={styles.chartContainer}>
        {data.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <View key={item.day} style={styles.barGroup}>
              <View style={styles.barWrapper}>
                {/* Income bar */}
                <View
                  style={[
                    styles.bar,
                    styles.barIncome,
                    {
                      height: getBarHeight(item.income),
                      opacity: isActive ? 1 : 0.35,
                    },
                  ]}
                />
                {/* Expense bar */}
                <View
                  style={[
                    styles.bar,
                    styles.barExpense,
                    {
                      height: getBarHeight(item.expense),
                      opacity: isActive ? 1 : 0.5,
                    },
                  ]}
                />
              </View>
              <View style={styles.barLabelRow}>
                <Text
                  style={[styles.barLabel, isActive && styles.barLabelActive]}
                >
                  {item.day}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

// ── 5. Summary Cards ──────────────────────────────────────────────────────────
function SummaryCards({
  cards,
  formatShort,
}: {
  cards: SummaryCard[];
  formatShort: (n: number) => string;
}) {
  return (
    <View style={styles.summaryRow}>
      {cards.map((card) => (
        <View key={card.id} style={styles.summaryCard}>
          {/* Left accent bar */}
          <View
            style={[
              styles.summaryCardAccent,
              { backgroundColor: card.accentColor },
            ]}
          />
          {/* Icon */}
          <View
            style={[
              styles.summaryIconWrapper,
              { backgroundColor: card.iconBgColor },
            ]}
          >
            <Ionicons
              name={card.icon as any}
              size={20}
              color={card.iconColor}
            />
          </View>
          <Text style={styles.summaryLabel}>{card.label}</Text>
          <Text style={styles.summaryAmount}>{formatShort(card.amount)}</Text>
          {/* Underline accent */}
          <View
            style={[
              styles.summaryUnderline,
              { backgroundColor: card.accentColor },
            ]}
          />
        </View>
      ))}
    </View>
  );
}

// ── 6. Spending Category Item ─────────────────────────────────────────────────
function CategoryItem({
  category,
  formatAmount,
}: {
  category: SpendingCategory;
  formatAmount: (n: number) => string;
}) {
  const progress = Math.min(category.amount / category.maxAmount, 1);

  return (
    <View style={styles.categoryCard}>
      {/* Icon */}
      <View
        style={[
          styles.categoryIconWrapper,
          { backgroundColor: category.iconBgColor },
        ]}
      >
        <Ionicons
          name={category.icon as any}
          size={22}
          color={category.iconColor}
        />
      </View>

      {/* Label + Progress */}
      <View style={styles.categoryInfo}>
        <Text style={styles.categoryLabel}>{category.label}</Text>
        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${progress * 100}%`,
                backgroundColor: category.barColor,
              },
            ]}
          />
        </View>
      </View>

      {/* Amount */}
      <Text style={styles.categoryAmount}>{formatAmount(category.amount)}</Text>
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────────────────────
export default function StatsScreen() {
  const {
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
    user,
  } = useStats();

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="#F0F2F8" />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {/* 1 — Header */}
          <Header userName={user.fullName} />

          {/* 2 — Balance Card */}
          <BalanceCard
            balance={balance}
            growth={balanceGrowth}
            formatBalance={formatBalance}
          />

          {/* 3 — Analysis title + Period Toggle */}
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Analysis</Text>
            <PeriodToggle active={activePeriod} onChange={setActivePeriod} />
          </View>

          {/* 4 — Bar Chart */}
          <BarChart
            data={chartData}
            totalIncome={totalIncome}
            incomeGrowth={incomeGrowth}
          />

          {/* 5 — Summary Cards */}
          <SummaryCards cards={summaryCards} formatShort={formatShort} />

          {/* 6 — Spending Categories */}
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Spending Categories</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          {categories.map((cat) => (
            <CategoryItem
              key={cat.id}
              category={cat}
              formatAmount={formatAmount}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
