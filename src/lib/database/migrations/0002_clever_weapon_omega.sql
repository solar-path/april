ALTER TABLE "contact" DROP CONSTRAINT "contact_companyId_structure_companies_id_fk";
--> statement-breakpoint
ALTER TABLE "structure_companies" ADD COLUMN "contact" varchar(50);--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "structure_companies" ADD CONSTRAINT "structure_companies_contact_contact_id_fk" FOREIGN KEY ("contact") REFERENCES "contact"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "contact" DROP COLUMN IF EXISTS "companyId";