"use client";
import React, { useState } from "react";
import { Input } from "~/islands/primitives/input";
import { Button } from "~/islands/primitives/button";

// Define props if you have any, for example:
interface AddressCardProps {
	initialAddress: string;
}

export const AddressCard = ({ initialAddress }: AddressCardProps) => {
	const [isEditing, setIsEditing] = useState(false);
	const [address, setAddress] = useState(initialAddress);

	const updateAddress = async (newAddress: string) => {
		console.log("Address updated to:", newAddress);
		setIsEditing(false);
		// Implement actual update logic here
	};

	return (
		<div className="flex flex-col gap-2">
			<div className="flex items-center gap-4 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-t-lg">
				<div className="flex-1">
					{isEditing ? (
						<Input
							value={address}
							onChange={(e) => setAddress(e.target.value)}
							autoFocus
						/>
					) : (
						<div className="grid gap-1.5">
							<h3 className="text-sm font-medium tracking-wide">Home</h3>
							<p className="text-sm text-gray-500 dark:text-gray-400">
								{address}
							</p>
						</div>
					)}
				</div>
				<Button
					size="sm"
					onClick={() => {
						if (isEditing) {
							updateAddress(address);
						} else {
							setIsEditing(true);
						}
					}}
				>
					{isEditing ? "Save" : "Edit"}
				</Button>
			</div>
		</div>
	);
};
