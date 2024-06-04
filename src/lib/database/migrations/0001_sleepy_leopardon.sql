CREATE TABLE IF NOT EXISTS "contact" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"email" varchar(256),
	"phone" varchar(20),
	"website" varchar(256),
	"companyId" varchar(50) NOT NULL,
	"author" varchar(50) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "contact" ADD CONSTRAINT "contact_companyId_structure_companies_id_fk" FOREIGN KEY ("companyId") REFERENCES "structure_companies"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "contact" ADD CONSTRAINT "contact_author_users_id_fk" FOREIGN KEY ("author") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
