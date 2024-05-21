<script lang="ts">
	import { superForm, type FormResult } from 'sveltekit-superforms/client';
	import { Button, Input, Label } from 'flowbite-svelte';
	import DisplayFormErrors from '$lib/components/DisplayFormErrors.svelte';
	import Register from '$lib/auth/forms/Register.svelte';
	import { fillDrawer, hideDrawer } from '$lib/components/Drawer/drawer.utlities';
	import Forgot from './Forgot.svelte';
	import { goto } from '$app/navigation';
	import { EyeOutline, EyeSlashOutline, EnvelopeSolid, LockSolid } from 'flowbite-svelte-icons';

	export let data: any;

	type LoginFormData = {
		email: string;
		password: string;
	};

	type FormErrors = {
		email?: string[]; // Array of strings for email errors
		password?: string[]; // Array of string`s for password errors
	};
	const { form, errors, constraints, enhance } = superForm<LoginFormData, FormErrors>(
		data.loginForm.data,
		{
			onResult(event) {
				const result = event.result as FormResult<any>;
				if (result.type === 'success') {
					$hideDrawer = !$hideDrawer;
					goto('/dashboard');
				}
			}
		}
	);

	let show = false;
</script>

<form use:enhance novalidate method="POST" action="/auth?/login" class="flex flex-col space-y-2">
	<div class="w-full">
		<Label for="email">Email</Label>
		<Input id="email" type="email" name="email" bind:value={$form.email} {...$constraints.email}>
			<EnvelopeSolid slot="left" class="h-6 w-6" />
		</Input>
		<DisplayFormErrors errors={$errors.email} />
	</div>

	<div class="w-full">
		<Label for="password">Password</Label>
		<Input
			type={show ? 'text' : 'password'}
			id="password"
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

	<Button type="submit" class="w-full">Login</Button>
</form>
<div class="mt-4">
	<ul>
		<li>
			Don’t have an account?
			<button
				on:click={() => fillDrawer('Sign up', Register, data)}
				class="text-red-600 hover:underline"
				>Join now
			</button>
		</li>
		<li>
			Forgot password?
			<button
				on:click={() => fillDrawer('Forgot password', Forgot, data)}
				class="text-red-600 hover:underline"
				>Remind
			</button>
		</li>
	</ul>
</div>
