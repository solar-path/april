<script lang="ts">
	import DisplayFormErrors from '$lib/components/DisplayFormErrors.svelte';
	import { hideDrawer } from '$lib/components/Drawer/drawer.utlities';
	import { Button, Input, Label } from 'flowbite-svelte';
	import SuperDebug, { superForm, type FormResult } from 'sveltekit-superforms';

	interface RegionData {
		item?: {
			id: string;
			title: string;
		};
		workspaceForm: {
			data: any;
		};
	}

	export let data: RegionData;

	const { form, errors, constraints, enhance } = superForm(
		data.item && data.item !== null
			? {
					...data.workspaceForm.data,
					id: data.item.id,
					title: data.item.title
				}
			: data.workspaceForm.data,
		{
			onResult(event) {
				const result = event.result as FormResult<any>;
				if (result.type === 'success') {
					$hideDrawer = !$hideDrawer;
				}
			}
		}
	);
</script>

<form
	use:enhance
	novalidate
	method="POST"
	action={data.item ?? data.item !== null
		? '/dashboard/entity/updateWorkspace'
		: '/dashboard/entity/createWorkspace'}
	class="flex flex-col space-y-2"
>
	<input type="hidden" name="id" bind:value={$form.id} />

	<div class="w-full">
		<Label for="title">Workspace</Label>
		<Input
			id="title"
			type="text"
			name="workspace"
			bind:value={$form.workspace}
			{...$constraints.workspace}
		/>
		<DisplayFormErrors errors={$errors.workspace} />
	</div>
	<Button type="submit" class="w-full">Add</Button>
</form>
<SuperDebug data={$form} />
