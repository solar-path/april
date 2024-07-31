<script lang="ts">
	import DisplayFormErrors from '$lib/components/DisplayFormErrors.svelte';
	import { hideDrawer } from '$lib/components/Drawer/drawer.utlities';
	import SelectWithSearchTree from '$lib/components/SelectWithSearch/SelectWithSearchTree.svelte';
	import { formStore } from '$lib/components/form/formStore';
	import { Button } from 'flowbite-svelte';
	import { onDestroy } from 'svelte';
	import SuperDebug, { superForm, type FormResult } from 'sveltekit-superforms';

	interface userRoleData {
		item?: {
			id: string;
			roleId: string;
			userId: string;
		};
		rolePermissionForm: any;
		roleList: any[];
		userList: any[];
	}
	export let data: userRoleData;

	const { form, errors, constraints, enhance } = superForm(
		data.item && data.item !== null
			? {
					...data.rolePermissionForm.data,
					id: data.item.id,

					roleId: data.item.roleId,
					role: data.roleList.find((item) => item.id === data?.item?.roleId)?.title,
					userId: data.item.userId,
					user: data.userList.find((item) => item.id === data?.item?.userId)
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
		if (value.userId) {
			$form.userId = value.userId.fieldId;
			$form.user = value.userId.fieldName;
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
		? '/dashboard/rbac/userRoles?/updateUserRole'
		: '/dashboard/rbac/userRoles?/createUserRole'}
	class="flex flex-col space-y-2"
>
	<input type="hidden" name="id" bind:value={$form.id} />
	<input type="hidden" name="roleId" bind:value={$form.roleId} />
	<input type="hidden" name="userId" bind:value={$form.userId} />

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
			label="User"
			list={data.userList}
			tree={data.userList}
			form={$form}
			errors={$errors}
			constraints={$constraints}
			modalID="user"
			modalState={false}
			fieldId="userId"
			fieldName="user"
		/>
		<DisplayFormErrors errors={$errors.userId} />
	</div>

	<Button type="submit" class="w-full">Add</Button>
</form>
<SuperDebug data={$form} />
