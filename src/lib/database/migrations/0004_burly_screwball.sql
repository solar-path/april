DO $$ BEGIN
 CREATE TYPE "control_type" AS ENUM('Preventive', 'Detective', 'SoD');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "execution_type" AS ENUM('Manual', 'IT-Dependend', 'Automated');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "frequency_type" AS ENUM('On-demand', 'Daily', 'Weekly', 'Monthly', 'Quarterly', 'Annually');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rcm_control" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"title" varchar(200),
	"description" text NOT NULL,
	"author" varchar(50) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rcm_Matrix" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"entityId" varchar(50),
	"processId" varchar(50),
	"riskId" varchar(50),
	"controlId" varchar(50),
	"description" text NOT NULL,
	"frequency_type" "frequency_type" NOT NULL,
	"control_type" "control_type" NOT NULL,
	"execution_type" "execution_type" NOT NULL,
	"controlOwner" varchar(50),
	"author" varchar(50) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rcm_process" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"title" varchar(200),
	"description" text,
	"author" varchar(50) NOT NULL,
	"parentId" varchar(50),
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rcm_risk" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"title" varchar(200),
	"author" varchar(50) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rcm_control" ADD CONSTRAINT "rcm_control_author_users_id_fk" FOREIGN KEY ("author") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rcm_Matrix" ADD CONSTRAINT "rcm_Matrix_entityId_companies_id_fk" FOREIGN KEY ("entityId") REFERENCES "companies"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rcm_Matrix" ADD CONSTRAINT "rcm_Matrix_processId_rcm_process_id_fk" FOREIGN KEY ("processId") REFERENCES "rcm_process"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rcm_Matrix" ADD CONSTRAINT "rcm_Matrix_riskId_rcm_risk_id_fk" FOREIGN KEY ("riskId") REFERENCES "rcm_risk"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rcm_Matrix" ADD CONSTRAINT "rcm_Matrix_controlId_rcm_control_id_fk" FOREIGN KEY ("controlId") REFERENCES "rcm_control"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rcm_Matrix" ADD CONSTRAINT "rcm_Matrix_controlOwner_positions_id_fk" FOREIGN KEY ("controlOwner") REFERENCES "positions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rcm_Matrix" ADD CONSTRAINT "rcm_Matrix_author_users_id_fk" FOREIGN KEY ("author") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rcm_process" ADD CONSTRAINT "rcm_process_author_users_id_fk" FOREIGN KEY ("author") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rcm_process" ADD CONSTRAINT "rcm_process_parentId_rcm_process_id_fk" FOREIGN KEY ("parentId") REFERENCES "rcm_process"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rcm_risk" ADD CONSTRAINT "rcm_risk_author_users_id_fk" FOREIGN KEY ("author") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
