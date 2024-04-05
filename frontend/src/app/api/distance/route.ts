import { db } from "~/data/db";
import { eq } from "drizzle-orm";
import { stores, users } from "~/data/db/schema";
import fetch from "node-fetch"; // ensure you have node-fetch installed
import { type NextRequest, NextResponse } from "next/server";
import type { NextApiRequest } from "next";
const cache = {};
export async function GET(req: NextRequest | Request, res: NextResponse) {
	// Parse query parameters
	// const { userId, storeId } = req.body;
	// console.log("userId", userId);
	// console.log("storeId", storeId);
	if (!req.url) {
		return NextResponse.error(); // Remove the argument from the function call
	}
	const url = new URL(req.url);
	// Accessing searchParams from the parsed URL
	const searchParams = url.searchParams;
	// Now you can get individual query parameters by name
	const userId = searchParams.get("userId");
	const storeId = searchParams.get("storeId");
	const cacheKey = `distance:${userId}:${storeId}`;
	if (cache[cacheKey]) {
		console.log("Returning cached response");
		return NextResponse.json(cache[cacheKey]);
	}
	try {
		// Fetch user and store details
		const user = await db.query.users.findFirst({
			where: userId ? eq(users.id, userId) : undefined,
			select: { address: true }, // select only the address
		});

		const store = await db.query.stores.findFirst({
			where: eq(stores.id, Number(storeId)), // Convert storeId to number
			select: { address: true }, // select only the address
		});

		if (!user || !store) {
			return NextResponse.error({
				status: 404,
				body: "User or store not found",
			});
		}

		console.log("user address", user.address);
		console.log("store address", store.address);
		// Construct the request URL for Google Maps Distance Matrix API
		const googleMapsURL = new URL(
			"https://maps.googleapis.com/maps/api/distancematrix/json",
		);
		googleMapsURL.searchParams.append("origins", user.address); // or the user's coordinates
		googleMapsURL.searchParams.append("destinations", store.address); // or the store's coordinates
		googleMapsURL.searchParams.append("key", process.env.GOOGLE_MAPS_API_KEY);
		googleMapsURL.searchParams.append("mode", "driving"); // can also be 'walking', 'bicycling', or 'transit'

		// Make the request to Google Maps API
		const response = await fetch(googleMapsURL.href);
		const data = await response.json();

		// Check for any errors in the response
		if (data.status !== "OK") {
			console.error("Error from Google Maps API:", data);
			return NextResponse.error();
		}

		// Assuming we have one origin and one destination, take the first element
		const result = data.rows[0].elements[0];
		const distance = result.distance.value; // Distance in meters
		const duration = result.duration.text; // Human-readable duration
		const distanceResponse = { distance, duration };
		cache[cacheKey] = distanceResponse;
		// // Return the distance and duration in the response
		// res.status(200).json({ distance, duration });
		return NextResponse.json(distanceResponse);
	} catch (error) {
		console.error("Failed to calculate distance:", error);
		NextResponse.error();
	}
}
