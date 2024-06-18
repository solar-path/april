<script lang="ts">
	import { superForm, type FormResult } from 'sveltekit-superforms';
	import type { ActionData, PageData } from './$types.js';
	import { A, Button, Card, Heading, Hr, Input, Label } from 'flowbite-svelte';
	import DisplayFormErrors from '$lib/components/DisplayFormErrors.svelte';
	import { EyeOutline, EyeSlashOutline, LockSolid } from 'flowbite-svelte-icons';

	export let data: PageData;
	let passwordUpdated = false;
	// console.log("register.form.svelte :: data => ", data)
	const { form, errors, constraints, enhance } = superForm(data.changePasswordForm.data, {
		onResult(event) {
			const result = event.result as FormResult<ActionData>;
			passwordUpdated = result.data?.passwordUpdated;
		}
	});

	let showPassword = false;
	let showRepeatPassword = false;
</script>

<div class="flex flex-col items-center justify-center">
	<Card class="flex flex-col space-y-6" size="lg" padding="xl">
		<Heading tag="h2" class="text-center">Enter new password</Heading>
		<Hr />

		{#if passwordUpdated === false}
			<form class="space-y-2" use:enhance novalidate method="POST">
				<div>
					<Label for="password">Password</Label>
					<Input
						id="password"
						type={showPassword ? 'text' : 'password'}
						name="password"
						bind:value={$form.password}
						{...$constraints.password}
					>
						<LockSolid slot="left" class="h-6 w-6" />
						<button
							slot="right"
							on:click={() => (showPassword = !showPassword)}
							class="pointer-events-auto"
							type="button"
						>
							{#if showPassword}
								<EyeOutline class="h-6 w-6" />
							{:else}
								<EyeSlashOutline class="h-6 w-6" />
							{/if}
						</button>
					</Input>
					<DisplayFormErrors errors={$errors.password} />
				</div>

				<div>
					<Label for="confirmPassword">Confirm password</Label>
					<Input
						id="confirmPassword"
						type={showRepeatPassword ? 'text' : 'password'}
						name="confirmPassword"
						bind:value={$form.confirmPassword}
						{...$constraints.confirmPassword}
					>
						<LockSolid slot="left" class="h-6 w-6" />
						<button
							slot="right"
							on:click={() => (showRepeatPassword = !showRepeatPassword)}
							class="pointer-events-auto"
							type="button"
						>
							{#if showRepeatPassword}
								<EyeOutline class="h-6 w-6" />
							{:else}
								<EyeSlashOutline class="h-6 w-6" />
							{/if}
						</button>
					</Input>
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
