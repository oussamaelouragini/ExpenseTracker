// features/transactions/components/AddTransactionScreen.tsx
// ✅ Render (JSX) only

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  CATEGORIES,
  QUICK_ADD_ITEMS,
  useAddTransaction,
} from "../hooks/useAddTransaction";
import type {
  CategoryId,
  QuickAddItem,
  TransactionType,
} from "../types/transaction.types";
import { styles } from "./AddTransactionScreen.styles";

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

// ── 1. Header ─────────────────────────────────────────────────────────────────
function Header({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: () => void;
}) {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.closeBtn}
        onPress={onClose}
        activeOpacity={0.8}
      >
        <Ionicons name="close" size={20} color="#475569" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Add Transaction</Text>
      <TouchableOpacity
        style={styles.checkBtn}
        onPress={onSubmit}
        activeOpacity={0.85}
      >
        <Ionicons name="checkmark" size={22} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

// ── 2. Type Toggle (Expense / Income) ─────────────────────────────────────────
function TypeToggle({
  active,
  onChange,
}: {
  active: TransactionType;
  onChange: (t: TransactionType) => void;
}) {
  return (
    <View style={styles.toggleWrapper}>
      <View style={styles.toggleContainer}>
        {(["Expense", "Income"] as TransactionType[]).map((t) => (
          <TouchableOpacity
            key={t}
            style={[styles.toggleBtn, active === t && styles.toggleBtnActive]}
            onPress={() => onChange(t)}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.toggleText,
                active === t && styles.toggleTextActive,
              ]}
            >
              {t}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// ── 3. Amount Display ─────────────────────────────────────────────────────────
function AmountDisplay({ value }: { value: string }) {
  // Split into integer and decimal parts for big display
  const [intPart, decPart] = value.includes(".")
    ? value.split(".")
    : [value, "00"];

  return (
    <View style={styles.amountSection}>
      <Text style={styles.amountLabel}>AMOUNT</Text>
      <View style={styles.amountRow}>
        <Text style={styles.amountDollar}>$</Text>
        <Text style={styles.amountValue}>
          {parseInt(intPart).toLocaleString()}.{decPart.padEnd(2, "0")}
        </Text>
      </View>
    </View>
  );
}

// ── 4. Category Selector ──────────────────────────────────────────────────────
function CategorySelector({
  selected,
  onSelect,
}: {
  selected: CategoryId;
  onSelect: (id: CategoryId) => void;
}) {
  return (
    <>
      <View style={styles.sectionRow}>
        <Text style={styles.sectionLabel}>SELECT CATEGORY</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.categoriesRow}>
        {CATEGORIES.slice(0, 4).map((cat) => {
          const isActive = selected === cat.id;
          return (
            <TouchableOpacity
              key={cat.id}
              style={styles.categoryItem}
              onPress={() => onSelect(cat.id)}
              activeOpacity={0.8}
            >
              <View
                style={[
                  styles.categoryBox,
                  isActive && styles.categoryBoxActive,
                ]}
              >
                <Ionicons
                  name={cat.icon as any}
                  size={24}
                  color={isActive ? "#3B5BDB" : "#64748B"}
                />
              </View>
              <Text
                style={[
                  styles.categoryLabel,
                  isActive && styles.categoryLabelActive,
                ]}
              >
                {cat.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
}

// ── 5. Quick Add ──────────────────────────────────────────────────────────────
function QuickAdd({ onSelect }: { onSelect: (item: QuickAddItem) => void }) {
  return (
    <>
      <View style={styles.sectionRow}>
        <Text style={styles.sectionLabel}>QUICK ADD</Text>
      </View>
      <View style={styles.quickAddRow}>
        {QUICK_ADD_ITEMS.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.quickAddItem}
            onPress={() => onSelect(item)}
            activeOpacity={0.8}
          >
            <View
              style={[
                styles.quickAddIconWrapper,
                { backgroundColor: item.iconBgColor },
              ]}
            >
              <Ionicons
                name={item.icon as any}
                size={20}
                color={item.iconColor}
              />
            </View>
            <View>
              <Text style={styles.quickAddLabel}>{item.label}</Text>
              <Text style={styles.quickAddAmount}>
                ${item.amount.toFixed(2)}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
}

// ── 6. Numpad ─────────────────────────────────────────────────────────────────
const KEYS = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  [".", "0", "⌫"],
];

function Numpad({ onKey }: { onKey: (k: string) => void }) {
  return (
    <View style={styles.numpad}>
      {KEYS.map((row, ri) => (
        <View key={ri} style={styles.numpadRow}>
          {row.map((key) => (
            <TouchableOpacity
              key={key}
              style={styles.numpadKey}
              onPress={() => onKey(key)}
              activeOpacity={0.6}
            >
              {key === "⌫" ? (
                <Ionicons name="backspace-outline" size={26} color="#64748B" />
              ) : key === "." ? (
                <Text style={styles.numpadDot}>.</Text>
              ) : (
                <Text style={styles.numpadText}>{key}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Screen
// ─────────────────────────────────────────────────────────────────────────────
export default function AddTransactionScreen() {
  const router = useRouter();
  const {
    type,
    setType,
    displayAmount,
    selectedCat,
    setSelectedCat,
    handleKey,
    handleQuickAdd,
    handleSubmit,
  } = useAddTransaction();

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#F0F2F8" />

      {/* Header */}
      <Header onClose={() => router.back()} onSubmit={handleSubmit} />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* 1 — Expense / Income toggle */}
        <TypeToggle active={type} onChange={setType} />

        {/* 2 — Amount display */}
        <AmountDisplay value={displayAmount} />

        {/* 3 — Category selector */}
        <CategorySelector selected={selectedCat} onSelect={setSelectedCat} />

        {/* 4 — Quick Add */}
        <QuickAdd onSelect={handleQuickAdd} />

        {/* 5 — Numpad */}
        <Numpad onKey={handleKey} />
      </ScrollView>
    </SafeAreaView>
  );
}
