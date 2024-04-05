import * as React from "react"
import { array } from "zod";

import { Card, CardContent } from "~/islands/primitives/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/islands/primitives/ui/carousel"




export function PromotionCard() {

  var promotions = [
    {
      name:"Promotion1",
      image:"https://picsum.photos/700/300",
      link:"link"
    },
    {
      name:"Promotion2",
      image:"https://picsum.photos/700/300",
      link:"link"
    },
  ]

  return (
<Carousel className="w-full my-20">
  <CarouselContent className="-ml-1 flex">
    {promotions.map((index, i) => (
      <CarouselItem key={i} className="pl-1 md:basis-1/2 w-full">
        <div className={"min-w-full h-44"}>
          <Card className="">
            <CardContent className="flex aspect-square items-center justify-center p-6">
              <img src={index.image} alt="Background" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </CardContent>
          </Card>
        </div>
      </CarouselItem>
    ))}
  </CarouselContent>
</Carousel>
  )
}

