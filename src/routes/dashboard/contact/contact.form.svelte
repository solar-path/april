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
			phone: string;
			email: string;
			website: string;
		};
		companyForm: {
			data: any;
		};
	}

	export let data: CompanyData;

	const { form, errors, constraints, enhance } = superForm(
		data.item && data.item !== null
			? {
					...data.contactForm.data,
					id: data.item.id,
					phone: data.item.phone,
					email: data.item.email,
					website: data.item.website
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
</script>

<form
	use:enhance
	novalidate
	method="POST"
	action={data.item && data.item !== null
		? '/dashboard/contact?/updateContact'
		: '/dashboard/contact?/createContact'}
	class="flex flex-col space-y-2"
>
	<input type="hidden" name="id" bind:value={$form.id} />

	<div class="w-full">
		<Label for="phone">Phone</Label>
		<Input
			id="phone"
			type="tel"
			name="phone"
			bind:value={$form.phone}
			{...$constraints.phone}
			placeholder="+1 XXX-XXX-XXXX"
			pattern="^\+1 \d{3}-\d{3}-\d{4}$"
		/>
		<DisplayFormErrors errors={$errors.phone} />
	</div>

	<div class="w-full">
		<Label for="website">Website</Label>
		<Input
			id="website"
			type="url"
			name="website"
			bind:value={$form.website}
			{...$constraints.website}
			placeholder="https://example.com"
			pattern="https://.*"
		/>
		<DisplayFormErrors errors={$errors.website} />
	</div>

	<div class="w-full">
		<Label for="email">Email</Label>
		<Input id="email" type="email" name="email" bind:value={$form.email} {...$constraints.email} />
		<DisplayFormErrors errors={$errors.email} />
	</div>

	<Button type="submit" class="w-full">Add</Button>
</form>
<SuperDebug data={$form} />
