import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/utils/api";

// Dashboard data hook
export function useAdminDashboard() {
  return useQuery({
    queryKey: ["admin", "dashboard"],
    queryFn: async () => {
      const res = await api.get("/admin/dashboard");
      if (!res.data?.success) {
        throw new Error(res.data?.message || "Failed to fetch dashboard data");
      }
      return res.data.data || [];
    },
  });
}

// Users management hooks
export function useAdminUsers() {
  return useQuery({
    queryKey: ["admin", "users"],
    queryFn: async () => {
      const res = await api.get("/admin/users");
      if (!res.data?.success) {
        throw new Error(res.data.error?.message || "Failed to fetch users");
      }
      return res.data.data?.users || [];
    },
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      address: string;
      password: string;
      role: "USER" | "STORE_OWNER" | "ADMIN";
    }) => {
      const res = await api.post("/admin/users", data);
      if (!res.data?.success) {
        const msg =
          res.data?.error?.message ||
          res.data.error?.message ||
          "Failed to create user";
        throw new Error(msg);
      }
      return res.data.data;
    },
    onSuccess: () => {
      // Invalidate users list to refetch
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "dashboard"] });
    },
  });
}

// Stores management hooks
export function useAdminStores() {
  return useQuery({
    queryKey: ["admin", "stores"],
    queryFn: async () => {
      const res = await api.get("/admin/stores");
      if (!res.data?.success) {
        throw new Error(res.data.error?.message || "Failed to fetch stores");
      }
      return res.data.data.stores || [];
    },
  });
}

export function useCreateStoreAsAdmin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      name: string;
      address: string;
      ownerEmailId: string;
    }) => {
      const res = await api.post("/admin/stores", data);
      if (!res.data?.success) {
        const msg = res.data.error?.message || "Failed to create store";
        throw new Error(msg);
      }
      return res.data.data;
    },
    onSuccess: () => {
      // Invalidate stores list to refetch
      queryClient.invalidateQueries({ queryKey: ["admin", "stores"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "dashboard"] });
    },
  });
}
