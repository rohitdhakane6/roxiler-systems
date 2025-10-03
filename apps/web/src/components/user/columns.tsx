import type { ColumnDef } from "@tanstack/react-table";
import { Star } from "lucide-react";
import { DataTableColumnHeader } from "../data-table/data-table-column-header";
import RatingCell from "./RatingCell";
import type { StoreWithRating } from "@/utils/api";

export const columns: ColumnDef<StoreWithRating>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Store Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex flex-col space-y-1">
          <span className="font-medium">{row.getValue("name")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "address",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Address" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex flex-col space-y-1">
          <span className="font-medium">{row.getValue("address")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "averageRating",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Average Rating" />
    ),
    cell: ({ row }) => {
      const rawValue = row.getValue("averageRating");

      // Convert to number safely
      const avgRating =
        rawValue !== null && rawValue !== undefined ? Number(rawValue) : null;

      // Format only if it's a valid number
      const formattedRating =
        avgRating !== null && !Number.isNaN(avgRating)
          ? Number(avgRating.toFixed(1)).toString()
          : null;

      return (
        <div className="flex items-center space-x-2">
          {formattedRating ? (
            <>
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                <span className="font-medium">{formattedRating}</span>
              </div>
            </>
          ) : (
            <span className="text-muted-foreground">No ratings yet</span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "userRating",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="My Rating" />
    ),
    cell: ({ row }) => {
      const store = row.original;

      return <RatingCell storeId={store.id} rating={store.userRating || 0} />;
    },
    enableSorting: false,
  },
];
