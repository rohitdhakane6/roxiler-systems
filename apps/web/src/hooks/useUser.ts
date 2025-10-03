import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userApi } from "@/utils/api";

// Get all stores for users to browse and rate
export function useStores() {
  return useQuery({
    queryKey: ["user", "stores"],
    queryFn: async () => {
      const res = await userApi.getAllStores();
      console.log(res);
      if (!res.data?.success) {
        throw new Error(res.data?.message || "Failed to fetch stores");
      }
      return res.data.data?.stores || [];
    },
  });
}

// Update an existing rating
export function useUpdateRating() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { rating: number; storeId: string }) => {
      const res = await userApi.updateRating(data.storeId, data.rating);
      if (!res.data?.success) {
        const msg =
          res.data?.error?.message ||
          res.data?.message ||
          "Failed to update rating";
        throw new Error(msg);
      }
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "stores"] });
    },
  });
}
