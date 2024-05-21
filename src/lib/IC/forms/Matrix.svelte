<script lang="ts">
	import DisplayFormErrors from '$lib/components/DisplayFormErrors.svelte';
	import { hideDrawer } from '$lib/components/Drawer/drawer.utlities';
	import SelectWithSearchTree from '$lib/components/SelectWithSearch/SelectWithSearchTree.svelte';
	import SelectWithSearchTable from '$lib/components/SelectWithSearch/SelectWithSearchTable.svelte';
	import { Button, ButtonGroup, Label, Select, Textarea } from 'flowbite-svelte';
	import { superForm, type FormResult } from 'sveltekit-superforms';
	import SuperDebug from 'sveltekit-superforms';
	interface MatrixData {
		item?: {
			id: string;
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
			entityId: string;
			entity: string;
		};
		matrixForm: {
			data: any;
		};
		processList: any[];
		riskList: any[];
		controlList: any[];
		entityList: any[];
		processTree: any[];
		entityTree: any[];
	}

	export let data: MatrixData;

	$: console.log('ic/forms/matrix :: data => ', data);

	const { form, errors, constraints, enhance } = superForm(
		data.item && data.item !== null
			? {
					...data.matrixForm.data,
					id: data.item.id,
					process: data.processList.find((item) => item.id === data?.item?.processId),
					risk: data.riskList.find((item) => item.id === data?.item?.riskId),
					control: data.controlList.find((item) => item.id === data?.item?.controlId),
					processId: data.item.processId,
					riskId: data.item.riskId,
					controlId: data.item.controlId,
					description: data.item.description,
					frequency: data.item.frequency,
					type: data.item.type,
					execution: data.item.execution,
					entityId: data.item.entityId,
					entity: data.item.entity
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
</script>

<form
	use:enhance
	novalidate
	method="POST"
	action={data.item && data.item !== null
		? '/dashboard/IC?/updateMatrix'
		: '/dashboard/IC?/createMatrix'}
	class="flex flex-col space-y-2"
>
	<input type="hidden" name="id" bind:value={$form.id} />
	<input type="hidden" name="processId" bind:value={$form.processId} />
	<input type="hidden" name="riskId" bind:value={$form.riskId} />
	<input type="hidden" name="controlId" bind:value={$form.controlId} />
	<input type="hidden" name="entityId" bind:value={$form.entityId} />

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
			tableDescription="Browse a list of risks that might adversly affect company's ability to achieve process
		objectives."
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
			tableDescription="Browse a list of emplemented controls that prevents and/or detects risks."
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
		<ButtonGroup class="w-full">
			<Button class="w-1/3" on:click={() => ($form.type = 'Preventive')}>Preventive</Button>
			<Button class="w-1/3" on:click={() => ($form.type = 'Detective')}>Detective</Button>
			<Button class="w-1/3" on:click={() => ($form.type = 'SoD')}>SoD</Button>
		</ButtonGroup>
		<DisplayFormErrors errors={$errors.type} />
	</div>
	<div>
		<Label for="execution">Execution</Label>
		<ButtonGroup class="w-full">
			<Button class="w-1/3" on:click={() => ($form.execution = 'Manual')}>Manual</Button>
			<Button class="w-1/3" on:click={() => ($form.execution = 'IT-Department')}
				>IT-Department</Button
			>
			<Button class="w-1/3" on:click={() => ($form.execution = 'Automated')}>Automated</Button>
		</ButtonGroup>
		<DisplayFormErrors errors={$errors.execution} />
	</div>

	<div class="w-full">
		<SelectWithSearchTree
			label="Entity"
			list={data.entityList}
			tree={data.entityTree}
			form={$form}
			errors={$errors}
			constraints={$constraints}
			modalID="entity"
			modalState={false}
			fieldName="entity"
			fieldId="entityId"
		/>
		<DisplayFormErrors errors={$errors.entity} />
	</div>

	<Button type="submit" class="w-full">Add</Button>
</form>

<SuperDebug data={$form} />
