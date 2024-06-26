import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { and, asc, desc, eq, like, sql } from "drizzle-orm";

import { db } from "~/data/db";
import { orders, stores, type Order } from "~/data/db/schema";
import { env } from "~/env.mjs";
import { OrdersTableShell } from "~/islands/wrappers/orders-table-shell";
import {AcceptRejectOrdersTableShell} from "~/islands/wrappers/acceptOrReject-orders-table-shell";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  title: "Orders",
  description: "Manage your orders",
};

interface OrdersPageProperties {
  params: {
    storeId: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export default async function OrdersPage({
  params,
  searchParams,
}: OrdersPageProperties) {
  const storeId = Number(params.storeId);

  const { page, per_page, sort, email } = searchParams ?? {};

  const store = await db.query.stores.findFirst({
    where: eq(stores.id, storeId),
    columns: { id: true, name: true },
  });

  if (!store) {
    notFound();
  }

  // Number of items per page
  const limit = typeof per_page === "string" ? parseInt(per_page) : 10;
  // Number of items to skip
  const offset =
    typeof page === "string" ?
      parseInt(page) > 0 ?
        (parseInt(page) - 1) * limit
      : 0
    : 0;
  // Column and order to sort by
  const [column, order] =
    typeof sort === "string" ?
      (sort.split(".") as [keyof Order | undefined, "asc" | "desc" | undefined])
    : [];

  // Transaction is used to ensure both queries are executed in a single transaction
  const { items, total } = await db.transaction(async (tx) => {
    const items = await tx
      .select()
      .from(orders)
      .limit(limit)
      .offset(offset)
      .where(
        and(
          eq(orders.storeId, storeId),
          // Filter by name
          typeof email === "string" ?
            like(orders.email, `%${email}%`)
          : undefined,
        ),
      )
      .orderBy(
        column && column in orders ?
          order === "asc" ?
            asc(orders[column])
          : desc(orders[column])
        : desc(orders.createdAt),
      );

    const total = await tx
      .select({
        count: sql<number>`count(${orders.id})`,
      })
      .from(orders)
      .where(
        and(
          eq(orders.storeId, storeId),
          // Filter by name
          typeof email === "string" ?
            like(orders.email, `%${email}%`)
          : undefined,
        ),
      )
      .then((res) => res[0]?.count ?? 0);

    return {
      items,
      total,
    };
  });

    // Transaction is used to ensure both queries are executed in a single transaction
    const { tempitem, temptotal } = await db.transaction(async (tx) => {
      const tempitem = await tx
        .select()
        .from(orders)
        .limit(limit)
        .offset(offset)
        .where(
          and(
            eq(orders.storeId, storeId),
            // Filter by name
            typeof email === "string" ?
              like(orders.email, `%${email}%`)
            : undefined,
          ),
        )
        .orderBy(
          column && column in orders ?
            order === "asc" ?
              asc(orders[column])
            : desc(orders[column])
          : desc(orders.createdAt),
        );
  
      const temptotal = await tx
        .select({
          count: sql<number>`count(${orders.id})`,
        })
        .from(orders)
        .where(
          and(
            eq(orders.storeId, storeId),
            // Filter by name
            typeof email === "string" ?
              like(orders.email, `%${email}%`)
            : undefined,
          ),
        )
        .then((res) => res[0]?.count ?? 0);
  
      return {
        tempitem,
        temptotal,
      };
    });

  const pageCount = Math.ceil(total / limit);
  const tempPageCount = Math.ceil(temptotal / limit);

  // TODO: UNCOMMENT !! TEMP SOLUTION
  return (
    <div>
      <h1 className="m-2 font-extrabold text-lg">Accept/Reject orders</h1>
      <AcceptRejectOrdersTableShell data={tempitem} pageCount={tempPageCount} />
      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
      <h1 className="m-2 font-extrabold text-lg">Order history</h1>
      <OrdersTableShell data={items} pageCount={pageCount} />
    </div>
  )
  return <h1>Orders</h1>;
}
