<script lang="ts">
	/**
	 * Scroll HUD Component
	 * Tracks system position and provides high-speed navigation.
	 */
	const sectors = [
		{ id: 'hero', label: 'HERO' },
		{ id: 'projects', label: 'PROJECT' },
		{ id: 'tech-stack', label: 'TECH_STACK' },
		{ id: 'contact', label: 'CONTACT' }
	];

	let activeSector = 'hero';
	let scrollY = 0;

	// Reactivity: Monitors scrollY to update the active sector based on viewport position
	$: if (typeof document !== 'undefined' && scrollY !== undefined) {
		sectors.forEach((sector) => {
			const el = document.getElementById(sector.id);
			if (el) {
				const rect = el.getBoundingClientRect();
				// Detects section presence near the upper-middle of the screen (300px offset)
				if (rect.top <= 300 && rect.bottom >= 300) {
					activeSector = sector.id;
				}
			}
		});
	}

	/**
	 * Smoothly transitions the viewport to the target system sector.
	 */
	function scrollTo(id: string) {
		const el = document.getElementById(id);
		if (el) {
			el.scrollIntoView({ behavior: 'smooth' });
		}
	}
</script>

<svelte:window bind:scrollY />

<nav
	class="fixed top-1/2 right-8 z-50 hidden -translate-y-1/2 flex-col items-end gap-8 xl:flex"
	aria-label="System Navigation"
>
	{#each sectors as sector (sector.id)}
		<button
			on:click={() => scrollTo(sector.id)}
			type="button"
			class="group flex items-center gap-4 transition-all duration-300 outline-none"
		>
			<span
				class="font-mono text-[9px] tracking-[0.2em] uppercase transition-all duration-300
        {activeSector === sector.id
					? 'text-amber-500 opacity-100'
					: 'text-slate-500 opacity-0 group-hover:opacity-100'}"
			>
				{sector.label}
			</span>

			<div class="relative flex items-center justify-center">
				<div
					class="h-1.5 w-1.5 rounded-full transition-all duration-500
          {activeSector === sector.id
						? 'scale-125 bg-amber-500 shadow-[0_0_8px_#f59e0b]'
						: 'bg-slate-400 group-hover:bg-amber-400 dark:bg-slate-700'}"
				></div>

				{#if activeSector === sector.id}
					<div class="absolute inset-0 h-1.5 w-1.5 animate-ping rounded-full bg-amber-500"></div>
					<div class="absolute -left-2 h-[1px] w-4 bg-amber-500/30"></div>
				{/if}
			</div>
		</button>
	{/each}

	<div
		class="absolute top-0 right-[3px] bottom-0 -z-10 w-[1px] bg-slate-200 dark:bg-slate-800"
	></div>
</nav>

<style>
	/* Ensure smooth scrolling even if global CSS is missing it */
	:global(html) {
		scroll-behavior: smooth;
	}
</style>
