// app/(tabs)/select-category.tsx
// ✅ Modal to show all categories (default + user-created)

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  CATEGORIES,
  useAddTransaction,
} from "@/features/transactions/hooks/useAddTransaction";
import { useCategoriesStore } from "@/features/transactions/store/categoriesStore";
import type { Category, CategoryId } from "@/features/transactions/types/transaction.types";
import ScreenWrapper from "@/core/components/ScreenWrapper";

interface CategoryItemProps {
  category: Category;
  isSelected: boolean;
  onSelect: (id: CategoryId) => void;
  onDelete?: () => void;
  canDelete: boolean;
}

function CategoryItem({ category, isSelected, onSelect, onDelete, canDelete }: CategoryItemProps) {
  return (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => onSelect(category.id)}
      activeOpacity={0.8}
    >
      <View style={[styles.categoryIconBox, { backgroundColor: category.iconBgColor }]}>
        <Ionicons
          name={category.icon as any}
          size={24}
          color={category.iconColor}
        />
      </View>
      <Text style={styles.categoryName}>{category.label}</Text>
      {isSelected && (
        <View style={styles.checkmark}>
          <Ionicons name="checkmark-circle" size={20} color="#3B5BDB" />
        </View>
      )}
      {canDelete && onDelete && (
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={onDelete}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="trash-outline" size={18} color="#EF4444" />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

export default function SelectCategoryScreen() {
  const router = useRouter();
  const { selectedCat, setSelectedCat } = useAddTransaction();
  const userCategories = useCategoriesStore((s) => s.categories);
  const removeCategory = useCategoriesStore((s) => s.removeCategory);

  const allCategories = [...CATEGORIES, ...userCategories];

  const handleSelect = (id: CategoryId) => {
    setSelectedCat(id);
  };

  const handleDelete = (id: CategoryId) => {
    removeCategory(id);
  };

  return (
    <ScreenWrapper backgroundColor="#F0F2F8">
      <SafeAreaView style={styles.safe}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.replace("/add-expense")}
            activeOpacity={0.8}
          >
            <Ionicons name="chevron-back" size={24} color="#0F172A" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Select Category</Text>
          <TouchableOpacity
            style={styles.doneBtn}
            onPress={() => router.replace("/add-expense")}
            activeOpacity={0.8}
          >
            <Text style={styles.doneText}>Done</Text>
          </TouchableOpacity>
        </View>

        {/* Category List */}
        <FlatList
          data={allCategories}
          keyExtractor={(item) => item.id}
          numColumns={3}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const isUserCategory = userCategories.some((uc) => uc.id === item.id);
            return (
              <CategoryItem
                category={item}
                isSelected={selectedCat === item.id}
                onSelect={handleSelect}
                onDelete={isUserCategory ? () => handleDelete(item.id) : undefined}
                canDelete={isUserCategory}
              />
            );
          }}
        />

        {/* Create Category Button */}
        <View style={styles.createBtnWrapper}>
          <TouchableOpacity
            style={styles.createBtn}
            onPress={() => router.push("/create-category")}
            activeOpacity={0.85}
          >
            <Ionicons name="add" size={22} color="#3B5BDB" />
            <Text style={styles.createBtnText}>Create New Category</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F0F2F8" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: { fontSize: 18, fontWeight: "800", color: "#0F172A" },
  doneBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#3B5BDB",
    borderRadius: 8,
  },
  doneText: { fontSize: 14, fontWeight: "700", color: "#fff" },
  list: { paddingHorizontal: 16, paddingBottom: 100 },
  categoryItem: {
    flex: 1,
    alignItems: "center",
    padding: 12,
    margin: 4,
    maxWidth: "33.33%",
  },
  categoryIconBox: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  categoryName: { fontSize: 12, fontWeight: "600", color: "#64748B", textAlign: "center" },
  checkmark: { position: "absolute", top: 8, right: 8 },
  deleteBtn: {
    position: "absolute",
    top: 4,
    right: 4,
    padding: 4,
  },
  createBtnWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: "#F0F2F8",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },
  createBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#fff",
    paddingVertical: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#3B5BDB",
  },
  createBtnText: { fontSize: 16, fontWeight: "700", color: "#3B5BDB" },
});