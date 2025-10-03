import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/utils/api";

export function useStore() {
  return useQuery({
    queryKey: ["store", "my-store"],
    queryFn: async () => {
      const res = await api.get("/store");
      if (!res.data?.success) {
        // If no store found, return null instead of throwing error
        if (res.status === 404) {
          return null;
        }
        throw new Error(res.data?.error?.message || "Failed to fetch store");
      }
      return res.data.data;
    },
  });
}

// Get ratings for store owner's store
export function useStoreRatings() {
  return useQuery({
    queryKey: ["store", "ratings"],
    queryFn: async () => {
      const res = await api.get("/store/ratings");
      if (!res.data?.success) {
        throw new Error(
          res.data?.error?.message || "Failed to fetch store ratings"
        );
      }
      return res.data.data || [];
    },
  });
}

// Create store for store owner
export function useCreateStore() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { name: string; address: string }) => {
      const res = await api.post("/store", data);
      if (!res.data?.success) {
        const msg = res.data?.error?.message || "Failed to create store";
        throw new Error(msg);
      }
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["store", "my-store"] });
    },
  });
}

// Update store for store owner
export function useUpdateStore() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { name: string; address: string }) => {
      const res = await api.put("/store", data);
      if (!res.data?.success) {
        const msg = res.data?.error?.message || "Failed to update store";
        throw new Error(msg);
      }
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["store", "my-store"] });
    },
  });
}

// Get store analytics
export function useStoreAnalytics() {
  return useQuery({
    queryKey: ["store", "analytics"],
    queryFn: async () => {
      const res = await api.get("/store/analytics");
      if (!res.data?.success) {
        throw new Error(
          res.data?.error?.message || "Failed to fetch store analytics"
        );
      }
      return res.data.data;
    },
  });
}
