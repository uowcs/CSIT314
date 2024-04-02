import { db } from "~/data/db";
import { eq } from "drizzle-orm";
import { stores, users } from "~/data/db/schema";
import fetch from "node-fetch"; // ensure you have node-fetch installed

export async function GET(req, res) {
	// Parse query parameters
	const { userId, storeId } = req.query;

	try {
		// Fetch user and store details
		const user = await db.query.users.findFirst({
			where: userId ? eq(users.id, userId) : undefined,
			select: { address: true }, // select only the address
		});

		const store = await db.query.stores.findFirst({
			where: eq(stores.id, storeId),
			select: { address: true }, // select only the address
		});

		if (!user || !store) {
			return res.status(404).json({ error: "User or store not found" });
		}

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
			return res
				.status(500)
				.json({ error: "Failed to get distance from Google Maps API" });
		}

		// Assuming we have one origin and one destination, take the first element
		const result = data.rows[0].elements[0];
		const distance = result.distance.value; // Distance in meters
		const duration = result.duration.text; // Human-readable duration

		// Return the distance and duration in the response
		res.status(200).json({ distance, duration });
	} catch (error) {
		console.error("Failed to calculate distance:", error);
		res.status(500).json({ error: "Internal server error" });
	}
}
