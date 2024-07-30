<script>
	import { Tabs, TabItem, Heading } from 'flowbite-svelte';
	import {
		UserCircleSolid,
		GridSolid,
		AdjustmentsVerticalSolid,
		CodePullRequestSolid,
		CodeMergeSolid
	} from 'flowbite-svelte-icons';

	import RoleCard from './roles/role.card.svelte';
	import PermissionCard from './permissions/permission.card.svelte';
	import RolePermissionCard from './rolePermissions/rolePermission.card.svelte';
	import UserRoleCard from './userRoles/userRoles.card.svelte';
	import SodCard from './sod/sod.card.svelte';
	export let data;
</script>

<div>
	<Heading tag="h2">Access control</Heading>
</div>

<Tabs tabStyle="underline" class="bg-white">
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
			<CodePullRequestSolid size="md" />
			Role Permissions mapping
		</div>
		<RolePermissionCard {data} />
	</TabItem>
	<TabItem>
		<div slot="title" class="flex items-center gap-2">
			<CodeMergeSolid size="md" />
			User roles mapping
		</div>
		<UserRoleCard {data} />
	</TabItem>
	<TabItem>
		<div slot="title" class="flex items-center gap-2">
			<AdjustmentsVerticalSolid size="md" />
			SoD
		</div>
		<SodCard {data} />
	</TabItem>
</Tabs>
