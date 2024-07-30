<script lang="ts">
	export let data;
	$: post = data.post;
	// console.log('/learn/id :: data => ', data.post);
</script>

<main class="bg-white pb-16 pt-8 antialiased dark:bg-gray-900 lg:pb-24 lg:pt-16">
	<div class="mx-auto flex max-w-screen-xl justify-between px-4">
		<article
			class="format format-sm sm:format-base lg:format-lg format-blue dark:format-invert mx-auto w-full max-w-2xl"
		>
			{#if post}
				<h2
					class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
				>
					{post.title}
				</h2>

				<p class="italic">
					by {post.userEmail} - {post.createdAt.toLocaleString('en-GB', {
						timeZone: 'UTC'
					})}
				</p>
				{#if post.coverImage}
					<div class="flex justify-center">
						<img src={post.coverImage} alt="cover_image" class="h-auto max-w-full rounded-lg" />
					</div>
				{/if}
				<p class="mt-2 text-gray-500">{@html post?.content}</p>
			{/if}
		</article>
	</div>
</main>
