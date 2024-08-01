<script lang="ts">
	import { page } from '$app/stores';
	import DisplayFormErrors from '$lib/components/DisplayFormErrors.svelte';
	import { hideDrawer } from '$lib/components/Drawer/drawer.utlities';
	import { Button, Input, Label, Textarea, Avatar } from 'flowbite-svelte';
	import { superForm, type FormResult } from 'sveltekit-superforms';

	interface WorkspaceData {
		item?: {
			id?: string;
			title?: string;
			description?: string;
			logo: null | string;
		};
		workspaceForm: {
			data: any;
		};
	}

	export let data: WorkspaceData;
	console.log(' region.form.svelte :: data.item => ', data.item);

	const { form, errors, constraints, enhance } = superForm(
		data.item && data.item !== null
			? {
					...data.workspaceForm.data,
					id: data.item.id,
					title: data.item.title,
					description: data.item.description,
					logo: null
				}
			: data.workspaceForm.data,
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
	method="POST"
	enctype="multipart/form-data"
	action={data.item && data.item !== null
		? `/${$page.params.workspace}/entity/workspace?/updateWorkspace`
		: `/${$page.params.workspace}/entity/workspace?/createWorkspace`}
	class="flex flex-col space-y-2"
>
	<input type="hidden" name="id" bind:value={$form.id} />

	<div class="w-full">
		<Label for="logo">Logo</Label>
		{#if data.item && data.item != null && data.item.logo != null}
			<Avatar src={data.item.logo} size="xl" class="mx-auto" />
		{/if}
		<Input
			id="logo"
			type="file"
			name="logo"
			accept="image/png, image/jpeg, image/jpg"
			bind:value={$form.logo}
			{...$constraints.logo}
		/>
		<DisplayFormErrors errors={$errors.logo} />
	</div>

	<div class="w-full">
		<Label for="title">Workspace</Label>
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
