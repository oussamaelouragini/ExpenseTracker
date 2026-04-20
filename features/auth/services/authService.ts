import { UserProfile } from "@/providers/UserProvider";

export const authService = {
  signIn: async (payload: { email: string; password: string }): Promise<UserProfile> => {
    // 🔴 Right now — mock only
    // Later, when you have a backend, replace with:
    // const response = await apiClient.post("/auth/login", payload);
    // return response.data;
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock user data - in production this comes from your API
    const mockUser: UserProfile = {
      id: "1",
      fullName: "John Doe",
      email: payload.email,
      phone: "",
      countryCode: "+216",
      address: "",
      memberType: "PREMIUM MEMBER",
      avatarUri: null,
    };

    return mockUser;
  },
  signUp: async (payload: {
    fullName: string;
    email: string;
    password: string;
  }): Promise<UserProfile> => {
    // 🔴 Right now — mock only:
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const mockUser: UserProfile = {
      id: "1",
      fullName: payload.fullName,
      email: payload.email,
      phone: "",
      countryCode: "+216",
      address: "",
      memberType: "STANDARD MEMBER",
      avatarUri: null,
    };

    return mockUser;

    // ✅ When you have a backend, replace with:
    // const response = await apiClient.post("/auth/register", payload);
    // return response.data;
  },
};
