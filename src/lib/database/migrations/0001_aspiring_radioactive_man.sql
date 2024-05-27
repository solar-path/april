ALTER TYPE "post_status" ADD VALUE 'archived';--> statement-breakpoint
ALTER TABLE "rcm_control" DROP COLUMN IF EXISTS "code";--> statement-breakpoint
ALTER TABLE "rcm_process" DROP COLUMN IF EXISTS "code";--> statement-breakpoint
ALTER TABLE "rcm_risk" DROP COLUMN IF EXISTS "code";