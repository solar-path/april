<script lang="ts">
	import DisplayFormErrors from '$lib/components/DisplayFormErrors.svelte';
	import { hideDrawer } from '$lib/components/Drawer/drawer.utlities';
	import SelectWithSearch from '$lib/components/SelectWithSearch/SelectWithSearchTree.svelte';
	import { Button, Input, Label, Select } from 'flowbite-svelte';
	import SuperDebug, { superForm, type FormResult } from 'sveltekit-superforms';

	interface EntityData {
		item?: {
			id?: string;
			title?: string;
			type?: string;
			parent?: string;
			parentId?: number;
		};
		entityForm: {
			data: any;
		};
		entityList: any[];
		entityTree: any[];
	}
	export let data: EntityData;

	$: console.log('forms/entity :: data => ', data);

	let unitTypes = [
		{ value: '', name: '' },
		{ value: 'workspace', name: 'Workspace' },
		{ value: 'region', name: 'Region' },
		{ value: 'company', name: 'Company' },
		{ value: 'department', name: 'Department' },
		{ value: 'position', name: 'Position' },
		{ value: 'employee', name: 'Employee' },
		{ value: 'contractor', name: 'Contractor' },
		{ value: 'intern', name: 'Intern' },
		{ value: 'project', name: 'Project' }
	];

	const { form, errors, constraints, enhance } = superForm(
		data.item && data.item !== null
			? {
					...data.entityForm.data,
					id: data.item.id,
					title: data.item.title,
					type: data.item.type,
					parent: data.entityList.find((p) => p.id === data?.item?.parentId)?.title,
					parentId: data.item.parentId
				}
			: data.entityForm.data,
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
		? '/dashboard/entity?/updateUnit'
		: '/dashboard/entity?/createUnit'}
	class="flex flex-col space-y-2"
>
	<input type="hidden" name="id" bind:value={$form.id} />

	<div class="w-full">
		<Label for="title">Unit</Label>
		<Input id="title" type="text" name="title" bind:value={$form.title} {...$constraints.title} />
		<DisplayFormErrors errors={$errors.title} />
	</div>

	<div class="w-full">
		<SelectWithSearch
			list={data.entityList}
			tree={data.entityTree}
			form={$form}
			errors={$errors}
			constraints={$constraints}
			label="Parent unit"
		/>
	</div>

	<div class="w-full">
		<Label for="type">Type</Label>
		<Select
			id="type"
			name="type"
			items={unitTypes}
			bind:value={$form.type}
			{...$constraints.type}
		/>
		<DisplayFormErrors errors={$errors.type} />
	</div>

	<Button type="submit" class="w-full">Add</Button>
</form>

<SuperDebug data={$form} />
