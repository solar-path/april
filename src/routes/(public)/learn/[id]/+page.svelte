<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	$: post = data.post;
	// console.log('/learn/id :: data => ', data.post);
</script>

<article>
	{#if post}
		<h2
			class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
		>
			{post.title}
		</h2>
		{#if post.coverImage}
			<img src={post.coverImage} alt="cover_image" />
		{/if}
		<p class="italic">
			by {post.userEmail} - {post.createdAt.toLocaleString('en-GB', {
				timeZone: 'UTC'
			})}
		</p>
		<p class="mt-2 text-gray-500">{@html post?.content}</p>
	{/if}
</article>
