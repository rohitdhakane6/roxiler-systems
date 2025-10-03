import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../data-table/data-table-column-header";
import type { User, Store } from "@/utils/api";

// Extended types for admin views
export type AdminUser = User;

export type AdminStore = Store;

// Admin Users Columns
export const adminUserColumns: ColumnDef<AdminUser>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[200px] truncate font-medium">
            {row.getValue("name")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[300px] truncate font-medium">
            {row.getValue("email")}
          </span>
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
        <div className="flex space-x-2">
          <span className="max-w-[300px] truncate font-medium">
            {row.getValue("address")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => {
      const role = row.getValue("role") as string;
      return (
        <div className="flex space-x-2">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              role === "ADMIN"
                ? "bg-red-100 text-red-800"
                : role === "STORE_OWNER"
                ? "bg-blue-100 text-blue-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {role}
          </span>
        </div>
      );
    },
  },
];

// Admin Stores Columns
export const adminStoreColumns: ColumnDef<AdminStore>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Store Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[200px] truncate font-medium">
            {row.getValue("name")}
          </span>
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
        <div className="flex space-x-2">
          <span className="max-w-[300px] truncate font-medium">
            {row.getValue("address")}
          </span>
        </div>
      );
    },
  },
  // {
  //   accessorKey: "ownerName",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Owner Name" />
  //   ),
  //   cell: ({ row }) => {
  //     return (
  //       <div className="flex space-x-2">
  //         <span className="max-w-[200px] truncate font-medium">
  //           {row.getValue("ownerName") || "Unknown"}
  //         </span>
  //       </div>
  //     );
  //   },
  // },
  // {
  //   accessorKey: "ownerEmail",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Owner Email" />
  //   ),
  //   cell: ({ row }) => {
  //     return (
  //       <div className="flex space-x-2">
  //         <span className="max-w-[300px] truncate font-medium">
  //           {row.getValue("ownerEmail") || "Unknown"}
  //         </span>
  //       </div>
  //     );
  //   },
  // },
  {
    accessorKey: "averageRating",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Avg Rating" />
    ),
    cell: ({ row }) => {
      const rating = Number(row.getValue("averageRating") ?? 0);
      return (
        <div className="flex space-x-2">
          <span className="max-w-[100px] truncate font-medium">
            {rating.toFixed(2)}
          </span>
        </div>
      );
    },
  },
];
