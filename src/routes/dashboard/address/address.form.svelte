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
			id?: string;

			city: string;
			state: string;
			country: string;
			countryId: string;
			zipcode: string;
			addressLine: string;
		};
		companyForm: {
			data: any;
		};

		countryList: any[];
	}

	export let data: CompanyData;
	let filteredRegionList: any[] = [];

	console.log('Company.form.svelte :: data => ', data);
	const { form, errors, constraints, enhance } = superForm(
		data.item && data.item !== null
			? {
					...data.companyForm.data,
					id: data.item.id,

					city: data.item.city,
					state: data.item.state,
					country: data.item.country,
					countryId: data.item.countryId,
					zipcode: data.item.zipcode,
					addressLine: data.item.addressLine
				}
			: data.companyForm.data,
		{
			dataType: 'json',

			// onChange(event) {
			// 	event.target.value = formatPhoneNumber(event.target.value);
			// },
			onResult(event) {
				const result = event.result as FormResult<any>;
				if (result.type === 'success') {
					$hideDrawer = !$hideDrawer;
				}
			}
		}
	);

	const unsubscribe = formStore.subscribe((value) => {
		if (value.countryId) {
			$form.countryId = value.countryId.fieldId;
			$form.country = value.countryId.fieldName;
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
	method="POST"
	action={data.item && data.item !== null
		? '/dashboard/entity?/updateCompany'
		: '/dashboard/entity?/createCompany'}
	class="flex flex-col space-y-2"
>
	<input type="hidden" name="id" bind:value={$form.id} />
	<input type="hidden" name="countryId" bind:value={$form.countryId} />

	<div class="flex w-full flex-row">
		<div class="mr-1 w-1/2">
			<Label for="city">City</Label>
			<Input id="city" type="text" name="city" bind:value={$form.city} {...$constraints.city} />
			<DisplayFormErrors errors={$errors.city} />
		</div>
		<div class="ml-1 w-1/2">
			<Label for="state">State</Label>
			<Input id="state" type="text" name="state" bind:value={$form.state} {...$constraints.state} />
			<DisplayFormErrors errors={$errors.state} />
		</div>
	</div>

	<div class="flex w-full flex-row">
		<div class="mr-1 w-1/2">
			<Label for="city">Address Line</Label>
			<Input
				id="addressLine"
				type="text"
				name="addressLine"
				bind:value={$form.addressLine}
				{...$constraints.addressLine}
			/>
			<DisplayFormErrors errors={$errors.addressLine} />
		</div>

		<div class="ml-1 w-1/2">
			<Label for="zipcode">Post code</Label>
			<Input
				id="zipcode"
				type="text"
				name="zipcode"
				bind:value={$form.zipcode}
				{...$constraints.zipcode}
			/>
			<DisplayFormErrors errors={$errors.zipcode} />
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

	<Button type="submit" class="w-full">Add</Button>
</form>
<SuperDebug data={$form} />
