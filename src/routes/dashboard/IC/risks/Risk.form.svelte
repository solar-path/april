<script lang="ts">
	import DisplayFormErrors from '$lib/components/DisplayFormErrors.svelte';
	import { hideDrawer } from '$lib/components/Drawer/drawer.utlities';
	import { Button, Input, Label } from 'flowbite-svelte';
	import { superForm, type FormResult } from 'sveltekit-superforms';

	interface RiskData {
		item?: {
			id: string;
			title: string;
		};
		riskForm: {
			data: any; // Define more specifically if possible
		};
	}
	export let data: RiskData;

	const { form, errors, constraints, enhance } = superForm(
		data.item && data.item !== null
			? { ...data.riskForm.data, id: data.item.id, title: data.item.title }
			: data.riskForm.data,
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
	action={data.item && data.item !== null
		? '/dashboard/IC/risks?/updateRisk'
		: '/dashboard/IC/risks?/createRisk'}
	class="flex flex-col space-y-2"
>
	<input type="hidden" name="id" bind:value={$form.id} />

	<div class="w-full">
		<Label for="title">Risk</Label>
		<Input id="title" type="text" name="title" bind:value={$form.title} {...$constraints.title} />
		<DisplayFormErrors errors={$errors.title} />
	</div>

	<Button type="submit" class="w-full">Identify</Button>
</form>
