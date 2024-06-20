<!-- <script lang="ts">
	import { onMount } from 'svelte';
	import ApexCharts from 'apexcharts';
	import { page } from '$app/stores';

	export let data;

	console.log(data);

	let chart;

	onMount(() => {
		chart = new ApexCharts(document.querySelector('#riskKPI'), {
			chart: {
				type: 'bar'
			},
			series: [
				{
					name: 'sales',
					data: [30, 40, 45, 50, 49, 60, 70, 91, 125]
				}
			],
			xaxis: {
				categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
			}
		});

		chart.render();
	});
</script>

<div id="riskKPI" class="w-1/2"></div> -->
Internal control Dashboard page
