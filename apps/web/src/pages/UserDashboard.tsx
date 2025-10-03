import { DataTable } from "@/components/data-table/data-table";
import { columns } from "@/components/user/columns";
import { useStores } from "@/hooks/useUser";
import { DataTableLoading } from "@/components/data-table/data-table-skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SettingsTab from "@/components/SettingsTab";
import { User, Store } from "lucide-react";

export default function UserDashboard() {
  const { data: stores, isLoading: storesLoading } = useStores();

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <User className="h-8 w-8" />
            User Dashboard
          </h1>
          <p className="text-muted-foreground">
            Browse stores and manage your ratings
          </p>
        </div>
      </div>

      <Tabs defaultValue="stores" className="space-y-4">
        <TabsList>
          <TabsTrigger value="stores">Stores</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="stores" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="h-5 w-5" />
                All Stores
              </CardTitle>
              <CardDescription>
                Browse and rate stores in your area
              </CardDescription>
            </CardHeader>
            <CardContent>
              {storesLoading ? (
                <DataTableLoading columnCount={6} />
              ) : (
                <DataTable data={stores ?? []} columns={columns} />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <SettingsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
