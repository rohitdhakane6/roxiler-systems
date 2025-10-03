import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type AuthData } from "@/utils/api";

type LoginPayload = { email: string; password: string };
type SignupPayload = {
  name: string;
  email: string;
  address: string;
  password: string;
};

type UpdatePasswordPayload = {
  currentPassword: string;
  newPassword: string;
};

type User = {
  id: string;
  name: string;
  role: "ADMIN" | "USER" | "STORE_OWNER";
};

export function useSession(): User | null {
  if (typeof window === "undefined") return null;

  const userRaw = localStorage.getItem("user");
  return userRaw ? (JSON.parse(userRaw) as User) : null;
}

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: LoginPayload) => {
      try {
        const res = await api.post("/auth/login", data);
        const { token, user } = res.data.data!;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        return res.data.data!;
      } catch (error: any) {
        if (error.response?.data?.error?.message) {
          throw new Error(error.response.data.error.message);
        } else {
          throw new Error("Login failed. Please try again.");
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    // Add this to prevent automatic retries on error
    retry: false,
  });
}

export function useSignup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: SignupPayload): Promise<AuthData> => {
      try {
        const res = await api.post("/auth/signup", data);
        const { token, user } = res.data.data!;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        return res.data.data!;
      } catch (error: any) {
        if (error.response?.data?.error?.message) {
          throw new Error(error.response.data.error.message);
        } else {
          throw new Error("Signup failed. Please try again.");
        }
      }
    },
    onSuccess: () => {
      // Invalidate and refetch any cached data after signup
      queryClient.invalidateQueries();
    },
  });
}

export function useUpdatePassword() {
  return useMutation({
    mutationFn: async (data: UpdatePasswordPayload) => {
      const res = await api.post("/auth/update-password", data);
      if (!res.data?.success) {
        const msg =
          res.data?.error?.message ||
          res.data?.message ||
          "Password update failed";
        throw new Error(msg);
      }
      return res.data;
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    queryClient.clear();
    window.location.href = "/login";
  };
}
