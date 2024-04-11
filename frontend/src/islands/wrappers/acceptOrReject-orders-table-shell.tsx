"use client";

import * as React from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { type CheckoutItem } from "~/types";
import { cn, formatDate, formatPrice } from "~/utils";

import { type Order } from "~/data/db/schema";
import { DataTable } from "~/islands/modules/data-table/data-table";
import { DataTableColumnHeader } from "~/islands/modules/data-table/data-table-column-header";
import { Badge } from "~/islands/primitives/badge";

type OrdersTableShellProps = {
  data: Order[];
  pageCount: number;
};

export function AcceptRejectOrdersTableShell({ data, pageCount }: OrdersTableShellProps) {
  // Memoize the columns so they don't re-render on every render
  const columns = React.useMemo<ColumnDef<Order, unknown>[]>(
    () => [
      {
        accessorKey: "id",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Order ID" />
        ),
      },
      {
        accessorKey: "email",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Customer" />
        ),
      },
      {
        accessorKey: "stripePaymentIntentStatus",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Payment Status" />
        ),
        cell: ({ cell }) => {
          return (
            <Badge
              variant="outline"
              className={cn(
                "pointer-events-none text-sm capitalize",
                cell.getValue() === "paid" ? "bg-green-600" : "bg-red-600",
              )}
            >
              {String(cell.getValue())}
            </Badge>
          );
        },
      },
      {
        accessorKey: "total",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Total" />
        ),
        cell: ({ cell }) => formatPrice(cell.getValue() as number),
      },
      {
        accessorKey: "items",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Item Count" />
        ),
        cell: ({ cell }) => {
          const checkoutItems = cell.getValue() as CheckoutItem[];

          const totalItems = checkoutItems.reduce(
            (acc, item) => acc + item.quantity,
            0,
          );

          return <span>{totalItems}</span>;
        },
      },
      {
        accessorKey: "createdAt",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Created At" />
        ),
        cell: ({ cell }) => formatDate(cell.getValue() as Date),
        enableColumnFilter: false,
      },
      {
        accessorKey: "acceptOrReject", // Temporary accessor key, replace when needed.
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Accept/Decline" />
        ),
        cell: ({ cell }) => <div>
          <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            Accept
          </button>
          <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
            Decline
          </button>
        </div>,
        enableColumnFilter: false,
      },
    ],
    [],
  );

  return (
    <DataTable
      columns={columns}
      data={data}
      pageCount={pageCount}
      searchableColumns={[
        {
          id: "email",
          title: "customers",
        },
      ]}
    />
  );
}
