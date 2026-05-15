<script lang="ts">
	import type { Project } from '$lib/projects';
	export let project: Project;

	let cardEl: HTMLElement;
	let rX = 0;
	let rY = 0;

	function handleMouse(e: MouseEvent) {
		if (!cardEl) return;
		const rect = cardEl.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		rY = ((x - rect.width / 2) / (rect.width / 2)) * 5;
		rX = ((y - rect.height / 2) / (rect.height / 2)) * -5;
	}

	function reset() {
		rX = 0;
		rY = 0;
	}
</script>

<div
	bind:this={cardEl}
	on:mousemove={handleMouse}
	on:mouseleave={reset}
	on:blur={reset}
	role="region"
	aria-label="Details for {project.title}"
	class="group relative z-10 h-full outline-none"
	style="perspective: 1000px;"
>
	<div
		class="flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 ease-out hover:border-amber-500/50 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900/50 dark:backdrop-blur-sm"
		style="transform: rotateX({rX}deg) rotateY({rY}deg);"
	>
		<div
			class="relative h-52 w-full overflow-hidden border-b border-slate-100 dark:border-slate-800"
		>
			<img
				src={project.image}
				alt="Preview of {project.title}"
				class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
			/>

			<div
				class="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] opacity-20"
			></div>

			<div
				class="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
			></div>

			<div
				class="absolute top-3 right-3 flex translate-y-2 gap-1.5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
			>
				{#each project.tags as tag}
					<span
						class="rounded-md bg-amber-500 px-2 py-0.5 font-mono text-[7px] font-bold text-black uppercase"
					>
						{tag}
					</span>
				{/each}
			</div>
		</div>

		<div class="flex flex-grow flex-col p-6">
			<div class="mb-4 flex items-center justify-between">
				<div class="flex items-center gap-2">
					<span class="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500"></span>
					<span class="font-mono text-[9px] tracking-[0.2em] text-slate-400 uppercase"
						>Archive_Ref: 0{project.id}</span
					>
				</div>
			</div>

			<h3
				class="mb-3 text-xl font-black tracking-tighter text-slate-900 uppercase transition-colors group-hover:text-amber-500 dark:text-white"
			>
				{project.title}
			</h3>

			<p
				class="mb-8 line-clamp-3 flex-grow text-xs leading-relaxed text-slate-500 dark:text-slate-400"
			>
				{project.description}
			</p>

			<div class="flex items-center gap-6 border-t border-slate-100 pt-5 dark:border-slate-800">
				<a
					href={project.liveLink}
					class="group/link flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase transition-colors hover:text-amber-500"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="14"
						height="14"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2.5"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
						><path d="M15 3h6v6" /><path d="M10 14 21 3" /><path
							d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
						/></svg
					>
					Live_Demo
				</a>

				<a
					href={project.githubLink}
					class="group/link flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase transition-colors hover:text-amber-500"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="14"
						height="14"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2.5"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="transition-transform group-hover/link:scale-110"
						><path
							d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
						/><path d="M9 18c-4.51 2-5-2-7-2" /></svg
					>
					Source
				</a>
			</div>
		</div>
	</div>
</div>
