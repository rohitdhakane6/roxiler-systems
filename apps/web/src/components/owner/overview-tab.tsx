import { useStore } from "@/hooks/useStore";
import StatCard from "../StatCard";
import { Store, Star, MapPin, BarChart3 } from "lucide-react";

export default function OwnerOverviewTab() {
  const { data: storeData, isLoading, error } = useStore();

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Store Name"
          value="Loading..."
          icon={Store}
          description="Fetching store information"
        />
        <StatCard
          label="Total Ratings"
          value="Loading..."
          icon={BarChart3}
          description="Loading ratings data"
        />
        <StatCard
          label="Average Rating"
          value="Loading..."
          icon={Star}
          description="Calculating average"
        />
        <StatCard
          label="Store Location"
          value="Loading..."
          icon={MapPin}
          description="Loading address"
        />
      </div>
    );
  }

  if (error || !storeData) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Store Status"
          value="No Store"
          icon={Store}
          description="Create your store to get started"
        />
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        label="Store Name"
        value={storeData.name}
        icon={Store}
        description="Your active store"
      />
      <StatCard
        label="Total Ratings"
        value={storeData.totalRatings ?? 0}
        icon={BarChart3}
        description="Total customer ratings received"
      />
      <StatCard
        label="Average Rating"
        value={
          storeData.averageRating
            ? Number(storeData.averageRating).toFixed(1)
            : "0.0"
        }
        icon={Star}
        description="Overall customer satisfaction"
      />
      <StatCard
        label="Store Location"
        value={storeData.address}
        icon={MapPin}
        description="Your store address"
      />
    </div>
  );
}
