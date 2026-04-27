// features/transactions/store/categoriesStore.ts
// ✅ Store for user-created categories

import { create } from "zustand";
import type { Category, CategoryId } from "../types/transaction.types";

interface CategoriesStore {
  categories: Category[];
  addCategory: (category: Omit<Category, "id">) => void;
  removeCategory: (id: CategoryId) => void;
  getCategoryById: (id: CategoryId) => Category | undefined;
}

export const useCategoriesStore = create<CategoriesStore>((set, get) => ({
  categories: [],

  addCategory: (category) => {
    const newCategory: Category = {
      ...category,
      id: `custom_${Date.now()}` as CategoryId,
    };
    set((state) => ({
      categories: [...state.categories, newCategory],
    }));
  },

  removeCategory: (id) => {
    set((state) => ({
      categories: state.categories.filter((c) => c.id !== id),
    }));
  },

  getCategoryById: (id) => {
    return get().categories.find((c) => c.id === id);
  },
}));