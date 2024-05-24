import React from "react";
import { Textarea } from "~/islands/primitives/ui/textarea";
import { Button } from "~/islands/primitives/ui/button";
import { getServerAuthSession } from "~/utils/auth/users";
import { redirect } from "next/navigation";
import { db } from '~/data/db'; 
import { reviews } from "~/data/db/schema/pgsql";

export default function Rating({ productId }) {

  async function postReview(formData: FormData) {
    "use server";
    const userReview = formData.get("review") as string;
    const productRating = formData.get("rating") as string;
    const user = await getServerAuthSession();
    const userId = user?.id;

    try {
      await db.insert(reviews).values({
        userId: userId,
        productId: productId,
        rating: parseInt(productRating),  // Ensure the rating is an integer
        comment: userReview,
        createdAt: new Date() 
      });
      redirect(`/dashboard/purchases`);
    } catch (error) {
      console.error("Failed to insert review:", error);
    }
  }

  return (
    <>
      {/* styles omitted for brevity */}
      <form action={postReview}>
        <div className="grid w-full gap-2">
          <Textarea id="review" name="review" placeholder="Type your message here." />
          <label htmlFor="rating" className="mb-2">Rating:</label>
          <input type="range" id="rating" name="rating" min="1" max="5" />
          <div className="flex justify-between w-full px-2 mt-1">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
          </div>
        </div>
        <Button type="submit">Send Review</Button>
      </form>
    </>
  );
}
