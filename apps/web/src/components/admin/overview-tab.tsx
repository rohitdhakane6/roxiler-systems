import { useAdminDashboard } from "@/hooks/useAdmin";
import StatCard from "../StatCard";
import { Store, Users, Star } from "lucide-react";

export default function OverviewTab() {
  const { data: dashboardData } = useAdminDashboard();

  return (
    <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
      <StatCard
        label="Total Users"
        value={dashboardData?.totalUsers ?? 0}
        icon={Users}
        description="Registered users"
      />
      <StatCard
        label="Total Stores"
        value={dashboardData?.totalStores ?? 0}
        icon={Store}
        description="Active stores"
      />
      <StatCard
        label="Total Ratings"
        value={dashboardData?.totalRatings ?? 0}
        icon={Star}
        description="User ratings"
      />
    </div>
  );
}
