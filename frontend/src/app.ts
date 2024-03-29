/**
 * [app.ts] App Configuration
 * ==========================
 *
 * To reduce the number of config files, we aim to
 * combine as much as possible into a single file.
 */

import type { OAuthStrategy } from "@clerk/types";
import type { ContentSection, FooterItem, MainMenuItem } from "~/types";
import { slugify } from "~/utils";

import { productCategories } from "~/server/config/products";
import { networks } from "~/server/config/socials";

import { env } from "./env.mjs";
import { Icons } from "./islands/icons";

// todo: parse this from clerk's dashboard instead of hardcoding it
export const oauthProvidersClerk = [
  { name: "Google", strategy: "oauth_google", icon: "google" },
  // { name: "Discord", strategy: "oauth_discord", icon: "discord" },
  { name: "Microsoft", strategy: "oauth_microsoft", icon: "microsoft" },
  // { name: "Facebook", strategy: "oauth_facebook", icon: "facebook" },
  // { name: "Github", strategy: "oauth_github", icon: "gitHub" },
] satisfies {
  name: string;
  icon: keyof typeof Icons;
  strategy: OAuthStrategy;
}[];

export const appts = {
  name: "NomNomNow",
  debug: false,
};

export default appts;


export const contactConfig = {
  email: "hva025@uowmail.edu.au",
};

export const baseUrl = new URL(
  env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
);

export const BASE_URL =
  process.env.NODE_ENV === "production" ? baseUrl : "http://localhost:3000";
export const BRAND_NAME = "NomNomNow";
// export const BRAND_DESCRIPTION =
//   "Next.js 14 free store and dashboard template. It helps you build great eCommerce and SaaS apps faster than ever. Get it now!";

export const OWNER_ROLE = "owner";
export const ADMIN_ROLE = "admin";
export const MEMBER_ROLE = "member";

export const TRIAL_LENGTH_IN_DAYS = 7;
export const ROLES = [OWNER_ROLE, ADMIN_ROLE, MEMBER_ROLE] as const;

export const settings = {
  themeToggleEnabled: true,
};

export const siteConfig = {
  name: "NomNomNow",
  shortName: "NomNomNow",
  author: "CSIT314",
  description:
    "Food Order and Delivery System",
  company: {
    name: "CSIT314",
    link: "https://github.com/uowcs/csit314",
    email: "hva025@uowmail.edu.au",
    // twitter: "@blefnk",
  },
  // handles: {
  //   twitter: "@blefnk",
  // },
  keywords: [
    "App Router",
    "Drizzle Orm",
    "Landing Page",
    "Next.js 14",
    "Nextjs",
    "Open Source",
    "Parallel Routes",
    "PostgreSQL",
    "Radix Ui",
    "React",
    "Server Actions",
    "Server Components",
    "Shadcn/UI",
    "Stripe",
    "T3 Stack",
    "Tailwind Css",
    "Tools",
    "Utils",
  ],
  url: {
    base: env.NEXT_PUBLIC_APP_URL,
    // author: REPOSITORY_OWNER,
  },
  ogImage: `${env.NEXT_PUBLIC_APP_URL}/og-image.png`,
  mainNav: [
    // {
    //   title: "Food",
    //   items: [
    //     {
    //       title: "Products",
    //       href: "/products",
    //       description: "All the products we have to offer.",
    //       items: [],
    //     },
    //     {
    //       title: "Build a Look",
    //       href: "/custom/clothing",
    //       description: "Build your own custom clothes.",
    //       items: [],
    //     },
    //     {
    //       title: "Blog",
    //       href: "/blog",
    //       description: "Read our latest blog posts.",
    //       items: [],
    //     },
    //   ],
    // },
    // ...productCategories.map((category) => ({
    //   title: category.title,
    //   items: [
    //     {
    //       title: "All",
    //       href: `/categories/${slugify(category.title)}`,
    //       description: `All ${category.title}.`,
    //       items: [],
    //     },
    //     ...category.subcategories.map((subcategory) => ({
    //       title: subcategory.title,
    //       href: `/categories/${slugify(category.title)}/${subcategory.slug}`,
    //       description: subcategory.description,
    //       items: [],
    //     })),
    //   ],
    // })),
  ] satisfies MainMenuItem[],
  // links,
  footerNav: [
    // {V
    //   title: "Bleverse",
    //   items: [
    //     {
    //       title: "Community",
    //       href: "https://bleverse.com",
    //       external: true,
    //     },
    //     {
    //       title: "MF Piano",
    //       href: "https://mfpiano.org",
    //       external: true,
    //     },
    //     {
    //       title: "Peresfer",
    //       href: "https://peresfer.com",
    //       external: true,
    //     },
    //     {
    //       title: "Relivator",
    //       href: "https://relivator.bleverse.com",
    //       external: true,
    //     },
    //   ],
    // },
    {
      title: "Help",
      items: [
        {
          title: "Contact",
          href: "/contact",
          external: false,
        },
        {
          title: "Privacy",
          href: "/privacy",
          external: false,
        },
        {
          title: "Terms",
          href: "/terms",
          external: false,
        },
        {
          title: "About",
          href: "/about",
          external: false,
        },
      ],
    },
    // {
    //   title: "Social",
    //   items: [
    //     {
    //       title: "Github",
    //       href: links.githubAccount,
    //       external: true,
    //     },
    //     {
    //       title: "Discord",
    //       href: links.discord,
    //       external: true,
    //     },
    //     {
    //       title: "Twitter",
    //       href: links.twitter,
    //       external: true,
    //     },
    //     {
    //       title: "Facebook",
    //       href: links.facebook,
    //       external: true,
    //     },
    //   ],
    // },
    // {
    //   title: "Github",
    //   items: [
    //     {
    //       title: "Relivator",
    //       href: "https://github.com/blefnk/relivator",
    //       external: true,
    //     },
    //     {
    //       title: "Reliverse",
    //       href: "https://github.com/blefnk/reliverse",
    //       external: true,
    //     },
    //     {
    //       title: "Blefnk",
    //       href: "https://github.com/blefnk",
    //       external: true,
    //     },
    //     {
    //       title: "Utils",
    //       href: "https://github.com/blefnk/utils",
    //       external: true,
    //     },
    //   ],
    // },
  ] satisfies FooterItem[],
};

// export const featureCards: ContentSection = {
//   header: "Powered by",
//   subheader: "What Makes Relivator Possible",
//   content: [
//     {
//       text: "Next.js",
//       subtext: "The React Framework",
//     },
//     {
//       text: "shadcn/ui",
//       subtext: "Beautifully Designed Components",
//     },
//     {
//       text: "Vercel",
//       subtext: "Develop. Preview. Ship.",
//     },
//   ],
// };

// export const features: ContentSection = {
//   header: "Features",
//   subheader: "Why You Need to Download Relivator",
//   content: [
//     {
//       text: "SEO Optimized",
//       subtext: "Improved website visibility on search engines",
//     },
//     {
//       text: "Highly Performant",
//       subtext: "Fast loading times and smooth performance",
//     },
//     {
//       text: "Easy Customization",
//       subtext: "Change your content and layout with little effort",
//     },
//   ],
// };
