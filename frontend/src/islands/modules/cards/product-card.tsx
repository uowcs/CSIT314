"use client";

import * as React from "react";
import Image from "next/image";
import { cn, formatPrice } from "~/utils";
import { toast } from "react-hot-toast";

import { Link as ButtonLink } from "~/core/link";
import { type Product } from "~/data/db/schema";
import { Icons } from "~/islands/icons";
import { AspectRatio } from "~/islands/primitives/aspect-ratio";
import { Button } from "~/islands/primitives/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/islands/primitives/card";
import { Link } from "~/navigation";
import { addToCartAction } from "~/server/actions/cart";
// import { getServerAuthSession } from "~/utils/auth/users";
interface ProductDistance {
	distance: number;
	duration: number;
}
interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
	product: Pick<
		Product,
		| "id"
		| "storeId"
		| "name"
		| "price"
		| "images"
		| "category"
		| "inventory"
		| "rating"
		| "distance"
	>;
	storeId: number | undefined;
	variant?: "default" | "switchable" | "guest";
	isAddedToCart?: boolean;
	tAddToCart: string;
	onSwitch?: () => Promise<void>;
	userID: string;
}

async function getDistanceAndDuration(userID: string, storeId: number) {
	// "use server";
	const baseUrl = process.env.NEXT_PUBLIC_APP_URL; // set this in your .env file

	const response = await fetch(
		`${baseUrl}/api/distance?userId=${userID}&storeId=${storeId}`,
	);
	const data = await response.json();
	// console.log("data", data);
	const distance = data.distance;
	// console.log("distance", distance);
	const duration = data.duration;
	return { distance, duration };
}
export async function ProductCard({
	tAddToCart = "Add to cart",
	isAddedToCart = false,
	variant = "default",
	className,
	onSwitch,
	product,
	storeId,
	userID,
	...props
}: ProductCardProps) {
	const [isPending, startTransition] = React.useTransition();
	console.log("userID", userID);
	console.log("storeId", storeId);
	// const user = getServerAuthSession();
	// const userID = user?.id;
	// //create a new distance object of typpe ProductDistance that calles the async function getDistance

	// async function getDistance() {
	// 	const response = await fetch(
	// 		`/api/distance?userId=${userID}&storeId=${storeId}`,
	// 	);
	// 	const data = await response.json();
	// 	const distance = data.distance;
	// 	return distance;
	// }
	// const distance = getDistance();

	// console.log("(x) storeId:", storeId, typeof storeId);
	// console.log("(x) product.storeId:", product.storeId, typeof product.storeId);
	const isAuth = userID != undefined;
	let finaldistance = "";
	let duration = "";
	if (isAuth) {
		const distanceAndDuration = await getDistanceAndDuration(userID, storeId);
		const distance = distanceAndDuration.distance;
		if (distance >= 1000) {
			finaldistance = `${(distance / 1000).toFixed(2)} km`;
		} else {
			finaldistance = `${distance} m`;
		}
		// console.log("distance", distance);
		duration = distanceAndDuration.duration;
		// console.log("duration", duration);
	}
	return (
		<Card className={cn("h-full overflow-hidden", className)} {...props}>
			<Link
				aria-label={`View ${product.name} details`}
				href={`/product/${product.id}`}
			>
				<CardHeader className="border-b p-0">
					<AspectRatio ratio={4 / 3}>
						{product?.images?.length ? (
							<Image
								src={
									product.images[0]?.url ?? "/images/product-placeholder.webp"
								}
								alt={product.images[0]?.name ?? product.name}
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
								fill
								className="object-cover"
								loading="lazy"
							/>
						) : (
							<div
								aria-label="Placeholder"
								role="img"
								aria-roledescription="placeholder"
								className="flex h-full w-full items-center justify-center bg-secondary"
							>
								<Icons.placeholder
									className="h-9 w-9 text-muted-foreground"
									aria-hidden="true"
								/>
							</div>
						)}
					</AspectRatio>
				</CardHeader>
			</Link>
			<Link
				aria-label={`View ${product.name} details`}
				href={`/product/${product.id}`}
			>
				<CardContent className="grid gap-2.5 p-4">
					<CardTitle className="line-clamp-1">{product.name}</CardTitle>
					<CardDescription className="line-clamp-10 justify-between">
						<div>{formatPrice(product.price)}</div>
						<div className="flex items-center">
							{/* {product.rating} */}
							4.5
							<svg
								style={{ marginLeft: "4px" }} // Add some spacing to the left of the star icon
								width="16"
								height="16"
								viewBox="0 0 16 16"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								aria-hidden="true"
								element-id="2257"
							>
								<path
									d="M8.91126 0.588193C8.74945 0.230121 8.39293 0 7.99999 0C7.60705 0 7.25054 0.230121 7.08872 0.588193L5.37316 4.38448L1.23254 4.84295C0.841992 4.8862 0.512964 5.15416 0.39154 5.52786C0.270115 5.90157 0.378802 6.31175 0.669346 6.5763L3.7497 9.381L2.90621 13.4606C2.82665 13.8454 2.97982 14.2412 3.29771 14.4721C3.6156 14.7031 4.0393 14.7265 4.38068 14.5319L7.99999 12.469L11.6193 14.5319C11.9607 14.7265 12.3844 14.7031 12.7023 14.4721C13.0202 14.2412 13.1733 13.8454 13.0938 13.4606L12.2503 9.381L15.3306 6.5763C15.6212 6.31175 15.7299 5.90157 15.6084 5.52786C15.487 5.15416 15.158 4.8862 14.7674 4.84295L10.6268 4.38448L8.91126 0.588193Z"
									fill="#767676"
									element-id="2256"
								/>
							</svg>
						</div>
						<div>
							{isAuth !== false ? `${finaldistance}, ${duration}` : null}
						</div>
					</CardDescription>
				</CardContent>
			</Link>
			<CardFooter className="p-4">
				{variant === "default" && (
					<Button
						size="default"
						variant="secondary"
						className="h-8 w-full whitespace-nowrap"
						onClick={() => {
							startTransition(async () => {
								try {
									await addToCartAction({
										productId: product.id,
										storeId: Number(product.storeId),
										quantity: 1,
									});
									// console.log("(!) addToCartAction awaited...");
									// console.log(
									//   "(!) product.storeId:",
									//   product.storeId,
									//   typeof product.storeId,
									// );
									toast.success("Added to cart.");
								} catch (error) {
									error instanceof Error
										? toast.error(error.message)
										: toast.error(
												"Something went wrong, please try again later.",
											);
								}
							});
						}}
						disabled={isPending}
					>
						{isPending && (
							<Icons.spinner
								className="mr-2 h-4 w-4 animate-spin"
								aria-hidden="true"
							/>
						)}
						{tAddToCart}
					</Button>
				)}
				{variant === "switchable" && (
					<Button
						aria-label={isAddedToCart ? "Remove from cart" : `${tAddToCart}`}
						size="default"
						variant="secondary"
						className="h-8 w-full whitespace-nowrap"
						onClick={() => {
							startTransition(async () => {
								await onSwitch?.();
							});
						}}
						disabled={isPending}
					>
						{isPending ? (
							<Icons.spinner
								className="mr-2 h-4 w-4 animate-spin"
								aria-hidden="true"
							/>
						) : isAddedToCart ? (
							<Icons.check className="mr-2 h-4 w-4" aria-hidden="true" />
						) : (
							<Icons.add className="mr-2 h-4 w-4" aria-hidden="true" />
						)}
						{isAddedToCart ? "Added" : `${tAddToCart}`}
					</Button>
				)}
				{variant === "guest" && (
					<ButtonLink
						href="/sign-in"
						size="default"
						variant="secondary"
						className="h-8 w-full whitespace-nowrap"
					>
						{tAddToCart}
					</ButtonLink>
				)}
			</CardFooter>
		</Card>
	);
}
