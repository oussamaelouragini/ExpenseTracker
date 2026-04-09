// features/dashboard/types/dashboard.types.ts
// ✅ All dashboard types are defined here

export interface Transaction {
  id: string;
  title: string;
  category: string;
  time: string;
  amount: number; // positif = income, negatif = expense
  status: "APPROVED" | "COMPLETED" | "PENDING" | "FAILED";
  icon: string; // Ionicons name
  iconBgColor: string;
  iconColor: string;
}

export interface QuickAction {
  id: string;
  label: string;
  icon: string; // Ionicons name
  onPress?: () => void;
}

export interface User {
  fullName: string;
  avatarUrl?: string;
}
