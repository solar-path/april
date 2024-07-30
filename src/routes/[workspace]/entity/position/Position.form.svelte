<script lang="ts">
	import DisplayFormErrors from '$lib/components/DisplayFormErrors.svelte';
	import { hideDrawer } from '$lib/components/Drawer/drawer.utlities';
	import SelectWithSearchTree from '$lib/components/SelectWithSearch/SelectWithSearchTree.svelte';
	import { formStore } from '$lib/components/form/formStore';
	import { Button, Input, Label, Textarea } from 'flowbite-svelte';
	import { onDestroy } from 'svelte';
	import SuperDebug, { superForm, type FormResult } from 'sveltekit-superforms';
	import { page } from '$app/stores';

	interface PositionData {
		item?: {
			id?: string;
			title: string;
			description: string;
			departmentId: string;
			department: string;
			companyId: string;
			company: string;
		};
		positionForm: {
			data: any;
		};
		departmentList: any[];
		companyList: any[];
	}

	export let data: PositionData;

	const { form, errors, constraints, enhance } = superForm(
		data.item && data.item !== null
			? {
					...data.positionForm.data,
					id: data.item.id,
					title: data.item.title,
					description: data.item.description,
					departmentId: data.item.departmentId,
					department: data.item.department,
					companyId: data.item.companyId,
					company: data.item.company
				}
			: data.positionForm.data,
		{
			onResult(event) {
				const result = event.result as FormResult<any>;
				if (result.type === 'success') {
					$hideDrawer = !$hideDrawer;
				}
			}
		}
	);

	$: filteredDepartmentList = data.departmentList.filter(
		(department) => department.companyId === $form.companyId
	);

	const unsubscribe = formStore.subscribe((value) => {
		if (value.companyId) {
			$form.companyId = value.companyId.fieldId;
			$form.company = value.companyId.fieldName;
		}
		if (value.departmentId) {
			$form.departmentId = value.departmentId.fieldId;
			$form.department = value.departmentId.fieldName;
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
		? `/${$page.params.workspace}/entity/position?/updatePosition`
		: `/${$page.params.workspace}/entity/position?/createPosition`}
	class="flex flex-col space-y-2"
>
	<input type="hidden" name="id" bind:value={$form.id} />

	<div class="w-full">
		<Label for="title">Position</Label>
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

	<div class="w-full">
		<SelectWithSearchTree
			label="Department"
			list={filteredDepartmentList}
			tree={filteredDepartmentList}
			form={$form}
			errors={$errors}
			constraints={$constraints}
			modalID="department"
			modalState={false}
			fieldId="departmentId"
			fieldName="department"
		/>
		<DisplayFormErrors errors={$errors.departmentId} />
	</div>

	<Button type="submit" class="w-full">Add</Button>
</form>
<SuperDebug data={$form} />
