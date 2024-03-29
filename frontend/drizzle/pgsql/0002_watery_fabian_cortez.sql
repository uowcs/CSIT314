ALTER TYPE "category" ADD VALUE 'Food';--> statement-breakpoint
ALTER TABLE "acme_products" ALTER COLUMN "category" SET DEFAULT 'Food';