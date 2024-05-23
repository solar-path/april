<script lang="ts">
	import { hideDrawer } from '$lib/components/Drawer/drawer.utlities';
	import SuperDebug, { superForm, type FormResult } from 'sveltekit-superforms';
	import DisplayFormErrors from '$lib/components/DisplayFormErrors.svelte';
	import { Button, Input, Label, Textarea } from 'flowbite-svelte';
	import { Editor } from '@tadashi/svelte-editor-quill';

	interface PostData {
		item?: {
			id: string;
			title: string;
			content: string;
			coverImange: string;
			parentId: string;
			parent: string;
			status: string;
			readingFor: string;
		};
		postForm: {
			data: any;
		};
		postList: any[];
	}
	export let data: PostData;

	const { form, errors, constraints, enhance } = superForm(
		data.item && data.item != null
			? {
					...data.postForm.data,
					id: data.item.id,
					title: data.item.title,
					content: data.item.content,
					coverImange: data.item.coverImange,
					parentId: data.item.parentId,
					parent: data.item.parent,
					status: data.item.status,
					readingFor: data.item.readingFor
				}
			: data.postForm.data,
		{
			onResult(event) {
				const result = event.result as FormResult<any>;
				if (result.type === 'success') {
					$hideDrawer = !$hideDrawer;
				}
			}
		}
	);

	const options = {
		theme: 'snow'
	};

	let WysiwygData = 'Apenas <b>um</b> show';
	let text = '';
	let html = '';

	const onTextChange = (event) => {
		({ text, html } = event?.detail ?? {});
		WysiwygData = html;
	};
</script>

<svelte:head>
	<link rel="stylesheet" href="https://unpkg.com/quill@2.0.2/dist/quill.snow.css" crossorigin />
</svelte:head>

<form
	use:enhance
	class="space-y-2"
	novalidate
	method="POST"
	action={data.item && data.item != null ? '/admin/blog?/updatePost' : '/admin/blog?/createPost'}
>
	<input type="hidden" name="id" bind:value={$form.id} />

	<div class="w-full">
		<Label for="title">Title</Label>
		<Input id="title" type="text" name="title" bind:value={$form.title} {...$constraints.title} />
		<DisplayFormErrors errors={$errors.title} />
	</div>

	<div class="w-full">
		<Label for="content">Content</Label>
		<Editor {options} {WysiwygData} on:text-change={onTextChange} />
		<!-- <Textarea name="content" bind:value={$form.content} {...$constraints.content} /> -->
		<DisplayFormErrors errors={$errors.content} />
	</div>

	<Button type="submit" class="w-full">Add</Button>
</form>

<SuperDebug data={$form} />
