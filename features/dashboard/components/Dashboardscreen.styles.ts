// features/dashboard/components/DashboardScreen.styles.ts
// ✅ Styles only — all StyleSheets are defined here

import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    paddingBottom: 32,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },

  // ── Header ──────────────────────────────────────────────────────────────────
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: "#F4C99A",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  avatarImage: {
    width: 52,
    height: 52,
    borderRadius: 16,
  },
  avatarPlaceholder: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },
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
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },

  // ── Balance Card ─────────────────────────────────────────────────────────────
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
    overflow: "hidden",
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
    color: "#FFFFFF",
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
  visaGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  visaCircle: {
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
  visaText: {
    fontSize: 9,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: 0.5,
  },
  viewDetailsBtn: {
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  viewDetailsText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#3B5BDB",
  },

  // ── Quick Actions ─────────────────────────────────────────────────────────────
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
    paddingHorizontal: 8,
  },
  actionItem: {
    alignItems: "center",
    gap: 10,
  },
  actionCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  actionLabel: {
    fontSize: 13,
    fontWeight: "500",
    color: "#475569",
  },

  // ── Transactions ─────────────────────────────────────────────────────────────
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
  seeAllText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#3B5BDB",
  },

  // Transaction Card
  transactionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  txIconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  txInfo: {
    flex: 1,
  },
  txTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 4,
  },
  txMeta: {
    fontSize: 13,
    color: "#94A3B8",
    fontWeight: "400",
  },
  txRight: {
    alignItems: "flex-end",
  },
  txAmount: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  txAmountNeg: {
    color: "#0F172A",
  },
  txAmountPos: {
    color: "#16A34A",
  },
  txStatus: {
    fontSize: 10,
    fontWeight: "600",
    color: "#94A3B8",
    letterSpacing: 0.8,
  },

  // ── Tab Bar ───────────────────────────────────────────────────────────────────
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: -2 },
    elevation: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    gap: 4,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: "600",
  },
  tabLabelActive: {
    color: "#3B5BDB",
  },
  tabLabelInactive: {
    color: "#94A3B8",
  },
});
