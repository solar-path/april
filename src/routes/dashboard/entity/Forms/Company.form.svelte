<script lang="ts">
	import DisplayFormErrors from '$lib/components/DisplayFormErrors.svelte';
	import { hideDrawer } from '$lib/components/Drawer/drawer.utlities';
	import SelectWithSearchTree from '$lib/components/SelectWithSearch/SelectWithSearchTree.svelte';
	import SelectWithSearchTreeOne from '$lib/components/SelectWithSearch/SelectWithSearchTreeOne.svelte';
	import { Button, Input, Label, Textarea } from 'flowbite-svelte';
	import SuperDebug, { superForm, type FormResult } from 'sveltekit-superforms';

	interface CompanyData {
		item?: {
			id: string;
			title: string;
			description: string;
			logo: string;
			type: string;
			region: string;
			regionId: string;
			workspace: string;
			workspaceId: string;
			industry: string;
			industryId: string;
			BIN: string;
			address: {
				city: string;
				state: string;
				country: string;
				countryId: string;
				zipcode: string;
				addressLine: string;
			};
			contact: {
				phone: string;
				email: string;
				website: string;
			};
		};
		companyForm: {
			data: any;
		};
		workspaceList: any[];
		groupStructureTree: any[];
		regionList: any[];
		regionTree: any[];
		industryList: any[];
	}

	export let data: CompanyData;
	let filteredRegionList: any[] = [];

	console.log('data => ', data);
	const { form, errors, constraints, enhance } = superForm(
		data.item && data.item !== null
			? {
					...data.companyForm.data,
					id: data.item.id,
					title: data.item.title,
					description: data.item.description,
					type: data.item.type,
					regionId: data.item.regionId,
					region: data.regionList.find((item) => item.id === data?.item?.regionId)?.title,
					workspaceId: data.item.workspaceId,
					workspace: data.workspaceList.find((item) => item.id === data?.item?.workspaceId)?.title,
					industryId: data.item.industryId,
					industry: data.industryList.find((item) => item.id === data?.item?.industryId)?.title,
					BIN: data.item.BIN
				}
			: data.companyForm.data,
		{
			dataType: 'json',

			onResult(event) {
				const result = event.result as FormResult<any>;
				if (result.type === 'success') {
					$hideDrawer = !$hideDrawer;
				}
			}
		}
	);

	$: filteredRegionList = data.regionList.filter(
		(region) => region.workspaceId === $form.workspaceId
	);
</script>

<form
	use:enhance
	novalidate
	method="POST"
	action={data.item && data.item !== null
		? '/dashboard/entity?/updateCompany'
		: '/dashboard/entity?/createCompany'}
	class="flex flex-col space-y-2"
>
	<input type="hidden" name="id" bind:value={$form.id} />
	<input type="hidden" name="workspaceId" bind:value={$form.workspaceId} />
	<input type="hidden" name="regionId" bind:value={$form.regionId} />
	<input type="hidden" name="type" value="company" />
	<input type="hidden" name="industryId" bind:value={$form.industryId} />

	<div class="w-full">
		<Label for="title">Company name</Label>
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
		<SelectWithSearchTreeOne
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
		<SelectWithSearchTreeOne
			label="Region"
			list={filteredRegionList}
			tree={filteredRegionList}
			form={$form}
			errors={$errors}
			constraints={$constraints}
			modalID="Region"
			modalState={false}
			fieldId="regionId"
			fieldName="region"
		/>
		<DisplayFormErrors errors={$errors.regionId} />
	</div>

	<div class="w-full">
		<Label for="BIN">Business identication number</Label>
		<Input id="BIN" type="text" name="BIN" bind:value={$form.BIN} {...$constraints.BIN} />
		<DisplayFormErrors errors={$errors.BIN} />
	</div>

	<Button type="submit" class="w-full">Add</Button>
</form>
<SuperDebug data={$form} />
