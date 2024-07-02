CREATE TABLE IF NOT EXISTS "workspace_user" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"userId" varchar(50),
	"workspaceId" varchar(50),
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workspace_user" ADD CONSTRAINT "workspace_user_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workspace_user" ADD CONSTRAINT "workspace_user_workspaceId_structure_workspaces_id_fk" FOREIGN KEY ("workspaceId") REFERENCES "structure_workspaces"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
