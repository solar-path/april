ALTER TABLE "rcm_Matrix" RENAME COLUMN "entityId" TO "companyId";--> statement-breakpoint
ALTER TABLE "rcm_Matrix" DROP CONSTRAINT "rcm_Matrix_entityId_structure_companies_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rcm_Matrix" ADD CONSTRAINT "rcm_Matrix_companyId_structure_companies_id_fk" FOREIGN KEY ("companyId") REFERENCES "structure_companies"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
