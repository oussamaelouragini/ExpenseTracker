// features/goals/components/GoalsScreen.tsx — UPDATED
// ✅ AI card now uses GREEN gradient (#3d7d5f → #1a5c42)
// ✅ FAB uses GREEN gradient
// Only changed: LinearGradient colors

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useExploreGoals } from "../hooks/useExploreGoals";
import { EXPLORE_FEATURED_ID } from "../hooks/useGoalsData";
import type { ActiveGoal, GoalCategory } from "../types/goals.types";
import { C, styles } from "./GoalsScreen.styles";

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

function Header() {
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <View style={styles.avatarImg}>
          <Ionicons name="person" size={20} color={C.onVariant} />
        </View>
        <Text style={styles.headerBrand}>Vault</Text>
      </View>
      <TouchableOpacity style={styles.bellBtn}>
        <Ionicons name="notifications" size={22} color={C.primary} />
      </TouchableOpacity>
    </View>
  );
}

function ProgressRing({ percent }: { percent: number }) {
  const rotation = (percent / 100) * 360;
  return (
    <View style={styles.ringWrapper}>
      <View style={styles.ringBg} />
      <View
        style={[
          styles.ringFill,
          {
            borderTopColor: C.primary,
            borderRightColor: percent > 50 ? C.primary : "transparent",
            transform: [{ rotate: `${rotation}deg` }],
          },
        ]}
      />
      <Text style={styles.ringText}>{percent}%</Text>
    </View>
  );
}

function ActiveProgressCard({
  goal,
  formatShort,
  formatBalance,
  getProgress,
}: {
  goal: ActiveGoal;
  formatShort: (n: number) => string;
  formatBalance: (n: number) => string;
  getProgress: (s: number, t: number) => number;
}) {
  const pct = getProgress(goal.savedAmount, goal.targetAmount);
  return (
    <View style={styles.progressCard}>
      <View style={styles.progressCardTop}>
        <View
          style={[
            styles.progressIconWrapper,
            { backgroundColor: goal.iconBgColor },
          ]}
        >
          <Ionicons name={goal.icon as any} size={20} color={goal.iconColor} />
        </View>
        <ProgressRing percent={pct} />
      </View>
      <Text style={styles.progressGoalName}>{goal.name}</Text>
      <Text style={styles.progressMonths}>
        {goal.monthsRemaining} months remaining
      </Text>
      <View style={styles.progressAmountRow}>
        <Text style={styles.progressSaved}>
          {formatBalance(goal.savedAmount)}
        </Text>
        <Text style={styles.progressTarget}>
          of {formatShort(goal.targetAmount)}
        </Text>
      </View>
    </View>
  );
}

// ✅ AI card — GREEN gradient now
function AIAssistantCard() {
  return (
    <LinearGradient
      colors={[C.aiGradStart, C.aiGradEnd]} // ✅ green → deep green
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.aiCard}
    >
      <View style={styles.aiTopRow}>
        <Ionicons name="sparkles" size={16} color="rgba(255,255,255,0.9)" />
        <Text style={styles.aiLabel}>VAULT AI ASSISTANT</Text>
      </View>
      <Text style={styles.aiTitle}>Maximize Your Potential</Text>
      <Text style={styles.aiBody}>
        Based on your spare cash trend, you could save an extra{" "}
        <Text style={styles.aiHighlight}>$240 monthly</Text> for an investment
        goal.
      </Text>
      <TouchableOpacity style={styles.aiBtn} activeOpacity={0.85}>
        <Text style={styles.aiBtnText}>Accept Tip</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

function FeaturedExploreCard({
  category,
  onPress,
}: {
  category: GoalCategory;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={styles.featuredCard}
      activeOpacity={0.9}
      onPress={onPress}
    >
      <View
        style={[
          styles.featuredIconWrapper,
          { backgroundColor: category.iconBgColor },
        ]}
      >
        <Ionicons
          name={category.icon as any}
          size={26}
          color={category.iconColor}
        />
      </View>
      <Text style={styles.featuredTitle}>{category.label}</Text>
      <Text style={styles.featuredDesc}>{category.description}</Text>
      <View style={styles.featuredLink}>
        <Text style={styles.featuredLinkText}>Choose Category</Text>
        <Ionicons name="arrow-forward" size={16} color={C.primary} />
      </View>
    </TouchableOpacity>
  );
}

function ExploreRow({
  category,
  onPress,
}: {
  category: GoalCategory;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={styles.exploreCard}
      activeOpacity={0.85}
      onPress={onPress}
    >
      <View
        style={[
          styles.exploreIconWrapper,
          { backgroundColor: category.iconBgColor },
        ]}
      >
        <Ionicons
          name={category.icon as any}
          size={22}
          color={category.iconColor}
        />
      </View>
      <View style={styles.exploreInfo}>
        <Text style={styles.exploreTitle}>{category.label}</Text>
        <Text style={styles.exploreDesc}>{category.description}</Text>
      </View>
    </TouchableOpacity>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Screen
// ─────────────────────────────────────────────────────────────────────────────
export default function GoalsScreen() {
  const router = useRouter();
  const { goals, categories, formatShort, formatBalance, getProgress } =
    useExploreGoals();

  const featuredCat = categories.find((c) => c.id === EXPLORE_FEATURED_ID)!;
  const regularCats = categories.filter((c) => c.id !== EXPLORE_FEATURED_ID);

  const handleCreateGoal = () => router.push("/(tabs)/goals/create");
  const handleCategoryPress = () => router.push("/(tabs)/goals/create");

  return (
    <View style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={C.surface} />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Header />

          <Text style={styles.pageTitle}>Savings Goals</Text>
          <Text style={styles.pageSubtitle}>
            Dream big, save smart, reach faster.
          </Text>

          {goals.length > 0 && (
            <>
              <View style={styles.sectionRow}>
                <Text style={styles.sectionTitle}>Active Progress</Text>
                <TouchableOpacity>
                  <Text style={styles.seeAllText}>View Details</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={goals}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.progressScroll}
                renderItem={({ item }) => (
                  <ActiveProgressCard
                    goal={item}
                    formatShort={formatShort}
                    formatBalance={formatBalance}
                    getProgress={getProgress}
                  />
                )}
              />
            </>
          )}

          {/* ✅ GREEN gradient AI card */}
          <AIAssistantCard />

          <View style={[styles.sectionRow, { marginBottom: 16 }]}>
            <Text style={styles.sectionTitle}>Explore New Goals</Text>
          </View>

          <FeaturedExploreCard
            category={featuredCat}
            onPress={handleCategoryPress}
          />

          {regularCats.map((cat) => (
            <ExploreRow
              key={cat.id}
              category={cat}
              onPress={handleCategoryPress}
            />
          ))}
        </View>
      </ScrollView>

      {/* ✅ FAB — green, no longer needed here because tab bar handles it */}
      {/* Kept as in-screen FAB for extra accessibility */}
      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.85}
        onPress={handleCreateGoal}
      >
        <LinearGradient
          colors={[C.gradStart, C.gradEnd]} // ✅ green gradient
          style={{
            width: 56,
            height: 56,
            borderRadius: 28,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name="add" size={28} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}
