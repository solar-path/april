<script lang="ts">
	import DisplayFormErrors from '$lib/components/DisplayFormErrors.svelte';
	import { Avatar, Button, Input, Label, Select } from 'flowbite-svelte';
	import SuperDebug, { superForm, type FormResult } from 'sveltekit-superforms';
	import { hideDrawer } from '$lib/components/Drawer/drawer.utlities';

	interface ProfileData {
		user?: {
			id?: string;
			name: string;
			surname: string;
			gender: string;
			dob: Date;
			avatar: any;
			phone: string;
			addressLine: string;
			zipcode: string;
			state: string;
			city: string;
			country: string;
			idNumber: string;
		};
		profileForm: {
			data: any;
		};
	}
	export let data: ProfileData;

	const { form, errors, constraints, enhance } = superForm(
		{
			...data.profileForm.data,
			id: data.user?.id,
			name: data.user?.name,
			surname: data.user?.surname,
			gender: data.user?.gender,
			dob: data.user?.dob,
			avatar: null,
			phone: data.user?.phone,
			addressLine: data.user?.addressLine,
			zipcode: data.user?.zipcode,
			state: data.user?.state,
			city: data.user?.city,
			country: data.user?.country,
			idNumber: data.user?.idNumber
		},
		{
			onResult(event) {
				const result = event.result as FormResult<any>;
				if (result.type === 'success') {
					$hideDrawer = !$hideDrawer;
				}
			}
		}
	);

	let genderTypes = [
		{ name: 'Male', value: 'Male' },
		{ name: 'Female', value: 'Female' },
		{ name: 'Other', value: 'Other' }
	];
</script>

<form
	use:enhance
	novalidate
	method="POST"
	class="flex flex-col space-y-2"
	enctype="multipart/form-data"
>
	<input type="hidden" name="id" bind:value={$form.id} />

	<div class="w-full">
		<Label for="avatar">Avatar</Label>
		{#if data.user && data.user != null && data.user.avatar != null}
			<Avatar src={data.user.avatar} size="xl" class="mx-auto" />
		{/if}
		<Input
			id="avatar"
			type="file"
			name="avatar"
			accept="image/png, image/jpeg, image/jpg"
			bind:value={$form.avatar}
			{...$constraints.avatar}
		/>
		<DisplayFormErrors errors={$errors.avatar} />
	</div>

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

	<div class="w-full">
		<Label for="dob">DoB</Label>
		<Input id="dob" type="date" name="dob" bind:value={$form.dob} {...$constraints.dob} />
		<DisplayFormErrors errors={$errors.dob} />
	</div>

	<div>
		<Label for="gender">Sex</Label>
		<Select
			id="gender"
			name="gender"
			items={genderTypes}
			bind:value={$form.gender}
			{...$constraints.gender}
		/>
		<DisplayFormErrors errors={$errors.type} />
	</div>

	<div class="w-full">
		<Label for="phone">Phone</Label>
		<Input id="phone" type="text" name="phone" bind:value={$form.phone} {...$constraints.phone} />
		<DisplayFormErrors errors={$errors.phone} />
	</div>

	<div class="w-full">
		<Label for="addressLine">Address</Label>
		<Input
			id="addressLine"
			type="text"
			name="addressLine"
			bind:value={$form.addressLine}
			{...$constraints.addressLine}
		/>
		<DisplayFormErrors errors={$errors.addressLine} />
	</div>

	<div class="w-full">
		<Label for="zipcode">Post code</Label>
		<Input
			id="zipcode"
			type="text"
			name="zipcode"
			bind:value={$form.zipcode}
			{...$constraints.zipcode}
		/>
		<DisplayFormErrors errors={$errors.zipcode} />
	</div>

	<div class="w-full">
		<Label for="state">State</Label>
		<Input id="state" type="text" name="state" bind:value={$form.state} {...$constraints.state} />
		<DisplayFormErrors errors={$errors.state} />
	</div>

	<div class="w-full">
		<Label for="city">City</Label>
		<Input id="city" type="text" name="city" bind:value={$form.city} {...$constraints.city} />
		<DisplayFormErrors errors={$errors.city} />
	</div>

	<div class="w-full">
		<Label for="country">Country</Label>
		<Input
			id="country"
			type="text"
			name="country"
			bind:value={$form.country}
			{...$constraints.country}
		/>
		<DisplayFormErrors errors={$errors.country} />
	</div>

	<div class="w-full">
		<Label for="idNumber">ID Number</Label>
		<Input
			id="idNumber"
			type="text"
			name="idNumber"
			bind:value={$form.idNumber}
			{...$constraints.idNumber}
		/>
		<DisplayFormErrors errors={$errors.idNumber} />
	</div>

	<Button type="submit" class="w-full">Update</Button>
</form>

<SuperDebug data={$form} />
