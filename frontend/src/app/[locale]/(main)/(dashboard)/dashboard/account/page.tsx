import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { LoadingButton } from "~/islands/loading-button";
import { Input } from "~/islands/primitives/input";
import { Label } from "~/islands/primitives/label";
import { Textarea } from "~/islands/primitives/textarea";
import { ConnectStoreToStripeButton } from "~/islands/stripe-btn-connect";
import { UserProfileClerk } from "~/core/auth/clerkjs/islands/user-profile-clerk";
// import { seo } from "~/data/meta";
import { fullURL } from "~/data/meta/builder";
import { env } from "~/env.mjs";
import {
	PageHeader,
	PageHeaderDescription,
	PageHeaderHeading,
} from "~/islands/navigation/page-header";
import { Shell } from "~/islands/wrappers/shell-variants";
import { getServerAuthSession } from "~/utils/auth/users";
import { User } from "~/data/db/schema";
import { and, eq, not } from "drizzle-orm";
import { db } from "~/data/db";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/islands/primitives/card";
import { Button } from "~/islands/primitives/button";
// import React, { useState } from "react";
import { AddressCard } from "~/islands/account/AddressCard";
// import dynamic from "next/dynamic";

// // Dynamically import the AddressCard with SSR disabled
// const AddressCard = dynamic(() => import("~/islands/account/AddressCard"), {
// 	ssr: false,
// });
// export const metadata = seo({
export const metadata: Metadata = {
	metadataBase: fullURL(),
	title: "Link Accounts",
	description: "Link your accounts",
};

export default async function ProfilesPage() {
	const debug = process.env.NODE_ENV === "development";
	const user = await getServerAuthSession();
	if (!user) redirect("/auth");
	// async function updateStore(fd: FormData) {
	// 	"use server";

	// 	const name = fd.get("name") as string;
	// 	const description = fd.get("description") as string;
	// 	const address = fd.get("address") as string;

	// 	const storeWithSameName = await db.query.stores.findFirst({
	// 		where: and(eq(stores.name, name), not(eq(stores.id, storeId))),
	// 		columns: {
	// 			id: true,
	// 		},
	// 	});

	// 	if (storeWithSameName) {
	// 		toast.error("Store name already taken.");
	// 		return;
	// 	}

	// 	await db
	// 		.update(stores)
	// 		.set({ name, description, address })
	// 		.where(eq(stores.id, storeId));

	// 	revalidatePath(`/dashboard/stores/${storeId}`);
	// }
	return (
		<Shell variant="sidebar">
			<PageHeader
				id="account-header"
				aria-labelledby="account-header-heading"
				separated
			>
				<PageHeaderHeading size="sm">Account</PageHeaderHeading>
				<PageHeaderDescription size="sm">
					Manage your account settings
				</PageHeaderDescription>
			</PageHeader>

			{env.NEXT_PUBLIC_AUTH_PROVIDER === "clerk" && (
				<>
					<section
						id="user-account-info"
						aria-labelledby="user-account-info-heading"
						className="w-full overflow-hidden"
					>
						<UserProfileClerk />
					</section>
				</>
			)}

			{env.NEXT_PUBLIC_AUTH_PROVIDER === "authjs" && (
				<>
					<h2 className="rounded-lg border p-4">
						This page is under construction.
						<br />
						Please{" "}
						<Link href="/dashboard/stores" className="underline">
							visit Stores Page
						</Link>{" "}
						for now.
					</h2>
				</>
			)}
			<Card>
				<CardHeader>
					<CardTitle>Saved Addresses</CardTitle>
					<CardDescription>Manage your saved addresses</CardDescription>
				</CardHeader>
				<CardContent className="p-0">
					{/* Use the new AddressCard component */}
					<AddressCard initialAddress="1234 Sunshine Rd" />
				</CardContent>
				<CardFooter className="p-0">
					<Button size="sm" variant="outline">
						New Address
					</Button>
				</CardFooter>
			</Card>
			{debug && (
				<>
					<h2 className="-mb-6 font-bold">
						[localhost-debug-mode-user-object]
					</h2>
					<pre>
						<code>{JSON.stringify(user, null, 2)}</code>
					</pre>
				</>
			)}
		</Shell>
	);
}
