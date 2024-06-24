<script lang="ts">
	import { Tabs, TabItem, Heading } from 'flowbite-svelte';
	import {
		UserCircleSolid,
		GridSolid,
		AdjustmentsVerticalSolid,
		ClipboardSolid
	} from 'flowbite-svelte-icons';

	import RoleCard from './roles/role.card.svelte';
	import PermissionCard from './permissions/permission.card.svelte';
	import RolePermissionCard from './rolePermissions/rolePermission.card.svelte';
	import UserRoleCard from './userRoles/userRoles.card.svelte';

	export let data: any;
</script>

<div>
	<Heading tag="h2">Access control</Heading>
</div>

<Tabs tabStyle="underline">
	<TabItem open>
		<div slot="title" class="flex items-center gap-2">
			<UserCircleSolid size="md" />
			Roles
		</div>
		<RoleCard {data} />
	</TabItem>
	<TabItem>
		<div slot="title" class="flex items-center gap-2">
			<GridSolid size="md" />
			Permissions
		</div>
		<PermissionCard {data} />
	</TabItem>
	<TabItem>
		<div slot="title" class="flex items-center gap-2">
			<AdjustmentsVerticalSolid size="md" />
			Role Permissions
		</div>
		<RolePermissionCard {data} />
	</TabItem>
	<TabItem>
		<div slot="title" class="flex items-center gap-2">
			<ClipboardSolid size="md" />
			User roles
		</div>
		<UserRoleCard {data} />
	</TabItem>
</Tabs>
