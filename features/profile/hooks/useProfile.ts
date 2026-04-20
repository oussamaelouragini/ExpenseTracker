// features/profile/hooks/useProfile.ts
// ✅ Uses shared UserContext — changes persist across screens
// ✅ Ready for backend integration (updateUser can call API)

import React from "react";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import { useUser } from "@/providers/UserProvider";
import type {
  AppPreference,
  NotificationSetting,
  PersonalInfoItem,
} from "../types/profile.types";

export function useProfile() {
  const router = useRouter();
  const { user, updateUser } = useUser();

  // ── Personal Info Rows ────────────────────────────────────────────────────
  const personalInfo: PersonalInfoItem[] = [
    {
      id: "email",
      label: "EMAIL ADDRESS",
      value: user.email,
      icon: "mail-outline",
      iconBgColor: "#EEF2FF",
      iconColor: "#3B5BDB",
    },
    {
      id: "phone",
      label: "PHONE NUMBER",
      value: `${user.countryCode} ${user.phone}`,
      icon: "call-outline",
      iconBgColor: "#EEF2FF",
      iconColor: "#3B5BDB",
    },
    {
      id: "address",
      label: "RESIDENTIAL ADDRESS",
      value: user.address,
      icon: "location-outline",
      iconBgColor: "#EEF2FF",
      iconColor: "#3B5BDB",
    },
  ];

  // ── Notifications ─────────────────────────────────────────────────────────
  const [notifications, setNotifications] = React.useState<NotificationSetting[]>([
    {
      id: "push",
      label: "Push Notifications",
      description: "Alerts, updates & activity",
      icon: "notifications-outline",
      iconBgColor: "#EEF2FF",
      iconColor: "#3B5BDB",
      enabled: true,
    },
    {
      id: "email",
      label: "Email Marketing",
      description: "Weekly insights & newsletters",
      icon: "at-outline",
      iconBgColor: "#EEF2FF",
      iconColor: "#3B5BDB",
      enabled: false,
    },
  ]);

  const toggleNotification = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, enabled: !n.enabled } : n)),
    );
  };

  // ── App Preferences ───────────────────────────────────────────────────────
  const [preferences, setPreferences] = React.useState<AppPreference[]>([
    {
      id: "currency",
      label: "Primary Currency",
      icon: "card-outline",
      iconBgColor: "#EEF2FF",
      iconColor: "#3B5BDB",
      value: "USD ($)",
      options: ["USD ($)", "EUR (€)", "GBP (£)", "TND (د.ت)"],
    },
    {
      id: "language",
      label: "App Language",
      icon: "language-outline",
      iconBgColor: "#EEF2FF",
      iconColor: "#3B5BDB",
      value: "English",
      options: ["English", "French", "Arabic"],
    },
  ]);

  const cyclePreference = (id: string) => {
    setPreferences((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const idx = p.options.indexOf(p.value);
        const next = p.options[(idx + 1) % p.options.length];
        return { ...p, value: next };
      }),
    );
  };

  // ── Actions ───────────────────────────────────────────────────────────────
  const handleEditProfile = () => {
    router.push("/(tabs)/profile/edit");
  };

  const handleLogOut = () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log Out",
        style: "destructive",
        onPress: () => router.replace("/auth/sign-in"),
      },
    ]);
  };

  const handleSettings = () => {
    Alert.alert("Settings", "Coming soon!");
  };

  const handleInfoPress = (id: string) => {
    router.push("/(tabs)/profile/edit");
  };

  return {
    user,
    updateUser,
    personalInfo,
    notifications,
    preferences,
    toggleNotification,
    cyclePreference,
    handleEditProfile,
    handleLogOut,
    handleSettings,
    handleInfoPress,
  };
}
