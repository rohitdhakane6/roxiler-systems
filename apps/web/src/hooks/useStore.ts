import { useQuery } from "@tanstack/react-query";
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
        throw new Error(res.data?.message || "Failed to fetch store");
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
        throw new Error(res.data?.message || "Failed to fetch store ratings");
      }
      return res.data.data || [];
    },
  });
}
