ALTER TABLE "structure_workspaces" RENAME COLUMN "slug" TO "workspace";--> statement-breakpoint
ALTER TABLE "structure_workspaces" DROP CONSTRAINT "structure_workspaces_slug_unique";--> statement-breakpoint
ALTER TABLE "structure_workspaces" ADD CONSTRAINT "structure_workspaces_workspace_unique" UNIQUE("workspace");