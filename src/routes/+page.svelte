<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, scale, blur } from 'svelte/transition';
	import Terminal from '$lib/components/Terminal.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import TechStack from '$lib/components/TechStack.svelte';
	import ScrollHud from '$lib/components/ScrollHud.svelte';
	import ParticleSystem from '$lib/components/ParticleSystem.svelte';
	import resume from '../lib/assets/resume.pdf';
	import { projects } from '$lib/projects';
	import { decipher } from '$lib/actions/decipher';

	let isLoaded = false;
	onMount(() => {
		isLoaded = true;
	});

	const firstName = 'Jason';
	const lastName = 'CHUKWUEBUKA';
</script>

{#if isLoaded}
	<main
		class="relative min-h-screen overflow-x-hidden bg-slate-50 transition-colors duration-700 dark:bg-[#020617]"
	>
		<div class="pointer-events-none fixed inset-0 z-0">
			<div
				class="animate-scan absolute top-0 h-[1px] w-full bg-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.4)]"
			></div>
			<div
				class="absolute inset-0 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:45px_45px] opacity-[0.03] dark:opacity-[0.06]"
			></div>
			<div
				class="absolute top-1/2 left-1/4 h-[500px] w-[500px] -translate-y-1/2 animate-pulse rounded-full bg-amber-500/5 blur-[120px]"
			></div>
		</div>

		<section
			class="relative z-10 flex min-h-screen items-center justify-center px-6 py-20 lg:px-16"
		>
			<div class="container mx-auto">
				<div class="grid grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-8">
					<div class="space-y-10 lg:col-span-7">
						<div in:fly={{ x: -20, duration: 800 }} class="flex items-center gap-3">
							<span class="relative flex h-2 w-2">
								<span
									class="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"
								></span>
								<span class="relative inline-flex h-2 w-2 rounded-full bg-amber-500"></span>
							</span>
							<span
								class="font-mono text-[10px] tracking-[0.4em] text-slate-500 uppercase dark:text-slate-400"
							>
								Mayicodes
							</span>
						</div>

						<div class="space-y-4">
							<h1
								in:fly={{ y: 30, duration: 1000, delay: 200 }}
								class="  text-5xl md:text-6xl leading-[0.85] font-black tracking-tighter text-slate-900 uppercase lg:text-8xl dark:text-white"
							>
								{firstName} <br />
								<span
									class="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent"
									>{lastName}</span
								>
							</h1>

							<p
								in:fly={{ y: 30, duration: 1000, delay: 400 }}
								class="max-w-lg text-lg leading-relaxed font-light text-slate-600 dark:text-slate-400"
							>
								<span
									class="font-bold text-slate-900 underline decoration-amber-500/30 dark:text-white"
									>Automation Engineer</span
								>
								&&
								<span class="text-slate-900 dark:text-white">Frontend Architect.</span>
								Specializing in high-performance web systems and scalable UI architecture. I build industrial-grade
								digital experiences with a focus on technical precision and robust, future-proof logic.
							</p>
						</div>

						<div
							in:fly={{ y: 30, duration: 1000, delay: 600 }}
							class="flex flex-col items-start gap-8 sm:flex-row sm:items-center"
						>
							<div class="flex gap-4">
								<a
									href="#projects"
									class="group relative overflow-hidden bg-slate-900 px-8 py-4 text-[10px] font-bold tracking-widest text-white uppercase transition-all dark:bg-white dark:text-black"
								>
									<span
										class="relative z-10 uppercase transition-colors group-hover:text-black dark:group-hover:text-white"
										>Explore_Works</span
									>
									<div
										class="absolute inset-0 translate-y-full bg-amber-500 transition-transform duration-300 group-hover:translate-y-0"
									></div>
								</a>
								<a
									href={resume}
									download="Obianyor_Chukwuebuka_Resume.pdf"
									rel="external"
									class="border border-slate-300 px-8 py-4 text-[10px] font-bold tracking-widest text-slate-900 uppercase transition-colors hover:border-amber-500 dark:border-slate-800 dark:text-white"
								>
									Resume
								</a>
							</div>

							<div class="flex items-center gap-5 text-slate-400">
								<a
									href="https://github.com/JasonChukwuebuka01"
									target="_blank"
									rel="noopener noreferrer"
									class="font-mono text-[9px] tracking-widest uppercase transition-colors hover:text-amber-500"
									>Github</a
								>
								<a
									href="https://www.linkedin.com/in/chukwuebuka-obianyor-4055b527a"
									class="font-mono text-[9px] tracking-widest uppercase transition-colors hover:text-amber-500"
									>LinkedIn</a
								>
							</div>
						</div>
					</div>

					<div in:scale={{ start: 0.98, duration: 1000, delay: 800 }} class="lg:col-span-5">
						<div class="group relative">
							<div
								class="absolute -inset-1 rounded-xl bg-amber-500/10 blur-xl transition-all duration-500 group-hover:bg-amber-500/20"
							></div>
							<div in:blur={{ duration: 800 }}>
								<Terminal
									commands={{
										help: 'Available commands: help, about, projects, contact, clear',
										about: 'I am a passionate Automation Engineer and Frontend Architect...',
										projects: 'Check out the Projects section below to see my selected works.',
										contact: 'Feel free to reach out via the Contact section at the bottom.'
									}}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<TechStack {decipher} />

		<section
			id="projects"
			class="relative z-10 border-t border-slate-200 bg-white px-6 py-32 dark:border-slate-800 dark:bg-[#020617]"
		>
			<div class="container mx-auto max-w-6xl">
				<div
					class="mb-20 flex items-end justify-between border-b border-slate-100 pb-10 dark:border-slate-900"
				>
					<div class="space-y-1">
						<h2
							use:decipher={{ text: 'SYSTEM_MANIFEST', duration: 800 }}
							class="font-mono text-[10px] tracking-[0.5em] text-amber-500 uppercase"
						>
							SYSTEM_MANIFEST
						</h2>
						<p
							use:decipher={{ text: 'SELECTED_PROJECTS', duration: 1500, delay: 300 }}
							class="text-4xl font-black tracking-tighter text-slate-900 uppercase lg:text-6xl dark:text-white"
						>
							SELECTED_PROJECTS
						</p>
					</div>

					<div class="hidden md:block">
						<a
							href="https://github.com/JasonChukwuebuka01  "
							target="_blank"
							rel="noopener noreferrer"
							class="group flex flex-col items-end gap-2 font-mono text-[10px] tracking-widest no-underline"
						>
							<span class="text-slate-400 uppercase transition-colors group-hover:text-amber-500">
								Access_Full_Archive
							</span>
							<div class="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
								<span class="uppercase">View_More_on_Github</span>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2.5"
									stroke-linecap="round"
									stroke-linejoin="round"
									class="transition-transform duration-300 group-hover:translate-x-1 group-hover:text-amber-500"
								>
									<path d="M5 12h14m-7-7 7 7-7 7" />
								</svg>
							</div>
						</a>
					</div>
				</div>

				<div class="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
					{#each projects as project, i (project.title)}
						<div in:fly={{ y: 40, duration: 800, delay: i * 150 }} class="h-auto">
							<ProjectCard {project} />
						</div>
					{/each}
				</div>
			</div>
		</section>
		<Contact {decipher} />
		<ScrollHud />
		<ParticleSystem count={600} />
	</main>
{/if}

<style>
	@keyframes scan {
		0% {
			top: -5%;
			opacity: 0;
		}
		20% {
			opacity: 1;
		}
		80% {
			opacity: 1;
		}
		100% {
			top: 105%;
			opacity: 0;
		}
	}

	.animate-scan {
		animation: scan 10s linear infinite;
	}

	:global(html) {
		scroll-behavior: smooth;
		cursor: crosshair;
	}
</style>
