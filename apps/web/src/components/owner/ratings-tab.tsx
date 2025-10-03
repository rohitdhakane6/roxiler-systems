import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableLoading } from "@/components/data-table/data-table-skeleton";
import { Star } from "lucide-react";
import { ownerRatingColumns } from "@/components/owner/columns";
import { useStoreRatings } from "@/hooks/useStore";

export default function OwnerRatingsTab() {
  const { data: ratings, isLoading } = useStoreRatings();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Ratings Management
            </CardTitle>
            <CardDescription>
              View and manage your store ratings
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <DataTableLoading columnCount={5} />
        ) : (
          <DataTable data={ratings} columns={ownerRatingColumns} />
        )}
      </CardContent>
    </Card>
  );
}
