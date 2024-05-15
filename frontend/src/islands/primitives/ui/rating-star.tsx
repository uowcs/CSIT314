import React from "react";
import { Textarea } from "~/islands/primitives/ui/textarea";
import { Button } from "~/islands/primitives/ui/button";
import { db } from "~/data/db";
import { redirect } from "next/navigation";
import { toast } from "~/islands/primitives/ui/use-toast";
import { getServerAuthSession } from "~/utils/auth/users";
import { reviews } from "~/data/db/schema/pgsql";

export default async function Rating({ productId }) {
  const session = await getServerAuthSession();
  if (!session) redirect("/auth");

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const text = formData.get('reviewText');

    try {
      await db.insert(reviews).values({
        comment: text,
        rating: 0, // Assuming a default rating of 0 since it's not required
        userId: session.user.id,
        productId: productId,
        createdAt: new Date(),
      });
      toast("Review submitted successfully", "success");
    } catch (error) {
      console.error('Error submitting review:', error);
      toast("Failed to submit review", "error");
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Textarea name="reviewText" placeholder="Type your review here." />
        <Button type="submit">Submit Review</Button>
      </form>
    </>
  );
}

export async function getServerSideProps(context) {
  const { productId } = context.query;
  const session = await getServerAuthSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {
      productId,
      userId: session.user.id, // Assuming the session has user ID
    },
  };
}
