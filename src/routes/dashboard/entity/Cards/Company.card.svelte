<script lang="ts">
	export let selectedStructureItem;
</script>

<p>Title: {selectedStructureItem.title}</p>
<p>
	Description: {selectedStructureItem.description === null
		? 'No description'
		: selectedStructureItem.description}
</p>
<p>
	Logo:
	<img src={selectedStructureItem.logo} alt={selectedStructureItem.title} />
</p>
<p>
	BIN:
	{selectedStructureItem.BIN}
</p>
<p>address: {selectedStructureItem.address}</p>
<p>
	Contact:
	{selectedStructureItem.contact}
</p>
