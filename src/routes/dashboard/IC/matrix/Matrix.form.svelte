<script lang="ts">
	import DisplayFormErrors from '$lib/components/DisplayFormErrors.svelte';
	import { hideDrawer } from '$lib/components/Drawer/drawer.utlities';
	import SelectWithSearchTree from '$lib/components/SelectWithSearch/SelectWithSearchTree.svelte';
	import SelectWithSearchTable from '$lib/components/SelectWithSearch/SelectWithSearchTable.svelte';
	import { Button, Label, Select, Textarea } from 'flowbite-svelte';
	import { superForm, type FormResult } from 'sveltekit-superforms';
	import SuperDebug from 'sveltekit-superforms';
	import { onDestroy } from 'svelte';
	import { formStore } from '$lib/components/form/formStore';

	interface MatrixData {
		item?: {
			id?: string;
			processId: string;
			process: string;
			riskId: string;
			risk: string;
			controlId: string;
			control: string;
			description: string;
			frequency: string;
			type: string;
			execution: string;
			companyId: string;
			company: string;
			controlOwnerId: string;
			controlOwner: string;
		};
		matrixForm: {
			data: any;
		};
		processList: any[];
		riskList: any[];
		controlList: any[];
		companyList: any[];
		processTree: any[];
		positionList: any[];
	}

	export let data: MatrixData;

	const { form, errors, constraints, enhance } = superForm(
		data.item && data.item !== null
			? {
					...data.matrixForm.data,
					id: data.item.id,
					processId: data.item.processId,
					process: data.processList.find((item) => item.id === data?.item?.processId),
					riskId: data.item.riskId,
					risk: data.riskList.find((item) => item.id === data?.item?.riskId),
					controlId: data.item.controlId,
					control: data.controlList.find((item) => item.id === data?.item?.controlId),
					description: data.item.description,
					frequency: data.item.frequency,
					type: data.item.type,
					execution: data.item.execution,
					companyId: data.item.companyId,
					company: data.companyList.find((item) => item.id === data?.item?.companyId),
					controlOwnerId: data.item.controlOwnerId,
					controlOwner: data.positionList.find((item) => item.id === data?.item?.controlOwnerId)
				}
			: data.matrixForm.data,
		{
			onResult(event) {
				const result = event.result as FormResult<any>;
				if (result.type === 'success') {
					$hideDrawer = !$hideDrawer;
				}
			}
		}
	);

	let frequencyTypes = [
		{ value: 'On-demand', name: 'On-demand' },
		{ value: 'Daily', name: 'Daily' },
		{ value: 'Weekly', name: 'Weekly' },
		{ value: 'Monthly', name: 'Monthly' },
		{ value: 'Quarterly', name: 'Quarterly' },
		{ value: 'Annually', name: 'Annually' }
	];

	let typeTypes = [
		{ value: 'Preventive', name: 'Preventive' },
		{ value: 'Detective', name: 'Detective' },
		{ value: 'SoD', name: 'SoD' }
	];

	let executionTypes = [
		{ value: 'Manual', name: 'Manual' },
		{ value: 'IT-Dependend', name: 'IT-Dependend' },
		{ value: 'Automated', name: 'Automated' }
	];

	const unsubscribe = formStore.subscribe((value) => {
		if (value.processId) {
			$form.processId = value.processId.fieldId;
			$form.process = value.processId.fieldName;
		}

		if (value.riskId) {
			$form.riskId = value.riskId.fieldId;
			$form.risk = value.riskId.fieldName;
		}

		if (value.controlId) {
			$form.controlId = value.controlId.fieldId;
			$form.control = value.controlId.fieldName;
		}

		if (value.companyId) {
			$form.companyId = value.companyId.fieldId;
			$form.company = value.companyId.fieldName;
		}

		if (value.controlOwnerId) {
			$form.controlOwnerId = value.controlOwnerId.fieldId;
			$form.controlOwner = value.controlOwnerId.fieldName;
		}
	});

	$: filteredPositionList = data.positionList.filter((item) => item.companyId === $form.companyId);

	onDestroy(() => {
		unsubscribe();
	});
</script>

<form
	use:enhance
	novalidate
	method="POST"
	action={data.item && data.item !== null
		? '/dashboard/IC/matrix?/updateMatrix'
		: '/dashboard/IC/matrix?/createMatrix'}
	class="flex flex-col space-y-2"
>
	<input type="hidden" name="id" bind:value={$form.id} />
	<input type="hidden" name="processId" bind:value={$form.processId} />
	<input type="hidden" name="riskId" bind:value={$form.riskId} />
	<input type="hidden" name="controlId" bind:value={$form.controlId} />
	<input type="hidden" name="companyId" bind:value={$form.companyId} />
	<input type="hidden" name="controlOwnerId" bind:value={$form.controlOwnerId} />

	<div class="w-full">
		<SelectWithSearchTree
			label="Process"
			list={data.processList}
			tree={data.processTree}
			form={$form}
			errors={$errors}
			constraints={$constraints}
			modalID="process"
			modalState={false}
			fieldName="process"
			fieldId="processId"
		/>
		<DisplayFormErrors errors={$errors.processId} />
	</div>

	<div class="w-full">
		<SelectWithSearchTable
			label="Risk"
			list={data.riskList}
			form={$form}
			fieldName="risk"
			fieldId="riskId"
			errors={$errors}
			constraints={$constraints}
			modalID="risk"
			tableLabel="Risk List"
			tableDescription="Browse a list of risks that might adversely affect the company's ability to achieve process objectives."
			modalState={false}
		/>
	</div>

	<div class="w-full">
		<SelectWithSearchTable
			label="Control"
			list={data.controlList}
			form={$form}
			fieldName="control"
			fieldId="controlId"
			errors={$errors}
			constraints={$constraints}
			modalID="control"
			tableLabel="Control List"
			tableDescription="Browse a list of implemented controls that prevents and/or detects risks."
			modalState={false}
		/>
	</div>
	<div class="w-full">
		<Label for="description">Description</Label>
		<Textarea
			id="description"
			name="description"
			bind:value={$form.description}
			{...$constraints.description}
		/>
		<DisplayFormErrors errors={$errors.description} />
	</div>

	<div class="w-full">
		<Label for="frequency">Frequency</Label>
		<Select
			id="frequency"
			name="frequency"
			items={frequencyTypes}
			bind:value={$form.frequency}
			{...$constraints.frequency}
		/>
		<DisplayFormErrors errors={$errors.frequency} />
	</div>

	<div>
		<Label for="type">Type</Label>
		<Select
			id="type"
			name="type"
			items={typeTypes}
			bind:value={$form.type}
			{...$constraints.type}
		/>
		<DisplayFormErrors errors={$errors.type} />
	</div>
	<div>
		<Label for="execution">Execution</Label>
		<Select
			id="execution"
			name="execution"
			items={executionTypes}
			bind:value={$form.execution}
			{...$constraints.execution}
		/>
		<DisplayFormErrors errors={$errors.execution} />
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
			fieldName="company"
			fieldId="companyId"
		/>
		<DisplayFormErrors errors={$errors.companyId} />
	</div>
	<div class="w-full">
		<SelectWithSearchTree
			label="Control owner"
			list={filteredPositionList}
			tree={filteredPositionList}
			form={$form}
			errors={$errors}
			constraints={$constraints}
			modalID="controlOwner"
			modalState={false}
			fieldName="controlOwner"
			fieldId="controlOwnerId"
		/>
		<DisplayFormErrors errors={$errors.controlOwnerId} />
	</div>

	<Button type="submit" class="w-full">Add</Button>
</form>

<SuperDebug data={$form} />
