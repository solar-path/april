ALTER TABLE "rbac_permission" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "rbac_permission" ADD COLUMN "createdAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "rbac_permission" ADD COLUMN "updatedAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "rbac_role" ADD COLUMN "description" text;