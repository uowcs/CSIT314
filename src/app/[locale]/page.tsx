
// "use client";
import type { Metadata } from "next";
import { ArrowRight, Download, ShoppingCart, Store } from "lucide-react";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Balancer } from "react-wrap-balancer";
import Image from "next/image";
import { siteConfig } from "~/app";
import { Link } from "~/core/link";
import { fullURL } from "~/data/meta/builder";
// import { seo } from "~/data/meta";
import { env } from "~/env.mjs";
import { FeaturedStoreItems } from "~/islands/commerce/featured-store-items";
import { SiteFooter } from "~/islands/navigation/site-footer";
import { SiteHeader } from "~/islands/navigation/site-header";
import { GeneralShell } from "~/islands/wrappers/general-shell";
import { Link as NavLink } from "~/navigation";
import { productCategories } from "~/server/config/products";
import { Card, CardContent } from "~/islands/primitives/card";
import { Badge } from "~/islands/primitives/ui/badge"
import { ProtmotionBanner } from "~/islands/commerce/promotion-banner"

import {

  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/islands/primitives/ui/carousel"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/islands/primitives/ui/avatar"

export async function generateMetadata({ params }) {
  const t = await getTranslations();
  const metadata: Metadata = {
    title: `${t("metadata.title.home")} – ${siteConfig.name}`,
  };
  return metadata;
}



export default function HomePage() {
  // useTranslations works both on the server and client
  // we only need the getTranslations on async components
  const t = useTranslations();

  return (
    <>
      <SiteHeader />
      <GeneralShell>
      <section aria-labelledby="hero-heading" className="w-full flex mb-2 mt-1 items-center justify-center text-center" id="hero">


      <Carousel opts={{ align: "start" }} className="mt-4 lg:w-3/4 relative">
  <CarouselContent className="flex lg:ml-10 lg:mr-10 gap-x-0">
    {productCategories.map((category, i) => (
      <CarouselItem key={i} className="flex-none sm:w-1/6 md:w-1/6 lg:w-1/6">
        <div className="p-1 pt-4">
          <Link className="bg-transparent border-none hover:text-current hover:bg-transparent focus:text-current focus:bg-transparent focus:outline-none focus:border-none " href={`/categories/${category.title}`}>
          <Badge  className="w-max-sm px-3 border py-1">
            <Avatar className="mx-2">
              <AvatarImage src={category.image} alt="@shadcn" />
              <AvatarFallback>NOM</AvatarFallback>
            </Avatar>
            {category.title}
          </Badge>
          </Link>
        </div>
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious className="absolute left-0 z-10" />
  <CarouselNext className="absolute right-0 z-10" />
</Carousel>



        {/* <section
          aria-labelledby="hero-heading"
          className="mx-auto mb-2 mt-1 flex w-full flex-col items-center justify-center gap-4 pt-10 text-center"
          id="hero"
        > */}

        {/* <div className="mt-3 flex flex-wrap items-center justify-center gap-4"> */}

        {/* <Link
              className="border-2 border-zinc-900 dark:border-zinc-800"
              href="/dashboard/billing"
              size="lg"
              variant="outline"
        >
              Fast Food

        </Link> */}

        {/* Home Page Food Categories*/}

{/*
          <div className="mt-3 flex flex-wrap items-center justify-center gap-4">
            {env.DEV_DEMO_NOTES === "true" ? (
              <Link
                href={REPOSITORY_URL}
                size="lg"
                target="_blank"
                variant="secondary"
              >
                <Download className="mr-2 h-4 w-4" />
                {t("landing.main-cta")}
              </Link>
            ) : (
              <Link href="/products" size="lg" variant="secondary">
                <ShoppingCart className="mr-2 h-4 w-4" />
                {t("landing.buy-now")}
              </Link>
            )}

            <Link
              className="border-2 border-zinc-900 dark:border-zinc-800"
              href="/dashboard/billing"
              size="lg"
              variant="outline"
            >


              <Store className="mr-2 h-4 w-4" />
              {env.DEV_DEMO_NOTES === "true"
                ? `${t("demo.launch")}`
                : `${t("landing.sell-now")}`}
            </Link>
          </div> */}

        </section>

        <ProtmotionBanner/>

        <FeaturedStoreItems />

        {env.DEV_DEMO_NOTES === "true" && <Features />}



      </GeneralShell>
      <SiteFooter />
    </>
  );
}

