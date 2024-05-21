<script lang="ts">
	import { superForm, type FormResult } from 'sveltekit-superforms/client';
	import { Button, Input, Label, Checkbox, A } from 'flowbite-svelte';
	import DisplayFormErrors from '$lib/components/DisplayFormErrors.svelte';
	import { fillDrawer, hideDrawer } from '$lib/components/Drawer/drawer.utlities';
	import Login from './Login.svelte';
	import { EnvelopeSolid, EyeOutline, EyeSlashOutline, LockSolid } from 'flowbite-svelte-icons';

	export let data;

	type RegisterFormData = {
		email: string;
		password: string;
		terms: boolean;
	};

	type FormErrors = {
		email?: string[]; // Array of strings for email errors
		password?: string[]; // Array of strings for password errors
		terms?: string[]; // Array of strings for terms errors
	};
	const { form, errors, constraints, enhance } = superForm<RegisterFormData, FormErrors>(
		data.registerForm.data,
		{
			onResult(event) {
				const result = event.result as FormResult<any>;
				if (result.type === 'success') {
					$hideDrawer = !$hideDrawer;
				}
			}
		}
	);
	let show = false;
</script>

<form use:enhance novalidate method="POST" action="/auth?/register" class="flex flex-col space-y-2">
	<div>
		<Label for="email">Email</Label>
		<Input id="email" type="email" name="email" bind:value={$form.email} {...$constraints.email}>
			<EnvelopeSolid slot="left" class="h-6 w-6" />
		</Input>
		<DisplayFormErrors errors={$errors.email} />
	</div>
	<div>
		<Label for="password">Password</Label>
		<Input
			id="password"
			type={show ? 'text' : 'password'}
			name="password"
			bind:value={$form.password}
			{...$constraints.password}
		>
			<LockSolid slot="left" class="h-6 w-6" />
			<button
				slot="right"
				on:click={() => (show = !show)}
				class="pointer-events-auto"
				type="button"
			>
				{#if show}
					<EyeOutline class="h-6 w-6" />
				{:else}
					<EyeSlashOutline class="h-6 w-6" />
				{/if}
			</button>
		</Input>
		<DisplayFormErrors errors={$errors.password} />
	</div>
	<div>
		<Checkbox id="terms" name="terms" bind:checked={$form.terms} {...$constraints.terms}>
			<p>Accept <A href="/terms">Terms and conditions</A></p>
		</Checkbox>
		<DisplayFormErrors errors={$errors.terms} />
	</div>

	<Button type="submit" class="w-full">Register</Button>
</form>

<div class="mt-4">
	<p>
		Have an account? <button
			on:click={() => fillDrawer('Sign in', Login, data)}
			class="text-red-600 hover:underline"
			>Sign in
		</button>
	</p>
</div>
