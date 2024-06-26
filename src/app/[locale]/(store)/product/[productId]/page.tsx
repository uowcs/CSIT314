import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { formatPrice } from "~/utils";
import { getCookie, setCookie } from "cookies-next";
import { and, desc, eq, not } from "drizzle-orm";
import { getTranslations } from "next-intl/server";
import { titleCase } from "string-ts";

import { Link as ButtonLink } from "~/core/link";
import { db } from "~/data/db";
import { products, stores, users, type Product } from "~/data/db/schema";
import { reviews, type Review } from "~/data/db/schema/pgsql";
import { env } from "~/env.mjs";
import { AddToCartForm } from "~/forms/add-to-cart-form";
import { ProductCard } from "~/islands/modules/cards/product-card";
import { Breadcrumbs } from "~/islands/navigation/pagination/breadcrumbs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/islands/primitives/accordion";
import { Separator } from "~/islands/primitives/separator";
import { ProductImageCarousel } from "~/islands/product-image-carousel";
import { Shell } from "~/islands/wrappers/shell-variants";
import { Link, redirect } from "~/navigation";
import { getServerAuthSession, getUserById } from "~/utils/auth/users";

interface ProductPageProperties {
  params: {
    productId: string;
  };
}

export async function generateMetadata({
  params,
}: ProductPageProperties): Promise<Metadata> {
  const productId = Number(params.productId);

  const product = await db.query.products.findFirst({
    columns: { name: true, description: true },
    where: eq(products.id, productId),
  });

  if (!product) return {};

  return {
    metadataBase: new URL(env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
    title: titleCase(product.name),
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProperties) {
  const session = await getServerAuthSession();
  const guestEmail = getCookie("GUEST_EMAIL")?.toString() || null;
  let user = null;
  let premiumStatus = false;
  if(session != undefined){
    user = await getUserById(session.id);
    premiumStatus = user?.isPremium;
  }
  const t = await getTranslations();

  const productId = Number(params.productId);

  const product: Product = await db.query.products.findFirst({
    columns: {
      id: true,
      name: true,
      description: true,
      price: true,
      images: true,
      category: true,
      storeId: true,
      rating: true,
    },
    where: eq(products.id, productId),
  });

  const productReviews: Review[] = await db.query.reviews.findMany({
    columns: {
      userId: true,
      rating: true,
      comment: true,
      createdAt: true,
    },
    where: eq(reviews.productId, productId),
  });



  const averageRating = productReviews.length
  ? productReviews.reduce((sum, productReviews) => sum + productReviews.rating, 0) / productReviews.length
  : 0;


  if (!product) notFound();

  const store = await db.query.stores.findFirst({
    columns: { id: true, name: true },
    where: eq(stores.id, Number(product.storeId)),
  });

  const otherProducts =
    store ?
      await db
        .select({
          id: products.id,
          name: products.name,
          price: products.price,
          images: products.images,
          category: products.category,
          inventory: products.inventory,
          rating: products.rating,
        })
        .from(products)
        .limit(4)
        .where(
          and(
            eq(products.storeId, product.storeId),
            not(eq(products.id, productId)),
          ),
        )
        .orderBy(desc(products.inventory))
    : [];

  return (
    <Shell>
      <Breadcrumbs
        segments={[
          {
            title: `${t("store.product.products")}`,
            href: "/products",
          },
          {
            title: titleCase(product.category),
            href: `/products?category=${product.category}`,
          },
          {
            title: product.name,
            href: `/product/${product.id}`,
          },
        ]}
      />
      <div className="flex flex-col gap-8 md:flex-row md:gap-16">
        <ProductImageCarousel
          className="w-full md:w-1/2"
          images={product.images ?? []}
          options={{ loop: true }}
        />
        <Separator className="mt-4 md:hidden" />
        <div className="flex w-full flex-col gap-4 md:w-1/2">
          <div className="space-y-2">
            <h2 className="line-clamp-1 text-2xl font-bold">{product.name}</h2>

						{premiumStatus ? (
							<><div style={{ textDecoration: 'line-through' }}>{product.price}</div><div>{formatPrice(product.price * 0.9)}</div></>
						) : (
							<div>{formatPrice(product.price)}</div>
						)}
            {store ?
              <Link
                href={`/products?store_ids=${store.id}`}
                className="line-clamp-1 inline-block text-base text-muted-foreground hover:underline"
              >
                {store.name}
              </Link>
            : null}
          </div>

          <Separator className="my-1.5" />

          {guestEmail || session ?
            <AddToCartForm
              productId={productId}
              storeId={store.id}
              tAddToCart={t("store.product.addToCart")}
            />
          : <ButtonLink
              href="/sign-in"
              size="default"
              variant="secondary"
              className="max-w-[164px] whitespace-nowrap"
            >
              {t("store.product.addToCart")}
            </ButtonLink>
          }

          <Separator className="mt-5" />

          <Accordion
            type="single"
            collapsible
            defaultValue="description"
            className="w-full"
          >
            <AccordionItem value="description">
              <AccordionTrigger>
                {t("store.product.description")}
              </AccordionTrigger>
              <AccordionContent>
                {product.description && product.description.length > 0 ?
                  product.description
                : `${t("store.product.noDescription")}`}
              </AccordionContent>
            <Separator className="mt-5" />

            <AccordionContent>

  <div className="mt-5 mb-5 flex flex-row">
  {[...Array(5)].map((star, i) => (
    <svg
      key={i}
      className={`w-6 h-6 ${i < averageRating ? 'text-yellow-300' : 'text-gray-300'} me-1`}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 22 20"
    >
      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
    </svg>
  ))}
  <p className="ms-1 text-lg font-medium text-gray-500 dark:text-gray-400">
    {averageRating.toFixed(2)}
  </p>
  <p className="ms-1 text-lg font-medium text-gray-500 dark:text-gray-400">out of</p>
  <p className="ms-1 text-lg font-medium text-gray-500 dark:text-gray-400">5</p>
</div>
<p className="text-lg font-medium text-gray-500 dark:text-gray-400">{productReviews.length} global ratings</p>

              </AccordionContent>
            </AccordionItem>


          </Accordion>
        </div>
      </div>
      
{/* Product Page */}
      {/* {env.NODE_ENV === "development" && (
        <>
          <Separator />
          <h1 className="font-semibold">[localhost-only-debug-info]</h1>
          <div className="space-y-2">
            <p>store.id: {store.id}</p>
            <p>productId: {productId}</p>
            <p>product.storeId: {product.storeId}</p>
            <p>product.price: {product.price}</p>
            <p>product.inventory: {product.inventory || 0}</p>
            <p>store.name: {store.name}</p>
            <p>product.category: {product.category}</p>
            <p>product.name: {product.name}</p>
            <p>product.rating: {product.rating}.</p>
            <p>guestEmail: {guestEmail || "not set or not found in cookie"}</p>
          </div>
          {store && otherProducts.length > 0 ?
            <Separator />
          : null}
        </>
      )} */}

<div className="flex w-full flex-col gap-4 md:w-1/2">
<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Read Reviews </AccordionTrigger>
    <AccordionContent>
    <div className="reviews-container">
      
      {productReviews.map((review, index) => (
        <div key={index} className="pt-4 mt-4 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((star, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < review.rating ? 'text-yellow-300' : 'text-gray-300'} me-1`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            ))}
            <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
              {review.rating.toFixed(2)}
            </p>
            <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">out of</p>
            <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">5</p>
          </div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {review.comment}
          </p>
          <p className="text-sm text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</p>
        </div>
      ))}
      </div>
    </AccordionContent>
  </AccordionItem>
</Accordion>
      
    </div>

    

      
       
      {store && otherProducts.length > 0 ?
        <div className="overflow-hidden md:pt-6">
          <h2 className="line-clamp-1 flex-1 text-2xl font-bold">
            {t("store.product.moreProductsFrom", {
              storeName: store.name,
            })}
          </h2>
          <div className="overflow-x-auto pb-2 pt-6">
            <div className="flex w-fit gap-4">
              {otherProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  storeId={product.storeId}
                  className="min-w-[260px]"
                  tAddToCart={t("store.product.addToCart")}
                  isUserPremium={premiumStatus}
                />
              ))}
            </div>
          </div>
        </div>
      : null}
    </Shell>
  );
}
