import { cn, formatPrice } from "~/utils";

import { CartLineItems } from "~/islands/checkout/cart-line-items";
import { buttonVariants } from "~/islands/primitives/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/islands/primitives/card";
import { Separator } from "~/islands/primitives/separator";
import { Link } from "~/navigation";
import { getCartAction } from "~/server/actions/cart";
import {users, type User } from "~/data/db/schema";
import { getServerAuthSession, getUserById } from "~/utils/auth/users";

type CheckoutCardProperties = {
  storeId: number;
};

export async function CheckoutCard({ storeId }: CheckoutCardProperties) {
  const cartLineItems = await getCartAction(storeId);
  const session = await getServerAuthSession();
  let user = null;
  let premiumStatus = false;
  if(session != undefined){
    user = await getUserById(session.id);
    premiumStatus = user?.isPremium;
  }
  // const user = await getUserById(session.id);
  // const premiumStatus = user?.isPremium;

  let totalQuantity = 0;
  let totalPrice = 0;
  let finalPrice = 0;

  try {
    totalQuantity = cartLineItems.reduce(
      (acc, item) => acc + (item.quantity ?? 0),
      0,
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error("❌ Error calculating total quantity:", error.message);
      totalQuantity = 0; // Set default variable value in case of an error
    } else {
      // If for any reason something else was
      // thrown that wasn't an Error, handle it
      console.error("❌ An unexpected error occurred:", error);
    }
  }

  try {
    totalPrice = cartLineItems.reduce(
      (acc, item) => acc + Number(item.price ?? 0) * (item.quantity ?? 0),
      0,
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error("❌ Error calculating total price:", error.message);
      totalPrice = 0; // Set default variable value in case of an error
    } else {
      // If for any reason something else was
      // thrown that wasn't an Error, handle it
      console.error("❌ An unexpected error occurred:", error);
    }
  }
  
  //checking account premium: changes
  try {
    if (premiumStatus)
    {
      finalPrice = totalPrice * 0.9;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("❌ Error calculating total price for premium:", error.message);
      finalPrice = 0; // Set default variable value in case of an error
    } else {
      // If for any reason something else was
      // thrown that wasn't an Error, handle it
      console.error("❌ An unexpected error occurred:", error);
    }
  }

  // If totalQuantity is 0, don't render the card
  if (totalQuantity === 0) {
    return null;
  }

  return (
    <Card
      key={storeId}
      as="section"
      id={`checkout-store-${storeId}`}
      aria-labelledby={`checkout-store-${storeId}-heading`}
      className={cn(
        cartLineItems[0]?.storeStripeAccountId ?
          "border-green-500"
        : "border-neutral-700",
      )}
    >
      <CardHeader className="flex flex-row items-center space-x-4 py-4">
        <CardTitle className="line-clamp-1 flex-1">
          {cartLineItems[0]?.storeName}
        </CardTitle>
        <Link
          aria-label="Checkout"
          href={`/checkout/${storeId}`}
          className={cn(
            buttonVariants({
              size: "sm",
            }),
          )}
        >
          Checkout
        </Link>
      </CardHeader>
      <Separator className="mb-4" />
      <CardContent className="pb-6 pl-6 pr-0">
        <CartLineItems 
          items={cartLineItems} 
          isUserPremium={premiumStatus}
          className="max-h-[280px]" />
      </CardContent>
      <Separator className="mb-4" />
      <CardFooter className="space-x-4">
        <span className="flex-1 text-2xl">Total ({totalQuantity})</span>
        {premiumStatus ? (
          <div className="grid text-align: center">
            <span className="text-2xl text-orange-400">{formatPrice(finalPrice)}</span>
            <span className="text-sm line-through text-gray-500">{formatPrice(totalPrice)}</span>
            <span className="text-sm">-10%</span>
          </div>
        ):(
          <span className="">{formatPrice(totalPrice)}</span>
        )}
      </CardFooter>
    </Card>
  );
}
