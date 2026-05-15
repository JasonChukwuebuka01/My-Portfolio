<script lang="ts">
  import { onMount } from 'svelte';

  // Define particle structure for clarity
  interface Particle {
    id: number;
    x: number;      // Horizontal position (%)
    y: number;      // Starting vertical position (%)
    size: number;   // Dimensions
    type: 'dot' | 'square';
    duration: number; // Animation speed
    delay: number;    // Staggered start
  }

  export let count = 50; // Total nodes to render
  export let accentColor = 'rgba(245, 158, 11, 0.4)'; // amber-500 with opacity

  let particles: Particle[] = [];

  // Generate randomized particle data on mount
  onMount(() => {
    // Check for user reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // If user prefers reduced motion, do not generate the system
    if (prefersReducedMotion) return;

    particles = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // Random width %
      y: Math.random() * 100, // Random height %
      size: Math.random() * 2 + 1, // Size between 1px and 3px
      type: Math.random() > 0.6 ? 'square' : 'dot', // 60/40 split
      duration: Math.random() * 20 + 10, // Slow float (10s - 30s)
      delay: Math.random() * -20 // Start at different animation points
    }));
  });
</script>

<svg 
  class="absolute inset-0 h-full w-full pointer-events-none z-0 overflow-hidden" 
  aria-hidden="true" 
  xmlns="http://www.w3.org/2000/svg"
>
  <defs>
    <filter id="glow">
      <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <g filter="url(#glow)">
    {#each particles as p (p.id)}
      {#if p.type === 'dot'}
        <circle
          cx="{p.x}%"
          cy="{p.y}%"
          r="{p.size / 2}"
          fill={accentColor}
          class="particle-node"
          style="
            animation-duration: {p.duration}s;
            animation-delay: {p.delay}s;
          "
        />
      {:else}
        <rect
          x="{p.x}%"
          y="{p.y}%"
          width="{p.size}"
          height="{p.size}"
          fill={accentColor}
          class="particle-node"
          style="
            animation-duration: {p.duration}s;
            animation-delay: {p.delay}s;
          "
        />
      {/if}
    {/each}
  </g>
</svg>

<style>
  /* The "Scanner Float" animation:
    Starts below the viewport, floats to the top, while changing opacity
    to appear and disappear smoothly.
  */
  @keyframes scannerFloat {
    0% {
      transform: translateY(120vh) scale(1);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      transform: translateY(-20vh) scale(0.5);
      opacity: 0;
    }
  }

  .particle-node {
    opacity: 0; /* Base state is invisible */
    animation-name: scannerFloat;
    animation-iteration-count: infinite;
    animation-timing-function: linear; /* Constant speed flow */
  }
</style>