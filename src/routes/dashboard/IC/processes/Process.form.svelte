<script lang="ts">
	import DisplayFormErrors from '$lib/components/DisplayFormErrors.svelte';
	import { hideDrawer } from '$lib/components/Drawer/drawer.utlities';
	import SelectWithSearchTree from '$lib/components/SelectWithSearch/SelectWithSearchTree.svelte';
	import { Button, Input, Label, Textarea } from 'flowbite-svelte';
	import { superForm, type FormResult } from 'sveltekit-superforms';

	interface ProcessData {
		item?: {
			id?: string;
			title: string;
			description: string;
			parentId: string;
			parent: string;
		};
		processForm: {
			data: any; // Define more specifically if possible
		};
		processList: any[];
		processTree: any[];
	}
	export let data: ProcessData;

	const { form, errors, constraints, enhance } = superForm(
		data.item && data.item !== null
			? {
					...data.processForm.data,
					id: data.item.id,
					title: data.item.title,
					description: data.item.description,
					parent: data.processList.find((p) => p.id === data?.item?.parentId)?.title,
					parentId: data.item.parentId
				}
			: data.processForm.data,
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
	action={data.item && data.item !== null
		? '/dashboard/IC/processes?/updateProcess'
		: '/dashboard/IC/processes?/createProcess'}
	class="flex flex-col space-y-2"
>
	<input type="hidden" name="id" bind:value={$form.id} />

	<div class="w-full">
		<Label for="title">Process</Label>
		<Input id="title" type="text" name="title" bind:value={$form.title} {...$constraints.title} />
		<DisplayFormErrors errors={$errors.title} />
	</div>

	<div class="w-full">
		<SelectWithSearchTree
			list={data.processList}
			tree={data.processTree}
			form={$form}
			errors={$errors}
			constraints={$constraints}
			label="Process Tree"
			modalID="process"
			modalState={false}
		/>
	</div>

	<div class="w-full">
		<Label for="title">Description</Label>
		<Textarea name="description" bind:value={$form.description} {...$constraints.description} />
		<DisplayFormErrors errors={$errors.description} />
	</div>

	<Button type="submit" class="w-full">Add</Button>
</form>
