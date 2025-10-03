import OwnerOverviewTab from "@/components/owner/overview-tab";
import OwnerRatingsTab from "@/components/owner/ratings-tab";
import SettingsTab from "@/components/SettingsTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Store } from "lucide-react";

export default function OwnerDashboard() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Store className="h-8 w-8" />
            Owner Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage your stores and ratings
          </p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="ratings">Ratings</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <OwnerOverviewTab />
        </TabsContent>

        <TabsContent value="ratings" className="space-y-4">
          <OwnerRatingsTab />
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <SettingsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
