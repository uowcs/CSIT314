import { type Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { desc, eq, sql } from "drizzle-orm";
import { Home, Package2, PanelLeft, Search, Users2 } from "lucide-react";

// src/islands/primitives/ui
import Rating from '../../../../../../../src/islands/primitives/ui/rating-star'

import { db } from "~/data/db";
import { products, stores, type Product, type Store } from "~/data/db/schema";
import { fullURL } from "~/data/meta/builder";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/islands/navigation/page-header";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/islands/primitives/ui/alert-dialog";
import { Textarea } from "~/islands/primitives/ui/textarea";
import { Badge } from "~/islands/primitives/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/islands/primitives/ui/breadcrumb";
import { Button } from "~/islands/primitives/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/islands/primitives/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/islands/primitives/ui/dropdown-menu";
import { Input } from "~/islands/primitives/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "~/islands/primitives/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/islands/primitives/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "~/islands/primitives/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/islands/primitives/ui/tooltip";
import { Shell } from "~/islands/wrappers/shell-variants";
import { getServerAuthSession } from "~/utils/auth/users";

export const metadata: Metadata = {
  metadataBase: fullURL(),
  title: "Purchases",
  description: "Manage your purchases",
};



const listOfPurchasedProducts = await db
  .select({
    id: products.id,
    name: products.name,
    storeId: products.storeId,
    storeName: stores.name, // Added store name here
    images: products.images,
    category: products.category,
    price: products.price,
    inventory: products.inventory,
    rating: products.rating,
    stripeAccountId: sql`MAX(${stores.stripeAccountId})`,
  })
  .from(products)
  .limit(8)
  .leftJoin(stores, eq(products.storeId, stores.id))
  .groupBy(products.id, stores.name) // Include stores.name in groupBy if it affects the aggregation
  .orderBy(desc(sql`MAX(${stores.stripeAccountId})`), desc(products.createdAt));

export default async function PurchasesPage() {
  const session = await getServerAuthSession();
  if (!session) redirect("/auth");

  // async function getStoreName(storeId: string): Promise<string> {
  //   'use server'
  //   const store = await db.select({ name: stores.name }).from(stores).where({
  //     id: storeId,
  //   });
  //   return store[0].name;
  // }

  return (
    <Shell variant="sidebar">
      <PageHeader
        id="dashboard-purchases-header"
        aria-labelledby="dashboard-purchases-header-heading"
      >
        <PageHeaderHeading size="sm">Purchases</PageHeaderHeading>
      </PageHeader>
      <Tabs defaultValue="all">
        <TabsContent value="all">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Purchases made so far !</CardTitle>
              <CardDescription>View and manage your purchases.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell">
                      <span className="sr-only">Image</span>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Store</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Price</TableHead>
                    {/* <TableHead className="hidden md:table-cell">
                      Created at
                    </TableHead> */}
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {listOfPurchasedProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        {(product.images || []).map((image, index) => (
                          <Image
                            alt="Product image"
                            className="aspect-square rounded-md object-cover"
                            height="64"
                            key={index}
                            src={image.url}
                            width="64"
                          />
                        ))}
                      </TableCell>
                      <TableCell className="font-medium">
                        {product.name}
                      </TableCell>
                      <TableCell className="font-medium">
                        {/* {getStoreName(product.storeId)} */}
                        {product.storeName}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{product.category}</Badge>
                      </TableCell>
                      <TableCell>${Number(parseFloat(product.price).toPrecision(2)) + Number("15")}</TableCell>
                      <TableCell>
                        {" "}
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline">Rate this meal !</Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                We hope, we have served at your best
                              </AlertDialogTitle>
                              <AlertDialogDescription>

                                <Rating productId={product.id} />
                                {/* Rating for item in purchases */}
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                      {/* <TableCell className="hidden md:table-cell">
                        {new Date(product.createdAt).toLocaleString()}
                      </TableCell> */}
                      
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            {/* <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing <strong>1-10</strong> of <strong>32</strong> products
              </div>
            </CardFooter> */}
          </Card>
        </TabsContent>
      </Tabs>
    </Shell>
  );
}
