<script lang="ts">
	import { fillDrawer } from '$lib/components/Drawer/drawer.utlities';
	import { Avatar, Heading, Hr, P } from 'flowbite-svelte';
	import {
		EditOutline,
		EnvelopeOutline,
		LinkOutline,
		PhoneOutline,
		MapPinAltOutline
	} from 'flowbite-svelte-icons';
	import Bio from './bio.form.svelte';
	export let data: any;

	console.log('profile :: data => ', data);

	$: user = data.user;
	$: age = new Date().getFullYear() - new Date(user.dob).getFullYear();
</script>

<div class="flex flex-row">
	<div class="flex w-96 flex-col space-y-2 rounded-lg bg-primary-700 p-6">
		<button class="ml-auto text-white" on:click={() => fillDrawer('Personal info', Bio, data)}>
			<EditOutline />
		</button>
		<Avatar src={user.avatar} size="xl" class="mx-auto" />
		<Heading tag="h3" class="text-center text-white">{user.name} {user.surname}</Heading>
		<P class="text-center text-white">{new Date(user.dob).toLocaleDateString()} ({age})</P>
		<Hr />
		<P class="flex items-center text-white"
			><MapPinAltOutline class="mr-2" /> {user.city}, {user.country}</P
		>
		<P class="flex items-center text-white"><EnvelopeOutline class="mr-2" /> {user.email}</P>
		<P class="flex items-center text-white"><PhoneOutline class="mr-2" /> {user.phone}</P>

		<Hr />
		<P class="flex items-center text-white">Sex: {user.gender}</P>
	</div>
</div>
