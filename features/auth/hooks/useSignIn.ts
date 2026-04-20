// features/auth/hooks/useSignIn.ts
// ✅ Logic & State only — all business logic here

import { validateSignInForm } from "@/core/utils/validators";
import { authService } from "@/features/auth/services/authService";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useUser } from "@/providers/UserProvider";

// ── Types ─────────────────────────────────────────────────────────────────────
interface FormState {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

// ── Hook ──────────────────────────────────────────────────────────────────────
export function useSignIn() {
  const router = useRouter();
  const { updateUser } = useUser();

  const [form, setForm] = useState<FormState>({ email: "", password: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // ── Validation ──────────────────────────────────────────────────────────────
  const validate = (): boolean => {
    const newErrors = validateSignInForm(form);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ── Handle field change ──────────────────────────────────────────────────────
  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  // ── Submit ──────────────────────────────────────────────────────────────────
  const handleSignIn = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      const userData = await authService.signIn({
        email: form.email,
        password: form.password,
      });

      updateUser(userData);

      // ✅ Navigation after success
      router.replace("/(tabs)/dashboard");
    } catch (error: any) {
      // Handle API errors
      setErrors({
        general:
          error?.message || "Invalid email or password. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    errors,
    loading,
    showPassword,
    setShowPassword,
    handleChange,
    handleSignIn,
  };
}
