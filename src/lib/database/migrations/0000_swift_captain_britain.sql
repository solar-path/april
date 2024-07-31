DO $$ BEGIN
 CREATE TYPE "post_status" AS ENUM('draft', 'published', 'archieved');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "reader_for" AS ENUM('guest', 'user', 'admin');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "company_type" AS ENUM('company', 'counterparty');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
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
CREATE TABLE IF NOT EXISTS "addresses" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"countryId" varchar(50) NOT NULL,
	"city" varchar(100) NOT NULL,
	"state" varchar(100),
	"zipcode" varchar(20) NOT NULL,
	"addressLine1" varchar(250) NOT NULL,
	"author" varchar(50) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "blogs" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"title" varchar(250) NOT NULL,
	"content" text,
	"coverImage" text,
	"parentId" varchar(50),
	"draft" "post_status",
	"guest" "reader_for",
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"author" varchar(50) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "contact" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"email" varchar(256),
	"phone" varchar(20),
	"website" varchar(256),
	"author" varchar(50) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "country" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"iso3" varchar(3) NOT NULL,
	"phone_code" varchar(20),
	"currency" varchar(3) NOT NULL,
	"currency_name" varchar(100) NOT NULL,
	"currency_symbol" varchar(100) NOT NULL,
	"tld" varchar(3) NOT NULL,
	"region" varchar(100) NOT NULL,
	"subregion" varchar(100) NOT NULL,
	"emoji" varchar(10) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "country_name_unique" UNIQUE("name"),
	CONSTRAINT "country_iso3_unique" UNIQUE("iso3")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "structure_companies" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"title" varchar(250) NOT NULL,
	"description" text,
	"company" varchar(250) NOT NULL,
	"logo" varchar(250),
	"company_type" "company_type" NOT NULL,
	"regionId" varchar(50) NOT NULL,
	"workspaceId" varchar(50) NOT NULL,
	"industryId" varchar(50) NOT NULL,
	"businessIdentificationNumber" varchar(50),
	"address" varchar(50),
	"contact" varchar(50),
	"author" varchar(50) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "structure_companies_company_unique" UNIQUE("company"),
	CONSTRAINT "structure_companies_businessIdentificationNumber_unique" UNIQUE("businessIdentificationNumber")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "structure_departments" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"title" varchar(250) NOT NULL,
	"description" text,
	"workspaceId" varchar(50) NOT NULL,
	"companyId" varchar(50) NOT NULL,
	"author" varchar(50) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "structure_positions" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"title" varchar(250) NOT NULL,
	"description" text,
	"departmentId" varchar(50),
	"workspaceId" varchar(50) NOT NULL,
	"companyId" varchar(50) NOT NULL,
	"author" varchar(50) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "structure_regions" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"title" varchar(250) NOT NULL,
	"description" text,
	"workspaceId" varchar(50),
	"author" varchar(50) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "structure_workspaces" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"title" varchar(250) NOT NULL,
	"workspace" varchar(250) NOT NULL,
	"description" text,
	"logo" varchar(250),
	"author" varchar(50) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "structure_workspaces_workspace_unique" UNIQUE("workspace")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "industry" (
	"code" varchar(50) PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" text,
	"parentId" varchar(50),
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "industry_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "inquiries" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"email" varchar(50) NOT NULL,
	"message" text NOT NULL,
	"reply" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rbac_permission" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"title" varchar(50) NOT NULL,
	"description" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
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
	"description" text,
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
CREATE TABLE IF NOT EXISTS "rcm_control" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"workspaceId" varchar(50),
	"title" varchar(200),
	"description" text NOT NULL,
	"author" varchar(50) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rcm_Matrix" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"workspaceId" varchar(50),
	"companyId" varchar(50),
	"processId" varchar(50),
	"riskId" varchar(50),
	"controlId" varchar(50),
	"description" text NOT NULL,
	"frequency_type" "frequency_type" NOT NULL,
	"control_type" "control_type" NOT NULL,
	"execution_type" "execution_type" NOT NULL,
	"controlOwnerId" varchar(50),
	"author" varchar(50) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rcm_process" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"workspaceId" varchar(50),
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
	"workspaceId" varchar(50),
	"title" varchar(200),
	"author" varchar(50) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"email" varchar(50) NOT NULL,
	"password" text NOT NULL,
	"token" varchar(50),
	"verified" boolean DEFAULT false,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"name" varchar(40),
	"surname" varchar(40),
	"gender" varchar(40),
	"dob" date,
	"avatar" text,
	"phone" varchar(20),
	"country" varchar(100),
	"city" varchar(100),
	"state" varchar(100),
	"zipcode" varchar(20),
	"addressLine" varchar(250),
	"idNumber" varchar(20),
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_idNumber_unique" UNIQUE("idNumber")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "workspace_user" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"userId" varchar(50) NOT NULL,
	"workspaceId" varchar(50) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "addresses" ADD CONSTRAINT "addresses_countryId_country_id_fk" FOREIGN KEY ("countryId") REFERENCES "country"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "addresses" ADD CONSTRAINT "addresses_author_users_id_fk" FOREIGN KEY ("author") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "blogs" ADD CONSTRAINT "blogs_parentId_blogs_id_fk" FOREIGN KEY ("parentId") REFERENCES "blogs"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "blogs" ADD CONSTRAINT "blogs_author_users_id_fk" FOREIGN KEY ("author") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "contact" ADD CONSTRAINT "contact_author_users_id_fk" FOREIGN KEY ("author") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "structure_companies" ADD CONSTRAINT "structure_companies_regionId_structure_regions_id_fk" FOREIGN KEY ("regionId") REFERENCES "structure_regions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "structure_companies" ADD CONSTRAINT "structure_companies_workspaceId_structure_workspaces_id_fk" FOREIGN KEY ("workspaceId") REFERENCES "structure_workspaces"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "structure_companies" ADD CONSTRAINT "structure_companies_industryId_industry_code_fk" FOREIGN KEY ("industryId") REFERENCES "industry"("code") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "structure_companies" ADD CONSTRAINT "structure_companies_address_addresses_id_fk" FOREIGN KEY ("address") REFERENCES "addresses"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "structure_companies" ADD CONSTRAINT "structure_companies_contact_contact_id_fk" FOREIGN KEY ("contact") REFERENCES "contact"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "structure_companies" ADD CONSTRAINT "structure_companies_author_users_id_fk" FOREIGN KEY ("author") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "structure_departments" ADD CONSTRAINT "structure_departments_workspaceId_structure_workspaces_id_fk" FOREIGN KEY ("workspaceId") REFERENCES "structure_workspaces"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "structure_departments" ADD CONSTRAINT "structure_departments_companyId_structure_companies_id_fk" FOREIGN KEY ("companyId") REFERENCES "structure_companies"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "structure_departments" ADD CONSTRAINT "structure_departments_author_users_id_fk" FOREIGN KEY ("author") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "structure_positions" ADD CONSTRAINT "structure_positions_departmentId_structure_departments_id_fk" FOREIGN KEY ("departmentId") REFERENCES "structure_departments"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "structure_positions" ADD CONSTRAINT "structure_positions_workspaceId_structure_workspaces_id_fk" FOREIGN KEY ("workspaceId") REFERENCES "structure_workspaces"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "structure_positions" ADD CONSTRAINT "structure_positions_companyId_structure_companies_id_fk" FOREIGN KEY ("companyId") REFERENCES "structure_companies"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "structure_positions" ADD CONSTRAINT "structure_positions_author_users_id_fk" FOREIGN KEY ("author") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "structure_regions" ADD CONSTRAINT "structure_regions_workspaceId_structure_workspaces_id_fk" FOREIGN KEY ("workspaceId") REFERENCES "structure_workspaces"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "structure_regions" ADD CONSTRAINT "structure_regions_author_users_id_fk" FOREIGN KEY ("author") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "structure_workspaces" ADD CONSTRAINT "structure_workspaces_author_users_id_fk" FOREIGN KEY ("author") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "industry" ADD CONSTRAINT "industry_parentId_industry_code_fk" FOREIGN KEY ("parentId") REFERENCES "industry"("code") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
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
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rcm_control" ADD CONSTRAINT "rcm_control_workspaceId_structure_workspaces_id_fk" FOREIGN KEY ("workspaceId") REFERENCES "structure_workspaces"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rcm_control" ADD CONSTRAINT "rcm_control_author_users_id_fk" FOREIGN KEY ("author") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rcm_Matrix" ADD CONSTRAINT "rcm_Matrix_workspaceId_structure_workspaces_id_fk" FOREIGN KEY ("workspaceId") REFERENCES "structure_workspaces"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rcm_Matrix" ADD CONSTRAINT "rcm_Matrix_companyId_structure_companies_id_fk" FOREIGN KEY ("companyId") REFERENCES "structure_companies"("id") ON DELETE no action ON UPDATE no action;
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
 ALTER TABLE "rcm_Matrix" ADD CONSTRAINT "rcm_Matrix_controlOwnerId_structure_positions_id_fk" FOREIGN KEY ("controlOwnerId") REFERENCES "structure_positions"("id") ON DELETE no action ON UPDATE no action;
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
 ALTER TABLE "rcm_process" ADD CONSTRAINT "rcm_process_workspaceId_structure_workspaces_id_fk" FOREIGN KEY ("workspaceId") REFERENCES "structure_workspaces"("id") ON DELETE no action ON UPDATE no action;
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
 ALTER TABLE "rcm_risk" ADD CONSTRAINT "rcm_risk_workspaceId_structure_workspaces_id_fk" FOREIGN KEY ("workspaceId") REFERENCES "structure_workspaces"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rcm_risk" ADD CONSTRAINT "rcm_risk_author_users_id_fk" FOREIGN KEY ("author") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
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
