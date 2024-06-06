<script lang="ts">
	import DisplayFormErrors from '$lib/components/DisplayFormErrors.svelte';
	import { hideDrawer } from '$lib/components/Drawer/drawer.utlities';
	import SelectWithSearchTree from '$lib/components/SelectWithSearch/SelectWithSearchTree.svelte';
	import { Button, Input, Label, Textarea } from 'flowbite-svelte';
	import SuperDebug, { superForm, type FormResult } from 'sveltekit-superforms';

	interface RegionData {
		item?: {
			id?: string;
			title?: string;
			description?: string;
			workspaceId?: string;
			workspace?: string;
		};
		regionForm: {
			data: any;
		};
		workspaceList: any[];
		groupStructureTree: any[];
	}

	export let data: RegionData;

	console.log(' region.form.svelte :: data.item => ', data.item);

	const { form, errors, constraints, enhance } = superForm(
		data.item && data.item !== null
			? {
					...data.regionForm.data,
					id: data.item.id,
					title: data.item.title,
					description: data.item.description,
					workspaceId: data.item.workspaceId,
					workspace: data.workspaceList.find((item) => item.id === data?.item?.workspaceId)?.title
				}
			: data.regionForm.data,
		{
			dataType: 'json', // Add this line to handle nested data structures
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
	action={data.item && data.item !== null
		? '/dashboard/entity?/updateRegion'
		: '/dashboard/entity?/createRegion'}
	class="flex flex-col space-y-2"
>
	<input type="hidden" name="id" bind:value={$form.id} />
	<input type="hidden" name="workspaceId" bind:value={$form.workspaceId} />
	<input type="hidden" name="workspace" bind:value={$form.workspace} />

	<div class="w-full">
		<Label for="title">Region</Label>
		<Input id="title" type="text" name="title" bind:value={$form.title} {...$constraints.title} />
		<DisplayFormErrors errors={$errors.title} />
	</div>

	<div class="w-full">
		<SelectWithSearchTree
			label="Workspace"
			list={data.workspaceList}
			tree={data.workspaceList}
			form={$form}
			errors={$errors}
			constraints={$constraints}
			modalID="workspace"
			modalState={false}
			fieldId="workspaceId"
			fieldName="workspace"
		/>
		<DisplayFormErrors errors={$errors.workspaceId} />
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
