// features/goals/components/CreateGoalScreen.tsx
// ✅ Create Goal multi-step form

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Keyboard,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useGoalsStore } from "../store/goalsStore";
import type { CreateGoalForm, DepositFrequency, GoalDuration } from "../types/goals.types";
import { createStyles as s } from "./CreateGoalScreen.styles";

const CATEGORY_ICONS = [
  { id: "travel", icon: "airplane-outline", color: "#3B5BDB", bg: "#EEF2FF", label: "Travel" },
  { id: "home", icon: "home-outline", color: "#F59E0B", bg: "#FEF3C7", label: "Home" },
  { id: "car", icon: "car-outline", color: "#10B981", bg: "#D1FAE5", label: "Car" },
  { id: "education", icon: "school-outline", color: "#8B5CF6", bg: "#EDE9FE", label: "Education" },
  { id: "investment", icon: "trending-up-outline", color: "#06B6D4", bg: "#CFFAFE", label: "Investment" },
  { id: "tech", icon: "laptop-outline", color: "#6366F1", bg: "#E0E7FF", label: "Tech" },
  { id: "emergency", icon: "medkit-outline", color: "#EF4444", bg: "#FEE2E2", label: "Emergency" },
  { id: "other", icon: "ellipsis-horizontal-outline", color: "#64748B", bg: "#F1F5F9", label: "Other" },
];

const DURATIONS: { value: GoalDuration; label: string }[] = [
  { value: "6mo", label: "6 Months" },
  { value: "12mo", label: "1 Year" },
  { value: "2yrs", label: "2 Years" },
];

const FREQUENCIES: DepositFrequency[] = ["Weekly", "Monthly"];

const QUICK_AMOUNTS = [1000, 5000, 10000, 25000];

