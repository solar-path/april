<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import { Card, Button, Input, Label, Checkbox, A, Heading, Hr, P } from 'flowbite-svelte';
	import DisplayFormErrors from '$lib/components/DisplayFormErrors.svelte';
	import { EnvelopeSolid, EyeOutline, EyeSlashOutline, LockSolid } from 'flowbite-svelte-icons';
	import SuperDebug from 'sveltekit-superforms';

	type InviteRegisterData = {
		item?: {
			email?: string;
			password?: string;
			terms?: boolean;
			name?: string;
			surname?: string;
		};
		inviteRegisterForm: {
			data: any;
		};
		heading: string;
		message: string;
	};

	export let data: InviteRegisterData;

	const { form, errors, constraints, enhance } = superForm(
		data.item && data.item !== null
			? {
					...data.inviteRegisterForm.data,
					email: data.item.email,
					name: data.item.name,
					surname: data.item.surname,
					password: data.item.password
				}
			: data.inviteRegisterForm.data
	);

	let show = false;
</script>

<div class="flex items-center justify-center">
	<Card class="flex flex-col space-y-6" size="lg" padding="xl">
		<Heading tag="h2" class="text-center">Join our platform</Heading>
		<Hr />

		{#if data.heading.length === 0}
			<form use:enhance novalidate method="POST" class="flex flex-col space-y-2">
				<input type="hidden" name="email" bind:value={$form.email} />

				<div>
					<Label for="email">Email</Label>
					<Input
						id="email"
						type="email"
						name="email"
						bind:value={$form.email}
						{...$constraints.email}
						disabled
					>
						<EnvelopeSolid slot="left" class="h-6 w-6" />
					</Input>
					<DisplayFormErrors errors={$errors.email} />
				</div>
				<div>
					<Label for="name">Name</Label>
					<Input id="name" type="text" name="name" bind:value={$form.name} {...$constraints.name} />

					<DisplayFormErrors errors={$errors.name} />
				</div>

				<div>
					<Label for="surname">Last name</Label>
					<Input
						id="surname"
						type="text"
						name="surname"
						bind:value={$form.surname}
						{...$constraints.surname}
					/>
					<DisplayFormErrors errors={$errors.surname} />
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
		{:else}
			<P>{data.heading}</P>
			<P>{data.message}</P>
		{/if}
	</Card>
</div>

<SuperDebug data={$form} />
