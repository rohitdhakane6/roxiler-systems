import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi, type AuthData } from "@/utils/api";

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
    mutationFn: async (data: LoginPayload): Promise<AuthData> => {
      const res = await authApi.login(data);
      if (!res.data?.success) {
        const msg =
          res.data?.error?.message || res.data?.message || "Login failed";
        throw new Error(msg);
      }
      const { token, user } = res.data.data!;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      return res.data.data!;
    },
    onSuccess: () => {
      // Invalidate and refetch any cached data after login
      queryClient.invalidateQueries();
    },
  });
}

export function useSignup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: SignupPayload): Promise<AuthData> => {
      const res = await authApi.signup(data);
      if (!res.data?.success) {
        const msg =
          res.data?.error?.message || res.data?.message || "Signup failed";
        throw new Error(msg);
      }
      const { token, user } = res.data.data!;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      return res.data.data!;
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
      const res = await authApi.updatePassword(data);
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
