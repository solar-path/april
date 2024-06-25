<script lang="ts">
	import DisplayFormErrors from '$lib/components/DisplayFormErrors.svelte';
	import { hideDrawer } from '$lib/components/Drawer/drawer.utlities';
	import SelectWithSearchTree from '$lib/components/SelectWithSearch/SelectWithSearchTree.svelte';
	import { formStore } from '$lib/components/form/formStore';
	import { Button } from 'flowbite-svelte';
	import { onDestroy } from 'svelte';
	import SuperDebug, { superForm, type FormResult } from 'sveltekit-superforms';

	interface RolePermissionData {
		item?: {
			id: string;
			roleId: string;
			permissionId: string;
		};
		rolePermissionForm: any;
		roleList: any[];
		permissionList: any[];
	}
	export let data: RolePermissionData;

	const { form, errors, constraints, enhance } = superForm(
		data.item && data.item !== null
			? {
					...data.rolePermissionForm.data,
					id: data.item.id,

					roleId: data.item.roleId,
					role: data.roleList.find((item) => item.id === data?.item?.roleId)?.title,
					permissionId: data.item.permissionId,
					permission: data.permissionList.find((item) => item.id === data?.item?.permissionId)
				}
			: data.rolePermissionForm.data,
		{
			dataType: 'json',

			// onChange(event) {
			// 	event.target.value = formatPhoneNumber(event.target.value);
			// },
			onResult(event) {
				const result = event.result as FormResult<any>;
				if (result.type === 'success') {
					$hideDrawer = !$hideDrawer;
				}
			}
		}
	);

	// Subscribe to the store and update the form reactively
	const unsubscribe = formStore.subscribe((value) => {
		if (value.roleId) {
			$form.roleId = value.roleId.fieldId;
			$form.role = value.roleId.fieldName;
		}
		if (value.permissionId) {
			$form.permissionId = value.permissionId.fieldId;
			$form.permission = value.permissionId.fieldName;
		}
	});

	onDestroy(() => {
		unsubscribe();
	});
</script>

<form
	use:enhance
	novalidate
	enctype="multipart/form-data"
	method="POST"
	action={data.item && data.item !== null
		? '/dashboard/rbac/rolePermissions?/updateRolePermission'
		: '/dashboard/rbac/rolePermissions?/createRolePermission'}
	class="flex flex-col space-y-2"
>
	<input type="hidden" name="id" bind:value={$form.id} />
	<input type="hidden" name="roleId" bind:value={$form.roleId} />
	<input type="hidden" name="permissionId" bind:value={$form.permissionId} />

	<div class="w-full">
		<SelectWithSearchTree
			label="Role"
			list={data.roleList}
			tree={data.roleList}
			form={$form}
			errors={$errors}
			constraints={$constraints}
			modalID="role"
			modalState={false}
			fieldId="roleId"
			fieldName="role"
		/>
		<DisplayFormErrors errors={$errors.roleId} />
	</div>

	<div class="w-full">
		<SelectWithSearchTree
			label="Permission"
			list={data.permissionList}
			tree={data.permissionList}
			form={$form}
			errors={$errors}
			constraints={$constraints}
			modalID="permission"
			modalState={false}
			fieldId="permissionId"
			fieldName="permission"
		/>
		<DisplayFormErrors errors={$errors.permissionId} />
	</div>

	<Button type="submit" class="w-full">Add</Button>
</form>
<SuperDebug data={$form} />
