"use client";
import React, { useState } from "react";
import { Input } from "~/islands/primitives/input";
import { Button } from "~/islands/primitives/button";
// Define props if you have any, for example:
interface AddressCardProps {
	initialAddress: string;
	userID: string;
}

export const AddressCard = ({ initialAddress, userID }: AddressCardProps) => {
	const [isEditing, setIsEditing] = useState(false);
	//create a function that queries the database to get the users current address
	const [address, setAddress] = useState(initialAddress);
	const [addressName, setAddressName] = useState("Home");

	async function saveAddress(newAddress) {
		console.log("newAddress", newAddress);
		setIsEditing(false); // Close editing mode regardless of the result
		try {
			console.log("newAddress", newAddress);
			const response = await fetch("/api/updateAddress", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					userId: userID, // Make sure to securely identify the user, possibly through authentication tokens
					newAddress: newAddress,
				}),
			});
			console.log("response", response);

			if (response.ok) {
				console.log("Address updated successfully");
				// Optionally, update local state or trigger a re-fetch/reload to show the updated address
			} else {
				throw new Error("Failed to update the address");
			}
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<div className="flex flex-col gap-2">
			<div className="flex items-center gap-4 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-t-lg">
				<div className="flex-1">
					{isEditing ? (
						<div>
							<Input
								value={addressName}
								onChange={(e) => setAddressName(e.target.value)}
								className="mb-4 focus:outline-none"
							/>
							<Input
								value={address}
								onChange={(e) => setAddress(e.target.value)}
							/>
						</div>
					) : (
						<div className="grid gap-1.5">
							<h3 className="text-sm font-medium tracking-wide">
								{addressName}
							</h3>
							<p className="text-sm text-gray-500 dark:text-gray-400">
								{address}
							</p>
						</div>
					)}
				</div>
				{/* <Button
					size="sm"
					onClick={() => {
						console.log("isEditing", isEditing);
						if (isEditing) {
							saveAddress(address);
						} else {
							setIsEditing(true);
						}
					}}
				>
					{isEditing ? "Save" : "Edit"}
				</Button> */}
				<button
					onClick={() => {
						console.log("isEditing", isEditing);
						if (isEditing) {
							saveAddress(address); // Ensure this is the correct variable to pass
						} else {
							setIsEditing(true);
						}
					}}
				>
					{isEditing ? "Save" : "Edit"}
				</button>
			</div>
		</div>
	);
};
