import React from "react";
import { Textarea } from "~/islands/primitives/ui/textarea";
import { Button } from "~/islands/primitives/ui/button";
import { getServerAuthSession } from "~/utils/auth/users";
import { redirect } from "next/navigation";
import { db } from '~/data/db'; 
import { and, eq, not } from "drizzle-orm";
import { reviews } from "~/data/db/schema/pgsql";


export default function Rating({ productId }) {

  async function updateAddress(fd: FormData) {
    "use server";
    // Implement actual update logic here
    console.log("review", fd.get("review"));
    const userReview = fd.get("review") as string;
    const user = await getServerAuthSession();
    const userId = user?.id;
    try {
      await db('reviews').insert({
        userId: userId,
        productId: productId,
        rating: 3,
        comment: userReview,
        createdAt: new Date()  // Depending on DB setup, this might not be necessary.
      });
      console.log("Review successfully inserted");
    } catch (error) {
      console.error("Failed to insert review:", error);
    }
  }

  
  return (
    <>
      {/* styles omitted for brevity */}

      <form action={updateAddress}>
        <div className="grid w-full gap-2">
          <Textarea id="review" name="review" placeholder="Type your message here." />
          <Button type="submit">Send message</Button>
        </div>
      </form>
    </>
  );
}
