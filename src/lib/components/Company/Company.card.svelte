<script lang="ts">
	import DeleteButton from '$lib/components/DeleteButton.svelte';
	import { fillDrawer } from '$lib/components/Drawer/drawer.utlities';
	import { A, Button, Heading, Hr, ImagePlaceholder, ListPlaceholder, P } from 'flowbite-svelte';
	import { EditOutline } from 'flowbite-svelte-icons';
	import Company from './Company.form.svelte';
	// import Address from './Address.form.svelte';
	// import Contact from './Contact.form.svelte';

	export let selectedStructureItem;
	export let data;
</script>

<div class="flex">
	<div>
		<Heading tag="h4">Unit details (Legal entity):</Heading>
	</div>
	<div class="ml-auto flex flex-row justify-end space-x-2">
		<Button
			outline={true}
			class="h-9 w-10 !p-2"
			size="xs"
			on:click={() => fillDrawer('Edit company', Company, { ...data, item: selectedStructureItem })}
		>
			<EditOutline class="h-4 w-6" /></Button
		>
		<DeleteButton
			path="/dashboard/entity?/deleteCompany"
			name={'id'}
			identifier={selectedStructureItem.id}
		/>
	</div>
</div>
<Hr classHr="my-2" />

<div class="flex flex-row">
	<div class="w-1/4">
		<strong class="font-semibold text-gray-900 dark:text-white">Logo: </strong>
		{#if selectedStructureItem.logo}
			<img src={selectedStructureItem.logo} alt={selectedStructureItem.title} class="w-96" />
		{:else}
			<ImagePlaceholder imgOnly class="mt-2" />
		{/if}
	</div>
	<div class="w-3/4">
		<strong class="font-semibold text-gray-900 dark:text-white">Title: </strong>
		<P class="mb-3" weight="light" color="text-gray-500 dark:text-gray-400"
			>{selectedStructureItem.title}</P
		>
		<strong class="font-semibold text-gray-900 dark:text-white">Description: </strong>
		<P class="mb-3" weight="light" color="text-gray-500 dark:text-gray-400">
			{selectedStructureItem.description === null
				? 'No description'
				: selectedStructureItem.description}
		</P>

		<strong class="font-semibold text-gray-900 dark:text-white">BIN: </strong>
		<P class="mb-3" weight="light" color="text-gray-500 dark:text-gray-400">
			{selectedStructureItem.BIN}
		</P>
	</div>
</div>

<strong class="font-semibold text-gray-900 dark:text-white">Industry: </strong>
<P class="mb-3" weight="light" color="text-gray-500 dark:text-gray-400">
	{selectedStructureItem.industry.title}
</P>
<P class="mb-3" weight="light" color="text-gray-500 dark:text-gray-400">
	{selectedStructureItem.industry.description}
</P>

<div class="flex flex-row">
	<div class="w-1/2">
		<div class="flex">
			<div>
				<strong class="font-semibold text-gray-900 dark:text-white">Address: </strong>
			</div>
			<!-- <div class="flex flex-row space-x-2">
				<Button
					outline={true}
					class="h-9 w-10 !p-2"
					size="xs"
					on:click={() =>
						fillDrawer('Edit address', Address, { ...data, item: selectedStructureItem })}
				>
					<EditOutline class="h-4 w-6" /></Button
				>
				<DeleteButton
					path="/dashboard/address?/deleteAddress"
					name={'id'}
					identifier={selectedStructureItem.address.id}
				/>
			</div> -->
		</div>

		<P class="mb-3" weight="light" color="text-gray-500 dark:text-gray-400">
			{#if selectedStructureItem.address && selectedStructureItem.address.city !== null}
				<ul class="ml-4">
					<li>City: {selectedStructureItem.address.city}</li>
					<li>State: {selectedStructureItem.address.state}</li>
					<li>Postcode: {selectedStructureItem.address.zipcode}</li>
					<li>Address line: {selectedStructureItem.address.addressLine}</li>
					<li>Country: {selectedStructureItem.address.countryName}</li>
				</ul>
			{:else}
				<ListPlaceholder />
			{/if}
		</P>
	</div>
	<div class="w-1/2">
		<div class="flex">
			<div>
				<strong class="font-semibold text-gray-900 dark:text-white">Contact: </strong>
			</div>
			<!-- <div class="flex flex-row space-x-2">
				<Button
					outline={true}
					class="h-9 w-10 !p-2"
					size="xs"
					on:click={() =>
						fillDrawer('Edit address', Contact, { ...data, item: selectedStructureItem })}
				>
					<EditOutline class="h-4 w-6" /></Button
				>
				<DeleteButton
					path="/dashboard/address?/deleteAddress"
					name={'id'}
					identifier={selectedStructureItem.address.id}
				/>
			</div> -->
		</div>

		<P class="mb-3" weight="light" color="text-gray-500 dark:text-gray-400">
			{#if selectedStructureItem.contact}
				<ul class="ml-4">
					<li>
						Email: <A href={`mailto:${selectedStructureItem.contact.email}`}
							>{selectedStructureItem.contact.email}</A
						>
					</li>
					<li>
						Phone: <A href={`tel:${selectedStructureItem.contact.phone}`}
							>{selectedStructureItem.contact.phone}</A
						>
					</li>
					<li>
						Website: <A href={selectedStructureItem.contact.website} target="_blank"
							>{selectedStructureItem.contact.website}</A
						>
					</li>
				</ul>
			{:else}
				<ListPlaceholder />
			{/if}
		</P>
	</div>
</div>
