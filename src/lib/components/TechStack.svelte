<script lang="ts">
	import { type Action } from 'svelte/action';
	export let decipher: Action<HTMLElement, any>;

	const skills = [
		'SvelteKit',
		'Next.js',
		'TypeScript',
		'React',
		'Vue.js',
		'JavaScript',
		'TailwindCSS',
		'HTML5',
		'Node.js',
		'PostgreSQL',
		'Prisma',
		'Framer Motion',
		'Zustand',
		'Three.js'
	];
</script>

<section
	id="tech-stack"
	class="relative overflow-hidden border-y border-slate-100 bg-white px-6 py-20 dark:border-slate-900 dark:bg-[#020617]"
>
	<div class="pointer-events-none absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.07]">
		<div
			class="h-full w-full bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,1)_50%)] bg-[length:100%_4px]"
		></div>
	</div>

	<div class="relative z-10 container mx-auto max-w-5xl">
		<div class="flex flex-col items-start justify-between gap-12 lg:flex-row lg:items-center">
			<div class="w-full space-y-2 lg:w-1/3">
				<h2
					use:decipher={{ text: 'TECH_STACK', duration: 800 }}
					class="font-mono text-[10px] tracking-[0.5em] text-amber-500 uppercase"
				>
					TECH_STACK
				</h2>
				<h3
					use:decipher={{ text: 'SYSTEM_CORE', duration: 1000, delay: 200 }}
					class="text-4xl font-black tracking-tighter text-slate-900 uppercase dark:text-white"
				>
					SYSTEM_CORE
				</h3>
			</div>

			<div class="flex w-full flex-wrap justify-start gap-x-4 gap-y-6 lg:w-2/3 lg:justify-end">
				{#each skills as skill, i}
					<div class="group flex cursor-crosshair items-center">
						<span
							class="-translate-x-2 font-mono text-amber-500 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
						>
							[
						</span>

						<span
							class="relative px-1 font-mono text-sm font-medium tracking-tight text-slate-500 transition-colors duration-300 group-hover:text-slate-900 md:text-base dark:text-slate-400 dark:group-hover:text-white"
						>
							{skill}
							<span
								class="absolute -bottom-1 left-0 h-[0.5px] w-0 bg-amber-500 shadow-[0_0_10px_#f59e0b] transition-all duration-500 group-hover:w-full"
							></span>
						</span>

						<span
							class="translate-x-2 font-mono text-amber-500 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
						>
							]
						</span>

						{#if i !== skills.length - 1}
							<span
								class="ml-4 h-4 w-[1px] rotate-[25deg] bg-slate-200 transition-opacity group-hover:opacity-0 dark:bg-slate-800"
							></span>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
