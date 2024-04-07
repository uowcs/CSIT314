/**
 * v0 by Vercel.
 * @see https://v0.dev/t/WdUna0e1sqO
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "~/islands/primitives/ui/button"
import { CardContent, Card } from "~/islands/primitives/ui/card"
import {

  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/islands/primitives/ui/carousel"
import { Badge } from "~/islands/primitives/ui/badge"

export async function ProtmotionBanner() {
  return (
    <div>
<Carousel className="w-full">
  <div className="flex flex-col space-y-4">
    {/* First Row */}
    <div className="flex overflow-x-auto no-scrollbar">
      <div className="flex-none w-full sm:w-full md:w-1/2 lg:w-1/2 px-2">
        <Card className=" w-full py-6 ">
          <CardContent className="flex flex-col gap-2 p-6">
            <h3 className="text-lg font-bold leading-none">Hungry? Try out new dishes from locals</h3>
            <p className="text-sm ">
              Get 10% off Valid until 30/06/24 or until redemption caps. Other fees apply.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex-none w-full sm:w-full md:w-1/2 lg:w-1/2 px-2 ">
        <Card className=" w-full py-6">
          <CardContent className="flex flex-col gap-2 p-6">
            <h3 className="text-lg font-bold leading-none">20% off on orders 100$</h3>
            <p className="text-sm">
              Get flat 20% off for family Valid until 30/06/24 or until redemption caps. Other fees apply.
            </p>
          </CardContent>
        </Card>
      </div>
      {/* Additional cards for the first row can be added here */}
    </div>
  </div>
</Carousel>



    </div>
  )
}
