<script lang="ts">
	import { page } from '$app/stores';
	import DisplayFormErrors from '$lib/components/DisplayFormErrors.svelte';
	import { hideDrawer } from '$lib/components/Drawer/drawer.utlities';
	import { Button, Input, Label } from 'flowbite-svelte';
	import { EnvelopeSolid } from 'flowbite-svelte-icons';
	import { superForm, type FormResult } from 'sveltekit-superforms/client';
	export let data: any;

	const { form, errors, constraints, enhance } = superForm(
		data === null ? {} : data.inviteUserForm.data,
		{
			onResult(event) {
				const result = event.result as FormResult<any>;
				result.type === 'success' ? ($hideDrawer = !$hideDrawer) : ($hideDrawer = false);
			}
		}
	);
</script>

<form
	use:enhance
	novalidate
	method="POST"
	class="flex flex-col space-y-2"
	action="/{$page.params.workspace}/users?/inviteUser"
>
	<div class="w-full">
		<Label for="email">Email</Label>
		<Input id="email" type="email" name="email" bind:value={$form.email} {...$constraints.email}>
			<EnvelopeSolid slot="left" class="h-6 w-6" />
		</Input>
		<DisplayFormErrors errors={$errors.email} />
	</div>
	<Button type="submit" class="w-full">Invite user</Button>
</form>
