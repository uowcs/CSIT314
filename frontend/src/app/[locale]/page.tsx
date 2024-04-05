/**
 * Learn more about the Relivator Next.js starter:
 * @see https://github.com/blefnk/relivator#readme
 */
// "use client";
import type { Metadata } from "next";
import { ArrowRight, Download, ShoppingCart, Store } from "lucide-react";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Balancer } from "react-wrap-balancer";
import Image from "next/image";
import { REPOSITORY_URL, siteConfig } from "~/app";
import { Link } from "~/core/link";
import { fullURL } from "~/data/meta/builder";
// import { seo } from "~/data/meta";
import { env } from "~/env.mjs";
import { FeaturedStoreItems } from "~/islands/commerce/featured-store-items";
import { HeroSection } from "~/islands/marketing/hero-section";
import { SiteFooter } from "~/islands/navigation/site-footer";
import { SiteHeader } from "~/islands/navigation/site-header";
import { FrequentlyAskedQuestions } from "~/islands/sections/questions";
import { GeneralShell } from "~/islands/wrappers/general-shell";
import { Link as NavLink } from "~/navigation";
import { productCategories } from "~/server/config/products";
import { Card, CardContent } from "~/islands/primitives/card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/islands/primitives/ui/carousel"
import { url } from "node:inspector";
import type { px } from "framer-motion";


//protmotion card
import { PromotionCard } from "~/islands/commerce/promotion-card"

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
    <div className="container mx-auto max-w-7xl px-4">
      <SiteHeader />
      <GeneralShell>


      <section aria-labelledby="hero-heading" className="mx-auto  mb-2 mt-1 items-center justify-center text-center" id="hero">


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

      <Carousel
 className="w-full">
      <CarouselContent>
      {productCategories.map((category) => (
            <CarouselItem className="md:basis-1/7 lg:basis-1/5">
              <NavLink
                aria-label={`${t("demo.aria-label-goto")} ${category.title}`}
                href={`/categories/${category.title}`}
                key={category.title}
              >

                <div className="p-1">
                <Card>
                <CardContent className="items-center h-12 justify-center mt-5">
                  <Image src={category.image} width={20} height={20} alt="d"/>
                  {category.title}

                </CardContent>
              </Card>
                </div>
              </NavLink>
              </CarouselItem>
        ))}


      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>


        </section>


{/* Promotion Page */}
<PromotionCard/>

        <FeaturedStoreItems />

        <section
          aria-labelledby="categories-heading"
          className="py-1"
          id="categories"
        >




        </section>

        {env.DEV_DEMO_NOTES === "true" && <Features />}

        <FrequentlyAskedQuestions />

        <section
          aria-labelledby="create-a-store-banner-heading"
          className="mb-14 mt-10 grid place-items-center gap-6 bg-card px-6 text-center text-card-foreground"
          id="create-a-store-banner"
        >
          <div className="text-xl font-medium sm:text-2xl">
            {t("landing.footer-cta")}
          </div>
          <Link href="/dashboard/stores" size="lg" variant="secondary">
            {t("landing.get-started-btn")}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </section>
      </GeneralShell>
      <SiteFooter />
        </div>
    </>
  );
}

