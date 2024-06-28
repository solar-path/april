ALTER TABLE "users" RENAME COLUMN "addressLine1" TO "addressLine";--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "idNumber" varchar(20);--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_idNumber_unique" UNIQUE("idNumber");