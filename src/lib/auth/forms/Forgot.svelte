<script lang="ts">
	import DisplayFormErrors from '$lib/components/DisplayFormErrors.svelte';
	import { Button, Input, Label } from 'flowbite-svelte';
	import { EnvelopeSolid } from 'flowbite-svelte-icons';
	import { superForm } from 'sveltekit-superforms/client';
	export let data;
	const { form, errors, constraints, enhance } = superForm(data.forgotPasswordForm.data);
</script>

<form
	use:enhance
	novalidate
	method="POST"
	action="/auth?/forgotPassword"
	class="flex flex-col space-y-2"
>
	<div class="w-full">
		<Label for="email">Email</Label>
		<Input id="email" type="email" name="email" bind:value={$form.email} {...$constraints.email}>
			<EnvelopeSolid slot="left" class="h-6 w-6" />
		</Input>
		<DisplayFormErrors errors={$errors.email} />
	</div>
	<Button type="submit" class="w-full">Remind password</Button>
</form>
