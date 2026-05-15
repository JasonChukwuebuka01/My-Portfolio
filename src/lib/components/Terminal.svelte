<script lang="ts">
  import { tick } from 'svelte';

  // Props to make the component reusable and clean
  export let commands: Record<string, string> = {};
  
  let input = '';
  let terminalOutput: HTMLDivElement;
  let commandHistory: string[] = []; 
  let historyIndex = -1;

  // Initial terminal display state
  let history: { type: 'cmd' | 'resp'; text: string }[] = [
    { type: 'resp', text: 'SYSTEM_INIT: SUCCESSFUL' },
    { type: 'resp', text: 'AUTHENTICATED: OBIANYOR_CHUKWUEBUKA' },
    { type: 'resp', text: 'Type "help" to see available protocols.' }
  ];

  async function handleCommand(e: KeyboardEvent) {
    // Execute Command (Enter Key)
    if (e.key === 'Enter' && input.trim()) {
      const rawInput = input.trim();
      const cmd = rawInput.toLowerCase();
      
      history = [...history, { type: 'cmd', text: `> ${rawInput}` }];
      commandHistory = [rawInput, ...commandHistory];
      historyIndex = -1;

      if (cmd === 'clear') {
        history = [];
      } else if (commands[cmd]) {
        history = [...history, { type: 'resp', text: commands[cmd] }];
      } else if (cmd === 'whoami') {
        history = [...history, { type: 'resp', text: 'User: Guest; Node: Port_Harcourt_01' }];
      } else {
        history = [...history, { type: 'resp', text: `ERR: Command "${cmd}" not recognized.` }];
      }

      input = '';
      await tick(); 
      if (terminalOutput) terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    // Command History Navigation (Up/Down Arrows)
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        input = commandHistory[historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        input = commandHistory[historyIndex];
      } else {
        historyIndex = -1;
        input = '';
      }
    }
  }

  function focusInput() {
    const el = document.getElementById('terminal-input') as HTMLInputElement;
    el?.focus();
  }
</script>

<button 
  type="button"
  on:click={focusInput}
  class="w-full h-[350px] bg-slate-950 rounded-xl border border-slate-800 shadow-2xl flex flex-col overflow-hidden font-mono text-[11px] relative cursor-text group text-left items-stretch focus:outline-none focus:ring-2 focus:ring-amber-500/50"
  aria-label="Interactive Terminal Console"
>
  <div class="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800 shrink-0">
    <div class="flex gap-1.5">
      <div class="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40"></div>
      <div class="w-2.5 h-2.5 rounded-full bg-amber-500/20 border border-amber-500/40"></div>
      <div class="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/40"></div>
    </div>
    <span class="text-slate-500 text-[9px] tracking-widest uppercase">system_console — 80x24</span>
  </div>

  <div 
    bind:this={terminalOutput}
    class="flex-1 p-4 overflow-y-auto space-y-1 text-slate-300 scrollbar-hide selection:bg-amber-500/30"
  >
    {#each history as line}
      <p class={line.type === 'cmd' ? 'text-amber-500' : 'text-slate-400'}>
        {line.text}
      </p>
    {/each}
    
    <div class="flex items-center gap-2 pt-1">
      <span class="text-green-500">➜</span>
      <span class="text-blue-400">~</span>
      <input
        id="terminal-input"
        type="text"
        bind:value={input}
        on:keydown={handleCommand}
        class="flex-1 bg-transparent border-none outline-none text-slate-300 caret-amber-500"
        autofocus
        autocomplete="off"
        spellcheck="false"
      />
    </div>
  </div>

  <div class="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,1)_50%)] bg-[size:100%_4px]"></div>
</button>

<style>
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  
  /* Reset button default styles that might interfere with layout */
  button {
    appearance: none;
    background: inherit;
    font: inherit;
    color: inherit;
  }
</style>