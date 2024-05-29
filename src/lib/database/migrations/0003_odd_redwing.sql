DO $$ BEGIN
 CREATE TYPE "execution_type" AS ENUM('Manual', 'IT-Dependend', 'Automated');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TYPE "control_type" ADD VALUE 'Preventive';--> statement-breakpoint
ALTER TYPE "control_type" ADD VALUE 'Detective';--> statement-breakpoint
ALTER TYPE "control_type" ADD VALUE 'SoD';--> statement-breakpoint
ALTER TABLE "rcm_Matrix" ADD COLUMN "frequency_type" "frequency_type" NOT NULL;--> statement-breakpoint
ALTER TABLE "rcm_Matrix" ADD COLUMN "control_type" "control_type" NOT NULL;--> statement-breakpoint
ALTER TABLE "rcm_Matrix" ADD COLUMN "execution_type" "execution_type" NOT NULL;--> statement-breakpoint
ALTER TABLE "rcm_Matrix" DROP COLUMN IF EXISTS "Monthly";--> statement-breakpoint
ALTER TABLE "rcm_Matrix" DROP COLUMN IF EXISTS "Preventive";--> statement-breakpoint
ALTER TABLE "rcm_Matrix" DROP COLUMN IF EXISTS "Manual";