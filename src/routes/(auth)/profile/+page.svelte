<script lang="ts">
	import { fillDrawer } from '$lib/components/Drawer/drawer.utlities';
	import { Avatar, Heading, Hr, P } from 'flowbite-svelte';
	import {
		EditOutline,
		EnvelopeOutline,
		UserOutline,
		PhoneOutline,
		MapPinAltOutline,
		FingerprintOutline
	} from 'flowbite-svelte-icons';
	import Profile from './profile.form.svelte';
	export let data: any;

	console.log('profile :: data => ', data);

	$: user = data.user;
	$: age = new Date().getFullYear() - new Date(user.dob).getFullYear();
</script>

<div class="flex flex-row">
	<div class="flex w-96 flex-col space-y-4 rounded-lg bg-primary-700 p-6">
		<button class="ml-auto text-white" on:click={() => fillDrawer('Personal info', Profile, data)}>
			<EditOutline />
		</button>
		<Avatar src={user.avatar} size="xl" class="mx-auto" />
		<Heading tag="h3" class="text-center text-white">{user.name} {user.surname}</Heading>
		<P class="text-center text-white">{new Date(user.dob).toLocaleDateString()} ({age})</P>
		<Hr />
		<P class="flex items-center text-white"
			><MapPinAltOutline class="mr-2" />
			{user.addressLine}, {user.city}, {user.state}, {user.zipcode}, {user.country}</P
		>
		<P class="flex items-center text-white"><EnvelopeOutline class="mr-2" /> {user.email}</P>
		<P class="flex items-center text-white"><PhoneOutline class="mr-2" /> {user.phone}</P>

		<Hr />
		<P class="flex items-center text-white"><UserOutline class="mr-2" />Sex: {user.gender}</P>
		<P class="flex items-center text-white"
			><FingerprintOutline class="mr-2" />ID number: {user.idNumber}</P
		>
	</div>
</div>
