import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Star } from "lucide-react";

// Rating data structure based on backend API
interface Rating {
  id: string;
  rating: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export const ownerRatingColumns: ColumnDef<Rating>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rating ID" />
    ),
    cell: ({ row }) => {
      const id = row.getValue("id") as string;
      return id.slice(0, 8) + "..."; // Show first 8 characters of UUID
    },
  },
  {
    accessorKey: "userId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="User ID" />
    ),
    cell: ({ row }) => {
      const userId = row.getValue("userId") as string;
      return userId.slice(0, 8) + "..."; // Show first 8 characters of UUID
    },
  },
  {
    accessorKey: "rating",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rating" />
    ),
    cell: ({ row }) => {
      const rating = row.getValue("rating") as number;
      return (
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span>{rating}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as string;
      return new Date(date).toLocaleDateString();
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Updated At" />
    ),
    cell: ({ row }) => {
      const date = row.getValue("updatedAt") as string;
      return new Date(date).toLocaleDateString();
    },
  },
];
