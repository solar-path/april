<script lang="ts">
	import DisplayFormErrors from '$lib/components/DisplayFormErrors.svelte';
	import { hideDrawer } from '$lib/components/Drawer/drawer.utlities';
	import { Button, Hr, Input, Label, Textarea } from 'flowbite-svelte';
	import SuperDebug, { superForm, type FormResult } from 'sveltekit-superforms';
	import { formStore } from '$lib/components/form/formStore'; // Import the store
	import { onDestroy } from 'svelte';
	import SelectWithSearchTree from '$lib/components/SelectWithSearch/SelectWithSearchTree.svelte';

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
		industryTree: any[];
		countryList: any[];
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
					logo: data.item.logo,
					type: data.item.type,
					regionId: data.item.regionId,
					region: data.regionList.find((item) => item.id === data?.item?.regionId)?.title,
					workspaceId: data.item.workspaceId,
					workspace: data.workspaceList.find((item) => item.id === data?.item?.workspaceId)?.title,
					industryId: data.item.industryId,
					industry: data.industryList.find((item) => item.id === data?.item?.industryId)?.title,
					BIN: data.item.BIN,
					address: {
						city: data.item.address.city,
						state: data.item.address.state,
						country: data.item.address.country,
						countryId: data.item.address.countryId,
						zipcode: data.item.address.zipcode,
						addressLine: data.item.address.addressLine
					},
					contact: {
						phone: data.item.contact.phone,
						email: data.item.contact.email,
						website: data.item.contact.website
					}
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

	// Subscribe to the store and update the form reactively
	const unsubscribe = formStore.subscribe((value) => {
		if (value.workspaceId) {
			$form.workspaceId = value.workspaceId.fieldId;
			$form.workspace = value.workspaceId.fieldName;
		}
		if (value.regionId) {
			$form.regionId = value.regionId.fieldId;
			$form.region = value.regionId.fieldName;
		}

		if (value.industryId) {
			$form.industryId = value.industryId.fieldId;
			$form.industry = value.industryId.fieldName;
		}

		if (value.countryId) {
			$form.address.countryId = value.countryId.fieldId;
			$form.address.country = value.countryId.fieldName;
		}
		// Add more fields as needed
	});

	onDestroy(() => {
		unsubscribe();
	});
</script>

<form
	use:enhance
	novalidate
	enctype="multipart/form-data"
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
	<input type="hidden" name="countryId" bind:value={$form.countryId} />

	<Hr />
	<p class="text-left font-bold">General Information</p>

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
		<Label for="logo">Logo</Label>
		{#if data.item && data.item != null && data.item.logo != null}
			<img src={data.item.logo} alt="Logo" />
		{/if}
		<Input
			id="logo"
			type="file"
			name="logo"
			accept="image/png, image/jpeg"
			bind:value={$form.logo}
			{...$constraints.logo}
		/>
		<DisplayFormErrors errors={$errors.logo} />
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
		<SelectWithSearchTree
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
		<SelectWithSearchTree
			label="Industry"
			list={data.industryList}
			tree={data.industryTree}
			form={$form}
			errors={$errors}
			constraints={$constraints}
			modalID="industry"
			modalState={false}
			fieldId="industryId"
			fieldName="industry"
		/>
		<DisplayFormErrors errors={$errors.industryId} />
	</div>

	<div class="w-full">
		<Label for="BIN">Business identication number</Label>
		<Input id="BIN" type="text" name="BIN" bind:value={$form.BIN} {...$constraints.BIN} />
		<DisplayFormErrors errors={$errors.BIN} />
	</div>

	<Hr />
	<p class="text-left font-bold">Address</p>

	<div class="flex w-full flex-row">
		<div class="mr-1 w-1/2">
			<Label for="city">City</Label>
			<Input
				id="city"
				type="text"
				name="city"
				bind:value={$form.address.city}
				{...$constraints.address?.city}
			/>
			<DisplayFormErrors errors={$errors.address?.city} />
		</div>
		<div class="ml-1 w-1/2">
			<Label for="state">State</Label>
			<Input
				id="state"
				type="text"
				name="state"
				bind:value={$form.address.state}
				{...$constraints.address?.state}
			/>
			<DisplayFormErrors errors={$errors.address?.state} />
		</div>
	</div>

	<div class="flex w-full flex-row">
		<div class="mr-1 w-1/2">
			<Label for="city">Address Line</Label>
			<Input
				id="addressLine"
				type="text"
				name="addressLine"
				bind:value={$form.address.addressLine}
				{...$constraints.address?.addressLine}
			/>
			<DisplayFormErrors errors={$errors.address?.addressLine} />
		</div>

		<div class="ml-1 w-1/2">
			<Label for="zipcode">Post code</Label>
			<Input
				id="zipcode"
				type="text"
				name="zipcode"
				bind:value={$form.address.zipcode}
				{...$constraints.address?.zipcode}
			/>
			<DisplayFormErrors errors={$errors.address?.zipcode} />
		</div>
	</div>

	<div class="w-full">
		<SelectWithSearchTree
			label="Country"
			list={data.countryList}
			tree={data.countryList}
			form={$form}
			errors={$errors}
			constraints={$constraints}
			modalID="Country"
			modalState={false}
			fieldId="countryId"
			fieldName="country"
		/>
		<DisplayFormErrors errors={$errors.countryId} />
	</div>

	<Hr />
	<p class="text-left font-bold">Contact</p>

	<div class="w-full">
		<Label for="phone">Phone</Label>
		<Input
			id="phone"
			type="text"
			name="phone"
			bind:value={$form.contact.phone}
			{...$constraints.contact?.phone}
		/>
		<DisplayFormErrors errors={$errors.contact?.phone} />
	</div>

	<div class="w-full">
		<Label for="website">Website</Label>
		<Input
			id="website"
			type="text"
			name="website"
			bind:value={$form.contact.website}
			{...$constraints.contact?.website}
		/>
		<DisplayFormErrors errors={$errors.contact?.website} />
	</div>

	<div class="w-full">
		<Label for="email">Email</Label>
		<Input
			id="email"
			type="email"
			name="email"
			bind:value={$form.contact.email}
			{...$constraints.contact?.email}
		/>
		<DisplayFormErrors errors={$errors.contact?.email} />
	</div>

	<Button type="submit" class="w-full">Add</Button>
</form>
<SuperDebug data={$form} />
