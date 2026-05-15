<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import emailjs from '@emailjs/browser';
  import { type Action } from 'svelte/action';

  export let decipher: Action<HTMLElement, any>;

  // Form State
  let email = '';
  let message = '';
  let isSubmitting = false;
  
  // Toast State
  let showToast = false;
  let toastMessage = '';
  let toastType: 'success' | 'error' = 'success';

  function triggerToast(msg: string, type: 'success' | 'error' = 'success') {
    toastMessage = msg;
    toastType = type;
    showToast = true;
    setTimeout(() => (showToast = false), 5000);
  }

  async function handleSubmit(e: Event) {
    e.preventDefault();
    if (isSubmitting) return;

    isSubmitting = true;

    try {
      
      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID, 
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_email: email,
          message: message,
          to_name: "Jason Mayicodes", 
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      if (result.status === 200) {
        triggerToast('SENT SUCCESSFUL: MESSAGE_DELIVERED');
        email = '';
        message = '';
      }
    } catch (error) {
      triggerToast('CRITICAL_ERROR', 'error');
    } finally {
      isSubmitting = false;
    }
  }
</script>

<section id="contact" class="relative py-32 px-6 bg-slate-50 dark:bg-[#020617] overflow-hidden">
  {#if showToast}
    <div 
      transition:fly={{ y: 20, duration: 500 }}
      class="fixed bottom-10 right-10 z-[100] flex items-center gap-4 p-4 rounded-lg border font-mono text-xs shadow-2xl backdrop-blur-md
      {toastType === 'success' 
        ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-500' 
        : 'bg-red-500/10 border-red-500/50 text-red-500'}"
    >
      <div class="h-2 w-2 rounded-full animate-pulse {toastType === 'success' ? 'bg-emerald-500' : 'bg-red-500'}"></div>
      {toastMessage}
      <button on:click={() => (showToast = false)} class="ml-4 opacity-50 hover:opacity-100">×</button>
    </div>
  {/if}

  <div class="container mx-auto max-w-5xl">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
      
      <div class="space-y-12">
        <div class="space-y-4">
          <h2 use:decipher={{ text: "COMM_CHANNEL", duration: 800 }} class="font-mono text-[10px] tracking-[0.5em] text-amber-500">COMM_CHANNEL</h2>
          <h3 use:decipher={{ text: "LET'S_SYNC.", duration: 1200, delay: 200 }} class="text-5xl font-black text-slate-900 dark:text-white uppercase">LET'S_SYNC.</h3>
          <p class="text-slate-500 dark:text-slate-400 max-w-sm">Initiate a secure handshake to discuss architectural implementation or collaboration opportunities.</p>
        </div>

        <div class="space-y-6">
          <div class="flex items-center gap-4 p-4 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900/50">
            <div class="h-10 w-10 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-amber-500">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </div>
            <div>
              <p class="font-mono text-[8px] text-slate-400 uppercase">Email :</p>
              <p class="text-sm font-bold dark:text-white">mayicodes@gmail.com</p>
            </div>
          </div>
        </div>
      </div>

      <form on:submit={handleSubmit} class="relative space-y-6 p-8 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-2xl">
        <div class="space-y-2">
          <label for="email" class="ml-1 font-mono text-[10px] text-slate-400 uppercase">Identity_Email</label>
          <input 
            id="email" 
            type="email" 
            bind:value={email} 
            required 
            placeholder="user@example.com"
            class="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-4 rounded-xl text-sm focus:border-amber-500/50 outline-none transition-all"
          />
        </div>

        <div class="space-y-2">
          <label for="message" class="ml-1 font-mono text-[10px] text-slate-400 uppercase">Message</label>
          <textarea 
            id="message" 
            bind:value={message} 
            required 
            rows="4" 
            placeholder="Describe the objective..."
            class="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-4 rounded-xl text-sm focus:border-amber-500/50 outline-none transition-all"
          ></textarea>
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          class="group relative w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-black font-bold uppercase text-[10px] tracking-[0.3em] rounded-xl overflow-hidden transition-all disabled:opacity-50"
        >
          <span class="relative z-10">{isSubmitting ? 'Sending...' : 'Send'}</span>
          {#if !isSubmitting}
            <div class="absolute inset-0 bg-amber-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          {/if}
        </button>

        <div class="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-4 font-mono text-[8px] text-slate-400">
          <span class="flex items-center gap-1">
            <span class="h-1 w-1 rounded-full {isSubmitting ? 'bg-amber-500 animate-ping' : 'bg-green-500'}"></span>
            {isSubmitting ? 'TRANSMITTING' : 'GATEWAY_READY'}
          </span>
        </div>
      </form>
    </div>
  </div>
</section>