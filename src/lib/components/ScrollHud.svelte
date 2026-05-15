<script lang="ts">
  import { onMount } from 'svelte';

  const sectors = [
    { id: 'hero', label: '01_UPLINK' },
    { id: 'projects', label: '02_MANIFEST' },
    { id: 'tech-stack', label: '03_CORE' },
    { id: 'contact', label: '04_COMM' }
  ];

  let activeSector = 'hero';
  let scrollY = 0;

  // Simple logic to detect which section is in view
  $: {
    if (typeof document !== 'undefined') {
      sectors.forEach(sector => {
        const el = document.getElementById(sector.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            activeSector = sector.id;
          }
        }
      });
    }
  }

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  }
</script>

<svelte:window bind:scrollY />

<nav class="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-8 items-end">
  {#each sectors as sector}
    <button 
      on:click={() => scrollTo(sector.id)}
      class="group flex items-center gap-4 transition-all duration-300"
    >
      <span class="font-mono text-[9px] tracking-[0.2em] transition-all duration-300 
        {activeSector === sector.id ? 'text-amber-500 opacity-100' : 'text-slate-500 opacity-0 group-hover:opacity-100'}">
        {sector.label}
      </span>

      <div class="relative flex items-center justify-center">
        <div class="h-1 w-1 rounded-full transition-all duration-500 
          {activeSector === sector.id ? 'bg-amber-500 scale-150' : 'bg-slate-400 dark:bg-slate-700 group-hover:bg-amber-400'}">
        </div>
        
        {#if activeSector === sector.id}
          <div class="absolute inset-0 h-1 w-1 bg-amber-500 rounded-full animate-ping"></div>
          <div class="absolute -left-2 h-[1px] w-4 bg-amber-500/30"></div>
        {/if}
      </div>
    </button>
  {/each}

  <div class="absolute right-[2px] top-0 bottom-0 w-[1px] bg-slate-200 dark:bg-slate-800 -z-10"></div>
</nav>