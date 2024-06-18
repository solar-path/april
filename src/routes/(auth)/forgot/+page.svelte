<script lang="ts">
	import DisplayFormErrors from '$lib/components/DisplayFormErrors.svelte';
	import { Card, Button, Input, Label, Heading, Hr, Toast } from 'flowbite-svelte';
	import { CheckCircleSolid, EnvelopeSolid } from 'flowbite-svelte-icons';
	import { superForm, type FormResult } from 'sveltekit-superforms/client';
	export let data;
	let showToast = false;

	const { form, errors, constraints, enhance } = superForm(data.forgotPasswordForm.data, {
		onResult(event) {
			const result = event.result as FormResult<any>;
			if (result.type === 'success') {
				showToast = true;
			}
		}
	});
</script>

<div class="flex flex-col items-center justify-center">
	<Card class="flex flex-col space-y-6" size="lg" padding="xl">
		<Heading tag="h2" class="text-center">Forgot password?</Heading>
		<Hr />
		<form use:enhance novalidate method="POST" class="flex flex-col space-y-2">
			<div class="w-full">
				<Label for="email">Email</Label>
				<Input
					id="email"
					type="email"
					name="email"
					bind:value={$form.email}
					{...$constraints.email}
				>
					<EnvelopeSolid slot="left" class="h-6 w-6" />
				</Input>
				<DisplayFormErrors errors={$errors.email} />
			</div>
			<Button type="submit" class="w-full">Remind password</Button>
		</form>
	</Card>
	{#if showToast}
		<Toast color="green" class="mt-8 w-full">
			<svelte:fragment slot="icon">
				<CheckCircleSolid class="h-5 w-5" />
				<span class="sr-only">Check icon</span>
			</svelte:fragment>
			Password reset link sent to your email.
		</Toast>
	{/if}
</div>
