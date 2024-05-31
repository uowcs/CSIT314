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

import { env } from "./env.mjs";
import type { Icons } from "./islands/icons";

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
  },
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
  },
  ogImage: `${env.NEXT_PUBLIC_APP_URL}/og-image.png`,
  mainNav: [
  ] satisfies MainMenuItem[],
  footerNav: [
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
  ] satisfies FooterItem[],
};