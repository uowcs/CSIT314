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
import { users } from "~/data/db/schema";
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
import { u } from "node_modules/@upstash/redis/zmscore-07021e27";
import { revalidatePath } from "next/cache";
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

export async function updateAddress(newAddress: string) {
	"use server";
	// Implement actual update logic here
	const user = await getServerAuthSession();
	const userId = user?.id;
	await db
		.update(users)
		.set({ address: newAddress })
		.where(userId ? eq(users.id, userId) : undefined);
}
export default async function ProfilesPage() {
	const debug = process.env.NODE_ENV === "";
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
	const currentAddress = async (): Promise<{
		userId: string | undefined;
		address: string;
	}> => {
		// Implement actual update logic here
		const user = await getServerAuthSession();
		const userId = user?.id;
		console.log("userId", userId);
		const address = await db.query.users.findFirst({
			where: userId ? eq(users.id, userId) : undefined,
			columns: {
				address: true,
			},
		});
		//return both userid and address
		return {
			userId: userId,
			address: address?.address ?? "NO ADDRESS", // Provide a default value or handle the undefined case
		};
	};
	const { userId, address } = await currentAddress();
	async function updateAddress(fd: FormData) {
		"use server";
		// Implement actual update logic here
		console.log("newaddress", fd.get("newAddress"));
		const newAddress = fd.get("newAddress") as string;
		const user = await getServerAuthSession();
		const userId = user?.id;
		await db
			.update(users)
			.set({ address: newAddress })
			.where(userId ? eq(users.id, userId) : undefined);
		revalidatePath("/dashboard/account");
	}
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

			<Card
				as="section"
				id="update-address"
				aria-labelledby="update-store-heading"
			>
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl">Update your Address</CardTitle>
				</CardHeader>
				<CardContent>
					<form action={updateAddress} className="grid w-full max-w-xl gap-5">
						<fieldset className="grid gap-2.5">
							<Input
								id="update-store-name"
								aria-describedby="update-store-name-description"
								name="newAddress"
								required
								minLength={3}
								maxLength={50}
								placeholder="Type store name here."
								defaultValue={address}
							/>
						</fieldset>
						<div className="flex flex-col gap-2 xs:flex-row">
							<LoadingButton>
								Update store
								<span className="sr-only">Update store</span>
							</LoadingButton>
						</div>
					</form>
				</CardContent>
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
