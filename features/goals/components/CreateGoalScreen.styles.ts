// features/goals/components/CreateGoalScreen.styles.ts
// ✅ DESIGN.md applied — same token set

import { StyleSheet } from "react-native";
import { C } from "./GoalsScreen.styles";

export const createStyles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.surface },
  scroll: { flexGrow: 1, paddingBottom: 40 },
  container: { paddingHorizontal: 22, paddingTop: 8 },

  // ── Header ──────────────────────────────────────────────────────────────────
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    paddingVertical: 8,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: C.surfaceLow,
    alignItems: "center",
    justifyContent: "center",
  },
  headerCenter: { alignItems: "center" },
  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: C.onSurface,
    letterSpacing: -0.3,
  },
  headerStep: {
    fontSize: 11,
    color: C.onVariant,
    fontWeight: "600",
    letterSpacing: 1,
    marginTop: 2,
  },
  helpBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: C.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  // ── Progress bar ─────────────────────────────────────────────────────────────
  progressTrack: {
    height: 4,
    backgroundColor: C.surfaceLow,
    borderRadius: 2,
    marginBottom: 28,
    overflow: "hidden",
  },
  progressFill: {
    height: 4,
    borderRadius: 2,
    // gradient handled inline
  },

  // ── Icon Preview ──────────────────────────────────────────────────────────────
  iconPreviewWrapper: {
    alignItems: "center",
    marginBottom: 24,
  },
  iconPreviewCircle: {
    width: 100,
    height: 100,
    borderRadius: 30,
    backgroundColor: C.surfaceCard,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: C.onSurface,
    shadowOpacity: 0.06,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },

  // ── Category pills row ───────────────────────────────────────────────────────
  categoriesScroll: { marginBottom: 24 },
  categoryPill: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: C.surfaceLow,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  categoryPillActive: {
    backgroundColor: C.primary,
    shadowColor: C.primary,
    shadowOpacity: 0.4,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },

  // ── Field card ───────────────────────────────────────────────────────────────
  fieldCard: {
    backgroundColor: C.surfaceLow,
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
  },
  fieldLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: C.onVariant,
    letterSpacing: 1.5,
    marginBottom: 10,
  },

  // Amount
  amountRow: { flexDirection: "row", alignItems: "baseline", gap: 4 },
  amountDollar: { fontSize: 28, fontWeight: "700", color: C.onVariant },
  amountValue: {
    fontSize: 52,
    fontWeight: "800",
    color: C.onSurface,
    letterSpacing: -2,
  },

  // Goal name input
  goalNameInput: {
    fontSize: 22,
    fontWeight: "700",
    color: C.onSurface,
    padding: 0,
  },

  // Date row
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 14,
  },
  dateText: { fontSize: 20, fontWeight: "700", color: C.onSurface },

  // Duration pills
  durationRow: { flexDirection: "row", gap: 10 },
  durationPill: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 50,
    backgroundColor: C.surfaceCard,
  },
  durationPillActive: { backgroundColor: C.primary },
  durationText: { fontSize: 14, fontWeight: "600", color: C.onVariant },
  durationTextActive: { color: "#fff" },

  // Frequency option row
  frequencyOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: C.surfaceLow,
  },
  frequencyOptionLast: { borderBottomWidth: 0 },
  frequencyText: { fontSize: 16, fontWeight: "600", color: C.onSurface },

  // Radio dot
  radioDot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: C.onVariant,
    alignItems: "center",
    justifyContent: "center",
  },
  radioDotActive: { borderColor: C.primary },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: C.primary,
  },

  // ── AI Estimation card ────────────────────────────────────────────────────────
  aiCard: {
    backgroundColor: "#f3f0ff",
    borderRadius: 20,
    padding: 18,
    marginBottom: 24,
  },
  aiRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 6,
  },
  aiTitle: { fontSize: 15, fontWeight: "800", color: C.primary },
  aiBody: { fontSize: 14, color: C.onVariant, lineHeight: 21 },
  aiLink: { fontWeight: "800", color: C.primary },

  // ── CTA Button ────────────────────────────────────────────────────────────────
  ctaWrapper: { paddingHorizontal: 22, marginBottom: 12 },
  ctaBtn: {
    borderRadius: 50,
    height: 58,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: C.primary,
    shadowOpacity: 0.4,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  ctaText: {
    fontSize: 17,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: 0.3,
  },
  ctaNote: {
    fontSize: 11,
    color: C.onVariant,
    textAlign: "center",
    letterSpacing: 1.2,
  },
});
