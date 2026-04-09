// app/(tabs)/_layout.tsx — FINAL CLEAN VERSION
// ✅ Blue color #3B5BDB (same as all other screens)
// ✅ FAB floats above tab bar with clean white notch
// ✅ No black background — pure white bar
// ✅ 4 tabs: Home, Wallet | FAB | Goals, Profile
// ✅ react-native-svg for clean curved notch

import { Ionicons } from "@expo/vector-icons";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

const { width: W } = Dimensions.get("window");

// ── Design tokens ──────────────────────────────────────────────────────────
const BLUE = "#3B5BDB"; // same as dashboard, wallet, stats
const INACTIVE = "#94A3B8";
const BAR_H = 68;
const FAB_SIZE = 54;
const FAB_RISE = 22; // how much FAB center sits above bar top
const NOTCH_R = FAB_SIZE / 2 + 8;

// ── Tab definitions ────────────────────────────────────────────────────────
const LEFT_TABS = [
  { name: "index", label: "Home", icon: "home-outline", iconActive: "home" },
  {
    name: "wallet",
    label: "Wallet",
    icon: "layers-outline",
    iconActive: "layers",
  },
];
const RIGHT_TABS = [
  { name: "goals", label: "Goals", icon: "flag-outline", iconActive: "flag" },
  {
    name: "profile",
    label: "Profile",
    icon: "person-outline",
    iconActive: "person",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SVG Notch Background
// Clean white shape with smooth inward curve at center top
// ─────────────────────────────────────────────────────────────────────────────
function NotchedBar({ insets }: { insets: { bottom: number } }) {
  const h = BAR_H + FAB_RISE + insets.bottom;
  const cx = W / 2;
  const nr = NOTCH_R;
  const smooth = 14; // tangent length for smooth bezier

  // Smooth notch using cubic bezier curves
  const d = [
    `M 0 0`,
    `L ${cx - nr - smooth} 0`,
    `C ${cx - nr} 0, ${cx - nr} ${nr}, ${cx} ${nr}`,
    `C ${cx + nr} ${nr}, ${cx + nr} 0, ${cx + nr + smooth} 0`,
    `L ${W} 0`,
    `L ${W} ${h}`,
    `L 0 ${h}`,
    `Z`,
  ].join(" ");

  return (
    <Svg
      width={W}
      height={h}
      style={StyleSheet.absoluteFill}
      // Ensure no background color bleeds through
    >
      <Path d={d} fill="#FFFFFF" />
    </Svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Custom Tab Bar
// ─────────────────────────────────────────────────────────────────────────────
function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const renderTab = (tab: (typeof LEFT_TABS)[0]) => {
    const routeIndex = state.routes.findIndex((r) => r.name === tab.name);
    const isFocused = state.index === routeIndex;
    const route = state.routes[routeIndex];
    if (!route) return null;

    const onPress = () => {
      const event = navigation.emit({
        type: "tabPress",
        target: route.key,
        canPreventDefault: true,
      });
      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(tab.name);
      }
    };

    return (
      <TouchableOpacity
        key={tab.name}
        style={s.tabItem}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <Ionicons
          name={(isFocused ? tab.iconActive : tab.icon) as any}
          size={24}
          color={isFocused ? BLUE : INACTIVE}
        />
        <Text style={[s.label, { color: isFocused ? BLUE : INACTIVE }]}>
          {tab.label}
        </Text>
      </TouchableOpacity>
    );
  };

  const iosBottom = insets.bottom;
  const wrapperHeight = BAR_H + FAB_RISE + iosBottom;

  return (
    <View
      style={[
        s.outerWrapper,
        { paddingBottom: iosBottom, height: wrapperHeight },
      ]}
    >
      {/* ── Clean white notched background ── */}
      <NotchedBar insets={insets} />

      {/* ── Top shadow line — subtle separator ── */}
      <View style={s.shadowLine} />

      {/* ── Tab items row ── */}
      <View style={s.row}>
        {/* Left: Home + Wallet */}
        <View style={s.side}>{LEFT_TABS.map(renderTab)}</View>

        {/* Center spacer — space for FAB */}
        <View style={{ width: FAB_SIZE + 32 }} />

        {/* Right: Goals + Profile */}
        <View style={s.side}>{RIGHT_TABS.map(renderTab)}</View>
      </View>

      {/* ── FAB — centered, floats above bar ── */}
      <View style={s.fabContainer} pointerEvents="box-none">
        <TouchableOpacity
          style={s.fab}
          activeOpacity={0.85}
          onPress={() => navigation.navigate("add-expense")}
        >
          <Ionicons name="add" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Layout
// ─────────────────────────────────────────────────────────────────────────────
export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="wallet" options={{ title: "Wallet" }} />
      <Tabs.Screen name="goals" options={{ title: "Goals" }} />
      <Tabs.Screen name="goals/create" options={{ href: null }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
      <Tabs.Screen name="add-expense" options={{ href: null }} />
      <Tabs.Screen name="stats" options={{ href: null }} />
    </Tabs>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  outerWrapper: {
    width: W,
    height: BAR_H + FAB_RISE,
    backgroundColor: "transparent", // ✅ transparent — SVG handles bg
  },

  // Subtle top shadow — no black, just a soft blur line
  shadowLine: {
    position: "absolute",
    top: FAB_RISE,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "transparent",
    shadowColor: "#ffffff",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: -4 },
    elevation: 8,
  },

  row: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: BAR_H,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 4,
  },

  side: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },

  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    gap: 3,
  },

  label: {
    fontSize: 10,
    fontWeight: "600",
    letterSpacing: 0.2,
  },

  // FAB container — centered absolutely at top of outerWrapper
  fabContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    height: FAB_SIZE,
  },

  fab: {
    width: FAB_SIZE,
    height: FAB_SIZE,
    borderRadius: FAB_SIZE / 2,
    backgroundColor: BLUE, // ✅ blue — matches all screens
    alignItems: "center",
    justifyContent: "center",
    shadowColor: BLUE,
    shadowOpacity: 0.4,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 10,
  },
});
