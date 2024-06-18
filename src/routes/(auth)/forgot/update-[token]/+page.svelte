<script lang="ts">
	import { superForm, type FormResult } from 'sveltekit-superforms';
	import type { ActionData, PageData } from './$types.js';
	import { A, Button, Card, Input, Label } from 'flowbite-svelte';
	import DisplayFormErrors from '$lib/components/DisplayFormErrors.svelte';

	export let data: PageData;
	let passwordUpdated = false;
	let hiddenBackdropFalse = false;
	// console.log("register.form.svelte :: data => ", data)
	const { form, errors, constraints, enhance } = superForm(data.changePasswordForm.data, {
		onResult(event) {
			const result = event.result as FormResult<ActionData>;
			passwordUpdated = result.data?.passwordUpdated;
		}
	});
</script>

<div class="flex h-screen items-center justify-center">
	<Card class="space-y-2">
		<p class="text-3xl font-medium">Update password</p>
		<p>Change password to access the solution</p>

		{#if passwordUpdated === false}
			<form class="space-y-2" use:enhance novalidate method="POST">
				<div>
					<Label for="password">Password</Label>
					<Input
						id="password"
						type="password"
						name="password"
						bind:value={$form.password}
						{...$constraints.password}
					/>

					<DisplayFormErrors errors={$errors.password} />
				</div>

				<div>
					<Label for="confirmPassword">Confirm password</Label>
					<Input
						id="confirmPassword"
						type="password"
						name="confirmPassword"
						bind:value={$form.confirmPassword}
						{...$constraints.confirmPassword}
					/>
					<DisplayFormErrors errors={$errors.confirmPassword} />
				</div>
				<Button type="submit">Update password</Button>
			</form>
		{:else}
			<p>Password was updated. You might sign in now</p>
			<A href="/login" class="text-red-500">Sign in</A>
		{/if}
	</Card>
</div>
