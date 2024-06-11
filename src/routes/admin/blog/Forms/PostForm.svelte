<script lang="ts">
	import { hideDrawer } from '$lib/components/Drawer/drawer.utlities';
	import SuperDebug, { superForm, type FormResult } from 'sveltekit-superforms';
	import DisplayFormErrors from '$lib/components/DisplayFormErrors.svelte';
	import { Button, Input, Label, Select } from 'flowbite-svelte';
	import { Editor } from '@tadashi/svelte-editor-quill';
	import SelectWithSearchTree from '$lib/components/SelectWithSearch/SelectWithSearchTree.svelte';

	interface PostData {
		item?: {
			id: string;
			title: string;
			content: string;
			coverImage: string;
			parentId: string;
			parent: string;
			status: string;
			readingFor: string;
		};
		postForm: {
			data: any;
		};
		postList: any[];
		postTree: any[];
	}
	export let data: PostData;

	const { form, errors, constraints, enhance } = superForm(
		data.item && data.item != null
			? {
					...data.postForm.data,
					id: data.item.id,
					title: data.item.title,
					content: data.item.content, // Ensure this is correctly initialized
					// coverImage: data.item.coverImage,
					coverImage: '',
					parentId: data.item.parentId,
					parent: data.item.parent,
					status: data.item.status,
					readingFor: data.item.readingFor
				}
			: data.postForm.data,
		{
			onSubmit: () => {
				console.log('Submitting');
			},
			onResult(event) {
				const result = event.result as FormResult<any>;
				if (result.type === 'success') {
					$hideDrawer = !$hideDrawer;
				}
			}
		}
	);

	let postContent = data.item && data.item != null ? data.item.content : '';

	const onTextChange = (event: any) => {
		const { html = '' } = event?.detail ?? {};
		postContent = html;
		$form.content = html; // Directly update the form state
	};
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://unpkg.com/quill@2.0.2/dist/quill.snow.css"
		crossorigin="anonymous"
	/>
</svelte:head>

<form
	use:enhance
	enctype="multipart/form-data"
	class="space-y-2"
	novalidate
	method="POST"
	action={data.item && data.item != null ? '/admin/blog?/updatePost' : '/admin/blog?/createPost'}
>
	<input type="hidden" name="id" bind:value={$form.id} />
	<input type="hidden" name="content" bind:value={$form.content} />
	<input type="hidden" name="parentId" bind:value={$form.parentId} />

	<div class="w-full">
		<Label for="title">Title</Label>
		<Input id="title" type="text" name="title" bind:value={$form.title} {...$constraints.title} />
		<DisplayFormErrors errors={$errors.title} />
	</div>

	<div class="w-full">
		<Label for="readingFor">Reading for</Label>

		<Select name="readingFor" bind:value={$form.readingFor} {...$constraints.readingFor}>
			<option value="guest">Guest</option>
			<option value="user">User</option>
			<option value="admin">Admin</option>
		</Select>

		<DisplayFormErrors errors={$errors.readingFor} />
	</div>

	<div class="w-full">
		<Label for="status">Status</Label>
		<Select name="status" bind:value={$form.status} {...$constraints.status}>
			<option value="published">Published</option>
			<option value="draft">Draft</option>
			<option value="archived">Archived</option>
		</Select>
	</div>

	<div class="w-full">
		<Label for="coverImage">Cover Image</Label>
		{#if data.item && data.item != null && data.item.coverImage != null}
			<img src={data.item.coverImage} alt="Cover of the post" />
		{/if}
		<Input
			id="coverImage"
			type="file"
			name="coverImage"
			accept="image/png, image/jpeg"
			bind:value={$form.coverImage}
			{...$constraints.coverImage}
		/>
		<DisplayFormErrors errors={$errors.coverImage} />
	</div>

	<div class="w-full">
		<SelectWithSearchTree
			list={data.postList}
			tree={data.postTree}
			form={$form}
			errors={$errors}
			constraints={$constraints}
			label="Post Tree"
			modalID="Posts"
			modalState={false}
			fieldName="parent"
			fieldId="parentId"
		/>
	</div>

	<div class="w-full">
		<Label for="content">Content</Label>
		<Editor
			name="content"
			options={{ theme: 'snow' }}
			data={postContent}
			on:text-change={onTextChange}
			{...$constraints.content}
		/>
		<DisplayFormErrors errors={$errors.content} />
	</div>

	<Button type="submit" class="w-full">Add</Button>
</form>

<SuperDebug data={$form} />
