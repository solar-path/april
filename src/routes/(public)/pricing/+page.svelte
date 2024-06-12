<script>
	import { Card, Button, Heading, P, A, Hr } from 'flowbite-svelte';
	import { CheckCircleSolid } from 'flowbite-svelte-icons';
</script>

<div class="flex flex-col items-center justify-center space-y-8">
	<P class="text-5xl font-bold">Pricing</P>

	<P>
		<A href="aneko.io">Aneko.io</A> available for FREE in technical preview.
	</P>

	<div class="flex w-full justify-center space-x-8">
		<Card class="flex-grow" size="sm" padding="xl">
			<h5 class="mb-4 text-center text-xl font-medium text-gray-500 dark:text-gray-400">
				Standard plan
			</h5>
			<div class="flex items-baseline justify-center text-gray-900">
				<div class="w-full text-center">
					<div class="flex flex-col items-center justify-center">
						<P class="text-5xl font-extrabold tracking-tight line-through">$10</P>
						<P class="text-5xl font-extrabold tracking-tight text-primary-700">FREE</P>
					</div>
					<div class="flex justify-center">
						<P class="ms-1 text-xl font-normal text-gray-500 dark:text-gray-400"
							>per user / per month</P
						>
					</div>
				</div>
			</div>
			<!-- List -->
			<ul class="my-7 space-y-4">
				<li class="flex space-x-2 rtl:space-x-reverse">
					<CheckCircleSolid class="h-4 w-4 text-primary-600 dark:text-primary-500" />
					<span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
						Unlimited users
					</span>
				</li>
				<li class="flex space-x-2 rtl:space-x-reverse">
					<CheckCircleSolid class="h-4 w-4 text-primary-600 dark:text-primary-500" />
					<span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
						1GB Cloud storage
					</span>
				</li>
			</ul>
			<Button class="w-full" href="/auth/register">Select plan</Button>
		</Card>

		<!-- <Card class="flex-grow" size="sm" padding="xl">
			<h5 class="mb-4 text-center text-xl font-medium text-gray-500 dark:text-gray-400">
				Support us
			</h5>
			<P class="text-center text-gray-500">
				Aneko is a non-profit project. If you want to support us, you can donate to our Github
				Sponsor.
			</P>
			<Button class="w-full">Donate</Button>
		</Card> -->
	</div>
</div>
