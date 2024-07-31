<script lang="ts">
	import DisplayFormErrors from '$lib/components/DisplayFormErrors.svelte';
	import { hideDrawer } from '$lib/components/Drawer/drawer.utlities';
	import SelectWithSearchTree from '$lib/components/SelectWithSearch/SelectWithSearchTree.svelte';
	import { formStore } from '$lib/components/form/formStore';
	import { Button, Input, Label, Textarea } from 'flowbite-svelte';
	import { onDestroy } from 'svelte';
	import SuperDebug, { superForm, type FormResult } from 'sveltekit-superforms';
	import { page } from '$app/stores';

	interface CompanyData {
		item?: {
			id: string;
			title: string;
			companyId: string;
			company: string;
			description: string;
		};
		departmentForm: {
			data: any;
		};
		companyList: any[];
	}

	export let data: CompanyData;

	const { form, errors, constraints, enhance } = superForm(
		data.item && data.item !== null
			? {
					...data.departmentForm.data,
					id: data.item.id,
					title: data.item.title,
					description: data.item.description,
					companyId: data.item.companyId,
					company: data.item.company
				}
			: data.departmentForm.data,
		{
			onResult(event) {
				const result = event.result as FormResult<any>;
				if (result.type === 'success') {
					$hideDrawer = !$hideDrawer;
				}
			}
		}
	);

	const unsubscribe = formStore.subscribe((value) => {
		if (value.companyId) {
			$form.companyId = value.companyId.fieldId;
			$form.company = value.companyId.fieldName;
		}
	});

	onDestroy(() => {
		unsubscribe();
	});
</script>

<form
	use:enhance
	novalidate
	method="POST"
	action={data.item && data.item !== null
		? `/${$page.params.workspace}/entity/department?/updateDepartment`
		: `/${$page.params.workspace}/entity/department?/createDepartment`}
	class="flex flex-col space-y-2"
>
	<input type="hidden" name="id" bind:value={$form.id} />
	<input type="hidden" name="companyId" bind:value={$form.companyId} />

	<div class="w-full">
		<Label for="title">Title</Label>
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

	<div class="w-full">
		<SelectWithSearchTree
			label="Company"
			list={data.companyList}
			tree={data.companyList}
			form={$form}
			errors={$errors}
			constraints={$constraints}
			modalID="company"
			modalState={false}
			fieldId="companyId"
			fieldName="company"
		/>
		<DisplayFormErrors errors={$errors.companyId} />
	</div>

	<Button type="submit" class="w-full">Add</Button>
</form>
<SuperDebug data={$form} />
