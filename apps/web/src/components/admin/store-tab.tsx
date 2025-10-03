import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AddStoreDialog from "@/components/admin/AddStoreDialog";
import { StoreIcon } from "lucide-react";
import { adminStoreColumns } from "@/components/admin/columns";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableLoading } from "@/components/data-table/data-table-skeleton";
import { useAdminStores } from "@/hooks/useAdmin";

export default function StoreTab() {
  const { data: stores, isLoading } = useAdminStores();
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <StoreIcon className="h-5 w-5" />
              Store Management
            </CardTitle>
            <CardDescription>Manage stores and their owners</CardDescription>
          </div>
          <AddStoreDialog />
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <DataTableLoading columnCount={6} />
        ) : (
          <DataTable data={stores ?? []} columns={adminStoreColumns} />
        )}
      </CardContent>
    </Card>
  );
}
