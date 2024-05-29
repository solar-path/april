ALTER TABLE "rcm_Matrix" RENAME COLUMN "companyId" TO "entityId";--> statement-breakpoint
ALTER TABLE "rcm_Matrix" DROP CONSTRAINT "rcm_Matrix_companyId_entities_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rcm_Matrix" ADD CONSTRAINT "rcm_Matrix_entityId_entities_id_fk" FOREIGN KEY ("entityId") REFERENCES "entities"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
