// pages/api/updateAddress.js
import {db} from '~/data/db';
import { and, eq, not } from "drizzle-orm";

import { users } from '~/data/db/schema';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Extract address and possibly user ID from the request body
      const { userId, newAddress } = req.body;
        console.log("userId", userId);
        console.log("newAddress", newAddress);
      // Update the address in the database
      // Ensure you have logic here to only allow updates for the user making the request
		await db
			.update(users)
			.set({ address: newAddress })
			.where(userId ? eq(users.id, userId) : undefined);
      

      res.status(200).json({ message: 'Address updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to update address', error: error.message });
    }
  } else {
    // Handle any other HTTP methods
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
