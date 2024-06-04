<script lang="ts">
	import type { PageData } from '../$types';

	export let data: PageData;

	$: groupStructureTree = data.groupStructureTree;
	console.log(data);
</script>

<ul>
	{#each data.groupStructureTree as workspace}
		<li>{workspace.title}</li>
		<ul class="ml-4">
			{#each workspace.regions as region}
				<li>{region.title}</li>
				<ul class="ml-4">
					{#each region.companies as company}
						<li>{company.title}</li>
						<ul class="ml-4">
							{#each company.departments as department}
								<li>{department.title}</li>
								<ul class="ml-4">
									{#each department.positions as position}
										<li>{position.title}</li>
									{/each}
								</ul>
							{/each}
						</ul>
					{/each}
				</ul>
			{/each}
		</ul>
	{/each}
</ul>
