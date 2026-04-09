// app/(tabs)/profile.tsx
// ✅ Tab bar comes automatically from _layout.tsx

import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function ProfileScreen() {
  return (
    <SafeAreaView style={s.safe}>
      <View style={s.center}>
        <Ionicons name="person-circle" size={56} color="#3B5BDB" />
        <Text style={s.title}>Profile</Text>
        <Text style={s.sub}>Coming soon...</Text>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#ECEEF5" },
  center: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12 },
  title: { fontSize: 24, fontWeight: "800", color: "#0F172A" },
  sub: { fontSize: 15, color: "#94A3B8" },
});
