<script lang="ts">
	import DisplayFormErrors from '$lib/components/DisplayFormErrors.svelte';
	import { fillDrawer } from '$lib/components/Drawer/drawer.utlities';

	import { Button, Input, Label } from 'flowbite-svelte';
	import { superForm, type FormResult } from 'sveltekit-superforms/client';
	import Contact from './Contact.svelte';

	let inquirySearchResponce: any | null = null;

	export let data: any;
	const { form, errors, constraints, enhance } = superForm(data.trackInquiryForm.data, {
		onResult(event) {
			const result = event.result as FormResult<any>;
			result.type === 'success' ? (inquirySearchResponce = result.data?.inquiry) : null;
		}
	});
</script>

<form
	class="flex flex-col space-y-2"
	use:enhance
	novalidate
	method="POST"
	action="/contact?/findInquiryByID"
>
	<div>
		<Label for="id" class="label">Track by ID</Label>

		<Input id="id" type="text" name="id" bind:value={$form.id} {...$constraints.id} />
		<DisplayFormErrors errors={$errors.id} />
	</div>
	<div>
		<Button type="submit" class="w-full">Track inquiry</Button>
	</div>
</form>

<button
	on:click={() => {
		fillDrawer('Contact Us', Contact, data);
	}}
	class="mt-2 text-red-700 hover:underline">Submit a new inquiry</button
>

<div class="mt-2">
	{#if inquirySearchResponce !== null}
		<p class="text-2xl">Inquiry: # {inquirySearchResponce.id}</p>
		<p class="italic">
			by {inquirySearchResponce.email} - {inquirySearchResponce.createdAt.toLocaleString('en-GB', {
				timeZone: 'UTC'
			})}
		</p>
		<p class="mt-2 text-gray-500">{inquirySearchResponce.message}</p>
		<p class="mt-2 text-2xl">Response:</p>
		<p>
			{inquirySearchResponce.response === null
				? 'No response provided yet'
				: inquirySearchResponce.response}
		</p>
	{/if}
</div>
