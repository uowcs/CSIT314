import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { getTranslations } from "next-intl/server";

import { db } from "~/data/db";
import { products, stores } from "~/data/db/schema";
import { fullURL } from "~/data/meta/builder";
import { env } from "~/env.mjs";
import { Breadcrumbs } from "~/islands/navigation/pagination/breadcrumbs";
import { Separator } from "~/islands/primitives/separator";
import { Products } from "~/islands/products";
import { Shell } from "~/islands/wrappers/shell-variants";
import { getProductsAction } from "~/server/actions/product";
import { getStoresAction } from "~/server/actions/store";
import { getServerAuthSession } from "~/utils/auth/users";

interface StorePageProperties {
	params: {
		storeId: string;
	};
	searchParams: {
		[key: string]: string | string[] | undefined;
	};
}

async function getStoreFromParams(params: StorePageProperties["params"]) {
	const storeId = Number(params.storeId);

	return await db.query.stores.findFirst({
		where: eq(stores.id, storeId),
	});
}

export async function generateMetadata({
	params,
}: StorePageProperties): Promise<Metadata> {
	const store = await getStoreFromParams(params);

	if (!store) {
		return {};
	}

	return {
		metadataBase: new URL(env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
		title: store.name,
		description: store.description,
	};
}

export default async function StorePage({
	params,
	searchParams,
}: StorePageProperties) {
	const store = await getStoreFromParams(params);

	if (!store) {
		notFound();
	}

	const { page, per_page, store_page } = searchParams;

	const t = await getTranslations();

	// Products transaction
	const limit = typeof per_page === "string" ? parseInt(per_page) : 8;
	const offset = typeof page === "string" ? (parseInt(page) - 1) * limit : 0;

	const productsTransaction = await getProductsAction({
		limit: limit,
		offset: offset,
		store_ids: String(store.id),
	});

	const pageCount = Math.ceil(productsTransaction.count / limit);

	// Stores transaction
	const storesLimit = 25;
	const storesOffset =
		typeof store_page === "string"
			? (parseInt(store_page) - 1) * storesLimit
			: 0;

	const storesTransaction = await getStoresAction({
		limit: storesLimit,
		offset: storesOffset,
		sort: "name.asc",
	});

	const storePageCount = Math.ceil(storesTransaction.count / storesLimit);

	const session = await getServerAuthSession();

	return (
		<Shell>
			<Breadcrumbs
				segments={[
					{
						title: `${t("store.stores.stores")}`,
						href: "/stores",
					},
					{
						title: store.name,
						href: `/store/${store.id}`,
					},
				]}
			/>
			<div className="flex flex-col gap-8 md:flex-row md:gap-16">
				<div className="flex w-full flex-col gap-4">
					<div className="space-y-2">
						<h2 className="line-clamp-1 text-2xl font-bold">{store.name}</h2>
						<p className="text-base text-muted-foreground">
							{store.description}
						</p>
					</div>
					<Separator className="my-1.5" />
					<Products
						products={productsTransaction.items}
						pageCount={pageCount}
						categories={Object.values(products.category.enumValues)}
						stores={storesTransaction.items}
						storePageCount={storePageCount}
						session={session?.id ?? null}
						tAddToCart={t("store.product.addToCart")}
					/>
				</div>
			</div>
		</Shell>
	);
}
