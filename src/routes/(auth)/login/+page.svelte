<script>
	import { superForm } from 'sveltekit-superforms/client';
	import { A, Button, Card, Heading, Hr, Input, Label } from 'flowbite-svelte';
	import DisplayFormErrors from '$lib/components/DisplayFormErrors.svelte';
	import { EyeOutline, EyeSlashOutline, EnvelopeSolid, LockSolid } from 'flowbite-svelte-icons';

	export let data;

	// type LoginFormData = {
	// 	email: string;
	// 	password: string;
	// };

	// type FormErrors = {
	// 	email?: string[]; // Array of strings for email errors
	// 	password?: string[]; // Array of string`s for password errors
	// };
	const { form, errors, constraints, enhance } = superForm(data.loginForm.data);

	let show = false;
</script>

<div class="flex items-center justify-center">
	<Card class="flex flex-col space-y-6" size="lg" padding="xl">
		<Heading tag="h2" class="text-center">Sign in to our platform</Heading>
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
					<A href="/register">Join now</A>
				</li>
				<li>
					Forgot password?
					<A href="/forgot">Remind</A>
				</li>
			</ul>
		</div>
	</Card>
</div>
