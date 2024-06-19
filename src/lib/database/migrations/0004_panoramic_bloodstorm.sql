CREATE TABLE IF NOT EXISTS "rbac_permission" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"title" varchar(50) NOT NULL,
	CONSTRAINT "rbac_permission_title_unique" UNIQUE("title")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rbac_role_permission" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"roleId" varchar(50),
	"permissionId" varchar(50),
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rbac_role" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"title" varchar(50) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "rbac_role_title_unique" UNIQUE("title")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rbac_user_permission" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"userId" varchar(50),
	"permissionId" varchar(50),
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rbac_user_role" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"userId" varchar(50),
	"roleId" varchar(50),
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rbac_role_permission" ADD CONSTRAINT "rbac_role_permission_roleId_rbac_role_id_fk" FOREIGN KEY ("roleId") REFERENCES "rbac_role"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rbac_role_permission" ADD CONSTRAINT "rbac_role_permission_permissionId_rbac_permission_id_fk" FOREIGN KEY ("permissionId") REFERENCES "rbac_permission"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rbac_user_permission" ADD CONSTRAINT "rbac_user_permission_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rbac_user_permission" ADD CONSTRAINT "rbac_user_permission_permissionId_rbac_permission_id_fk" FOREIGN KEY ("permissionId") REFERENCES "rbac_permission"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rbac_user_role" ADD CONSTRAINT "rbac_user_role_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rbac_user_role" ADD CONSTRAINT "rbac_user_role_roleId_rbac_role_id_fk" FOREIGN KEY ("roleId") REFERENCES "rbac_role"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
