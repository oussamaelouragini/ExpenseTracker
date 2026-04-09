export const authService = {
  signIn: async (payload: { email: string; password: string }) => {
    // 🔴 Right now — mock only
    // Later, when you have a backend, replace with:
    // const response = await apiClient.post("/auth/login", payload);
    // return response.data;
    await new Promise((resolve) => setTimeout(resolve, 1500));
  },
  signUp: async (payload: {
    fullName: string;
    email: string;
    password: string;
  }) => {
    // 🔴 Right now — mock only:
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // ✅ When you have a backend, replace with:
    // const response = await apiClient.post("/auth/register", payload);
    // return response.data;
  },
};
