<script lang="ts">
	import DisplayFormErrors from '$lib/components/DisplayFormErrors.svelte';
	import { Input, Label } from 'flowbite-svelte';
	import { superForm } from 'sveltekit-superforms';

	interface ProfileData {
		name: string;
		surname: string;
		gender: string;
		dob: Date;
	}
	export let data: ProfileData;

	const { form, errors, constraints, enhance } = superForm(
		data.item && data.item !== null
			? {
					...data.companyForm.data,
					id: data.item.id,
					title: data.item.title,
					description: data.item.description,
					// logo: data.item.logo,
					logo: '',
					type: data.item.type,
					regionId: data.item.regionId,
					region: data.regionList.find((item) => item.id === data?.item?.regionId)?.title,
					workspaceId: data.item.workspaceId,
					workspace: data.workspaceList.find((item) => item.id === data?.item?.workspaceId)?.title,
					industryId: data.item.industryId,
					industry: data.industryList.find((item) => item.id === data?.item?.industryId)?.title,
					BIN: data.item.BIN
				}
			: {
					...data.companyForm.data,
					workspaceId: data.workspaceList.find((item) => item.slug === $page.params.slug)?.id,
					workspace: data.workspaceList.find((item) => item.slug === $page.params.slug)?.title
				},
		{
			dataType: 'json',
			onResult(event) {
				const result = event.result as FormResult<any>;
				if (result.type === 'success') {
					$hideDrawer = !$hideDrawer;
				}
			}
		}
	);
</script>

<div class="w-full">
	<Label for="name">Name</Label>
	<Input id="name" type="text" name="name" bind:value={$form.name} {...$constraints.name} />
	<DisplayFormErrors errors={$errors.name} />
</div>

<div class="w-full">
	<Label for="surname">Lastname</Label>
	<Input
		id="surname"
		type="text"
		name="surname"
		bind:value={$form.surname}
		{...$constraints.surname}
	/>
	<DisplayFormErrors errors={$errors.surname} />
</div>
