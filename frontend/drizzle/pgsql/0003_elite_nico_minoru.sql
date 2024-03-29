ALTER TYPE "category" ADD VALUE 'food';--> statement-breakpoint
ALTER TABLE "acme_products" ALTER COLUMN "category" SET DEFAULT 'food';--> statement-breakpoint
ALTER TABLE "acme_stores" ADD COLUMN "address" text;