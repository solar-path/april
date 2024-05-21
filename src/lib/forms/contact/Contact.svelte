<script lang="ts">
	import DisplayFormErrors from '$lib/components/DisplayFormErrors.svelte';
	import { fillDrawer, hideDrawer } from '$lib/components/Drawer/drawer.utlities';
	import { Button, Input, Label, Textarea } from 'flowbite-svelte';
	import { superForm, type FormResult } from 'sveltekit-superforms';
	import TrackInquiry from './TrackInquiry.svelte';
	export let data: any;

	const { form, errors, constraints, enhance } = superForm(data.contactUsForm.data, {
		onResult(event) {
			const result = event.result as FormResult<any>;
			result.type === 'success' ? ($hideDrawer = !$hideDrawer) : ($hideDrawer = false);
		}
	});
</script>

<form
	use:enhance
	novalidate
	method="POST"
	action="/contact?/submitInquiry"
	class="flex flex-col space-y-2"
>
	<div>
		<Label for="email" class="label">Email</Label>
		<Input id="email" type="email" name="email" bind:value={$form.email} {...$constraints.email} />
		<DisplayFormErrors errors={$errors.email} />
	</div>

	<div>
		<Label for="message" class="label">Message</Label>

		<Textarea name="message" bind:value={$form.message} {...$constraints.message} />
		<DisplayFormErrors errors={$errors.message} />
	</div>

	<div class="flex">
		<Button class="w-full" type="submit">Send message</Button>
	</div>
</form>

<div class="mt-4 flex">
	<span class="flex flex-row items-center">
		Have already submited an inquiry? &nbsp;
		<button
			on:click={() => {
				fillDrawer('Track by ID', TrackInquiry, data);
			}}
			class="text-red-600 hover:underline"
		>
			Track by ID
		</button>
	</span>
</div>
