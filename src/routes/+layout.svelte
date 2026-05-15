<script lang="ts">
    import './layout.css';
    import { onMount } from 'svelte';

    // 1. Initialize state
    let isDark = true;

    onMount(() => {
        // 2. Check localStorage on load
        const savedTheme = localStorage.getItem('myTheme');
        if (savedTheme !== null) {
            isDark = savedTheme === 'dark';
        } else {
            // Optional: Check system preference if no saved theme
            isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        
        // 3. Initial apply
        applyTheme();
    });

    function applyTheme() {
        if (typeof document !== 'undefined') {
            if (isDark) {
                document.documentElement.classList.add('dark');
                document.documentElement.style.colorScheme = 'dark';
            } else {
                document.documentElement.classList.remove('dark');
                document.documentElement.style.colorScheme = 'light';
            }
            localStorage.setItem('myTheme', isDark ? 'dark' : 'light');
        }
    }

    function toggleTheme() {
        isDark = !isDark;
        applyTheme(); // Explicitly call the update logic
    }
</script>

<div
    class="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-500 selection:bg-amber-500/30 dark:bg-[#020617] dark:text-slate-200"
>
    <slot />

    <button
        on:click={toggleTheme}
        type="button"
        class="fixed right-6 bottom-6 z-[9999] flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white shadow-lg transition-all hover:border-amber-500 dark:border-slate-800 dark:bg-slate-900"
        aria-label="Toggle Theme"
    >
        <span class="text-xl">
            {isDark ? '☀' : '🌙'}
        </span>
    </button>
</div>