export default function CreateGoalScreen() {
  const router = useRouter();
  const addGoal = useGoalsStore((state) => state.addGoal);

  const [step, setStep] = useState(1);
  const [form, setForm] = useState<CreateGoalForm>({
    categoryId: "travel",
    targetAmount: "",
    goalName: "",
    targetDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    duration: "12mo",
    frequency: "Monthly",
  });

  const selectedCat = CATEGORY_ICONS.find((c) => c.id === form.categoryId)!;
  const amount = parseFloat(form.targetAmount) || 0;
  const months = form.duration === "6mo" ? 6 : form.duration === "12mo" ? 12 : 24;
  const depositsPerMonth = form.frequency === "Weekly" ? 4.33 : 1;
  const estimatedDeposit = amount > 0 ? Math.round(amount / (months * depositsPerMonth)) : 0;

  const updateForm = (updates: Partial<CreateGoalForm>) =>
    setForm((prev) => ({ ...prev, ...updates }));

  const handleBack = () => {
    if (step > 1) {
      setStep((s) => s - 1);
    } else {
      router.back();
    }
  };

  const handleCreate = () => {
    addGoal(form);
    router.back();
  };

  const canProceed =
    step === 1 ||
    (step === 2 && amount > 0) ||
    (step === 3 && form.goalName.trim().length > 0);

  const renderStep1 = () => (
    <>
      <View style={s.iconPreviewWrapper}>
        <View style={[s.iconPreviewCircle, { backgroundColor: selectedCat.bg }]}>
          <Ionicons name={selectedCat.icon as any} size={48} color={selectedCat.color} />
        </View>
        <Text style={{ fontSize: 16, fontWeight: "600", color: "#64748B", marginTop: 12 }}>
          {selectedCat.label}
        </Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.categoriesScroll}>
        {CATEGORY_ICONS.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={[
              s.categoryPill,
              form.categoryId === cat.id && s.categoryPillActive,
              form.categoryId === cat.id && { backgroundColor: cat.color },
            ]}
            onPress={() => updateForm({ categoryId: cat.id as any })}
          >
            <Ionicons
              name={cat.icon as any}
              size={24}
              color={form.categoryId === cat.id ? "#fff" : "#64748B"}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );

  const renderStep2 = () => (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <View style={s.amountWrapper}>
          <Text style={s.fieldLabel}>HOW MUCH DO YOU NEED?</Text>
          <View style={s.amountRow}>
            <Text style={s.amountDollar}>$</Text>
            <TextInput
              style={s.amountValue}
              placeholder="0"
              placeholderTextColor="#E2E8F0"
              keyboardType="numeric"
              value={form.targetAmount}
              onChangeText={(t) => updateForm({ targetAmount: t.replace(/[^0-9]/g, "") })}
              autoFocus
            />
          </View>
          <Text style={s.amountHint}>Enter your savings goal amount</Text>
        </View>

        <Text style={[s.fieldLabel, { textAlign: "center", marginBottom: 14 }]}>
          QUICK SELECT
        </Text>
        <View style={s.quickAmountsWrapper}>
          {QUICK_AMOUNTS.map((q) => (
            <TouchableOpacity
              key={q}
              style={[
                s.quickAmountBtn,
                form.targetAmount === q.toString() && s.quickAmountBtnActive,
              ]}
              onPress={() => updateForm({ targetAmount: q.toString() })}
            >
              <Text
                style={[
                  s.quickAmountText,
                  form.targetAmount === q.toString() && s.quickAmountTextActive,
                ]}
              >
                ${(q / 1000).toFixed(0)}k
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );

  const renderStep3 = () => (
    <>
      <View style={s.summaryCard}>
        <View style={s.summaryRow}>
          <View style={s.summaryItem}>
            <Text style={s.summaryLabel}>Category</Text>
            <Text style={s.summaryValue}>{selectedCat.label}</Text>
          </View>
          <View style={s.summaryDivider} />
          <View style={s.summaryItem}>
            <Text style={s.summaryLabel}>Target</Text>
            <Text style={s.summaryValue}>${amount.toLocaleString()}</Text>
          </View>
        </View>
      </View>

      <View style={s.fieldCard}>
        <Text style={s.fieldLabel}>NAME YOUR GOAL</Text>
        <TextInput
          style={s.goalNameInput}
          placeholder="My Savings Goal"
          placeholderTextColor="#CBD5E1"
          value={form.goalName}
          onChangeText={(t) => updateForm({ goalName: t })}
        />
      </View>

      <View style={[s.fieldCard, { marginBottom: 8 }]}>
        <Text style={s.fieldLabel}>DURATION</Text>
        <View style={s.durationRow}>
          {DURATIONS.map((d) => (
            <TouchableOpacity
              key={d.value}
              style={[s.durationPill, form.duration === d.value && s.durationPillActive]}
              onPress={() => updateForm({ duration: d.value })}
            >
              <Ionicons
                name={d.value === "6mo" ? "time-outline" : d.value === "12mo" ? "calendar-outline" : "calendar-outline"}
                size={18}
                color={form.duration === d.value ? "#fff" : "#94A3B8"}
                style={{ marginBottom: 4 }}
              />
              <Text
                style={[
                  s.durationText,
                  form.duration === d.value && s.durationTextActive,
                ]}
              >
                {d.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={s.fieldCard}>
        <Text style={s.fieldLabel}>FREQUENCY</Text>
        {FREQUENCIES.map((freq, i) => (
          <TouchableOpacity
            key={freq}
            style={[s.frequencyOption, i === FREQUENCIES.length - 1 && s.frequencyOptionLast]}
            onPress={() => updateForm({ frequency: freq })}
          >
            <View style={s.frequencyLeft}>
              <View style={[s.freqIcon, form.frequency === freq && { backgroundColor: "#EEF2FF" }]}>
                <Ionicons
                  name={freq === "Weekly" ? "repeat-outline" : "calendar-outline"}
                  size={20}
                  color={form.frequency === freq ? "#3B5BDB" : "#94A3B8"}
                />
              </View>
              <View>
                <Text style={[s.frequencyText, form.frequency === freq && { color: "#3B5BDB" }]}>
                  {freq}
                </Text>
                <Text style={s.frequencySub}>
                  {freq === "Weekly" ? "4 times per month" : "Once per month"}
                </Text>
              </View>
            </View>
            <View style={[s.radioDot, form.frequency === freq && s.radioDotActive]}>
              {form.frequency === freq && <View style={s.radioInner} />}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={s.aiCard}>
        <View style={s.aiRow}>
          <Ionicons name="sparkles" size={18} color="#3B5BDB" />
          <Text style={s.aiTitle}>AI ESTIMATION</Text>
        </View>
        <Text style={s.aiBody}>
          To reach your goal of{" "}
          <Text style={s.aiLink}>${amount.toLocaleString()}</Text> by{" "}
          {form.targetDate}, save{" "}
          <Text style={s.aiLink}>${estimatedDeposit}</Text> {form.frequency.toLowerCase()}.
        </Text>
      </View>
    </>
  );

  return (
    <View style={s.safe}>
      <ScrollView contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled">
        <View style={s.container}>
          <View style={s.header}>
            <TouchableOpacity style={s.backBtn} onPress={handleBack}>
              <Ionicons name="arrow-back" size={20} color="#3B5BDB" />
            </TouchableOpacity>
            <View style={s.headerCenter}>
              <Text style={s.headerTitle}>
                {step === 1 ? "Choose Category" : step === 2 ? "Set Amount" : "Goal Details"}
              </Text>
              <Text style={s.headerStep}>STEP {step} OF 3</Text>
            </View>
            <View style={s.headerPlaceholder} />
          </View>

          <View style={s.progressTrack}>
            <View
              style={[
                s.progressFill,
                {
                  width: `${(step / 3) * 100}%`,
                  backgroundColor: "#3B5BDB",
                },
              ]}
            />
          </View>

          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </View>
      </ScrollView>

      <View style={s.ctaWrapper}>
        <TouchableOpacity
          style={[
            s.ctaBtn,
            !canProceed && { opacity: 0.5 },
          ]}
          disabled={!canProceed}
          onPress={() => (step < 3 ? setStep((s) => s + 1) : handleCreate())}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={["#3B5BDB", "#3451C7"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={s.ctaGradient}
          >
            <Text style={s.ctaText}>
              {step < 3 ? "Continue" : "Create Goal"}
            </Text>
            <Ionicons
              name={step < 3 ? "arrow-forward" : "checkmark"}
              size={22}
              color="#fff"
              style={{ position: "absolute", right: 24 }}
            />
          </LinearGradient>
        </TouchableOpacity>
        <Text style={s.ctaNote}>
          {step < 3 ? "STEP " + (step + 1) + " OF 3" : "YOU'RE ALL SET!"}
        </Text>
      </View>
    </View>
  );
}
