<script lang="ts">
	import DisplayFormErrors from '$lib/components/DisplayFormErrors.svelte';
	import { hideDrawer } from '$lib/components/Drawer/drawer.utlities';
	import { Button, Input, Label } from 'flowbite-svelte';
	import SuperDebug, { superForm, type FormResult } from 'sveltekit-superforms';

	interface PositionData {
		item?: {
			id: string;
			title: string;
			departmentId: string;
			department: string;
			companyId: string;
			company: string;
		};
		positionForm: {
			data: any;
		};
	}

	export let data: PositionData;

	const { form, errors, constraints, enhance } = superForm(
		data.item && data.item !== null
			? {
					...data.positionForm.data,
					id: data.item.id,
					title: data.item.title,
					departmentId: data.item.departmentId,
					department: data.item.department,
					companyId: data.item.companyId,
					company: data.item.company
				}
			: data.positionForm.data,
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
		? '/dashboard/entity/updatePosition'
		: '/dashboard/entity/createPosition'}
	class="flex flex-col space-y-2"
>
	<input type="hidden" name="id" bind:value={$form.id} />

	<div class="w-full">
		<Label for="title">Position title</Label>
		<Input id="title" type="text" name="title" bind:value={$form.title} {...$constraints.title} />
		<DisplayFormErrors errors={$errors.title} />
	</div>

	<Button type="submit" class="w-full">Add</Button>
</form>
<SuperDebug data={$form} />
