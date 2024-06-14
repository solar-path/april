ALTER TABLE "rcm_Matrix" RENAME COLUMN "controlOwner" TO "controlOwnerId";--> statement-breakpoint
ALTER TABLE "rcm_Matrix" DROP CONSTRAINT "rcm_Matrix_controlOwner_structure_positions_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rcm_Matrix" ADD CONSTRAINT "rcm_Matrix_controlOwnerId_structure_positions_id_fk" FOREIGN KEY ("controlOwnerId") REFERENCES "structure_positions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
