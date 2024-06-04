<script lang="ts">
	export let selectedStructureItem;
</script>

<p>Title: {selectedStructureItem.title}</p>
<p>
	Description: {selectedStructureItem.description === null
		? 'No description'
		: selectedStructureItem.description}
</p>
