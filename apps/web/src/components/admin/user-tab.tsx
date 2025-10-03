import { adminUserColumns } from "@/components/admin/columns";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableLoading } from "@/components/data-table/data-table-skeleton";
import AddUserDialog from "@/components/admin/AddUserDialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAdminUsers } from "@/hooks/useAdmin";
import { Users } from "lucide-react";

export default function UserTab() {
  const { data: users, isLoading } = useAdminUsers();
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              User Management
            </CardTitle>
            <CardDescription>
              Manage system users and their roles
            </CardDescription>
          </div>
          <AddUserDialog />
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <DataTableLoading columnCount={6} />
        ) : (
          <DataTable data={users ?? []} columns={adminUserColumns} />
        )}
      </CardContent>
    </Card>
  );
}
