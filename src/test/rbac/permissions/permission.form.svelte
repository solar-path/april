<script lang="ts">
	import DisplayFormErrors from '$lib/components/DisplayFormErrors.svelte';
	import { hideDrawer } from '$lib/components/Drawer/drawer.utlities';
	import { Button, Input, Label, Textarea } from 'flowbite-svelte';
	import SuperDebug, { superForm, type FormResult } from 'sveltekit-superforms';

	interface PermissionData {
		item?: {
			id?: string;
			title?: string;
			description?: string;
		};
		permissionForm: {
			data: any;
		};
	}
	export let data: PermissionData;

	const { form, errors, constraints, enhance } = superForm(
		data.item && data.item !== null
			? {
					...data.permissionForm.data,
					id: data.item.id,
					title: data.item.title,
					description: data.item.description
				}
			: data.permissionForm.data,
		{
			onResult(event) {
				const result = event.result as FormResult<any>;
				if (result.type === 'success') {
					$hideDrawer = !$hideDrawer;
				}
			}
		}
	);
</script>

<form
	use:enhance
	novalidate
	enctype="multipart/form-data"
	method="POST"
	action={data.item && data.item !== null
		? '/dashboard/rbac/permissions?/updatePermission'
		: '/dashboard/rbac/permissions?/createPermission'}
	class="flex flex-col space-y-2"
>
	<input type="hidden" name="id" bind:value={$form.id} />

	<div class="w-full">
		<Label for="title">Permission</Label>
		<Input id="title" type="text" name="title" bind:value={$form.title} {...$constraints.title} />
		<DisplayFormErrors errors={$errors.title} />
	</div>

	<div class="w-full">
		<Label for="description">Description</Label>
		<Textarea
			id="description"
			type="text"
			name="description"
			bind:value={$form.description}
			{...$constraints.description}
		/>
		<DisplayFormErrors errors={$errors.description} />
	</div>

	<Button type="submit" class="w-full">Add</Button>
</form>
<SuperDebug data={$form} />
