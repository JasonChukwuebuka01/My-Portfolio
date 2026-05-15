<script lang="ts">
	import './layout.css';
	import { onMount } from 'svelte';

	// State for theme
	let isDark = true;

	onMount(() => {
		const savedTheme = localStorage.getItem('myTheme');
		isDark = savedTheme ? savedTheme === 'dark' : true;
		applyTheme();
	});

	function applyTheme() {
		if (isDark) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
		localStorage.setItem('myTheme', isDark ? 'dark' : 'light');
	}

	function toggleTheme() {
		isDark = !isDark;
		applyTheme();
	}
</script>

<div
	class="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-500 selection:bg-amber-500/30 dark:bg-black dark:text-amber-500"
>
	<!-- Slot renders the content of +page.svelte -->
	<slot />

	<!-- Global Theme Toggle (Positioned fixed) -->
	<button
		on:click={toggleTheme}
		class="fixed right-6 bottom-6 rounded-full border border-current p-3 transition-all hover:bg-current hover:text-black"
		aria-label="Toggle Theme"
	>
		{isDark ? '☀' : '🌙'}
	</button>
</div>
