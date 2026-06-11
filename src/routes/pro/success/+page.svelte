<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { isPro } from '$lib/stores/pro.js';

  let state = 'verifying';

  onMount(async () => {
    const sessionId = $page.url.searchParams.get('session_id');
    if (!sessionId) {
      state = 'error';
      return;
    }

    try {
      const res = await fetch(`/api/verify-pro?session_id=${sessionId}`);
      if (!res.ok) throw new Error('Verification failed');
      const { token } = await res.json();
      isPro.activate(token);
      state = 'success';
    } catch {
      state = 'error';
    }
  });
</script>

<div class="page">
  {#if state === 'verifying'}
    <div class="center-state">
      <div class="spinner" aria-label="Verifying payment…"></div>
      <p>Verifying payment…</p>
    </div>

  {:else if state === 'success'}
    <div class="center-state">
      <div class="success-mark">✓</div>
      <h1>Brigade Pro unlocked</h1>
      <p>All tools are now active. No account needed. Works offline.</p>
      <button class="btn btn-primary" on:click={() => goto('/scaler')}>
        Start using Brigade
      </button>
    </div>

  {:else}
    <div class="center-state">
      <div class="error-mark">✕</div>
      <h1>Verification failed</h1>
      <p>
        Your payment may have gone through — check your email for a Stripe receipt.
        If Pro isn't activating, contact support.
      </p>
      <button class="btn btn-ghost" on:click={() => goto('/pro')}>
        Back to Pro page
      </button>
    </div>
  {/if}
</div>

<style>
  .center-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: var(--space-12) var(--space-4);
    gap: var(--space-5);
    min-height: 60vh;
    justify-content: center;
  }

  .success-mark { font-size: 3rem; color: var(--ok); }
  .error-mark   { font-size: 3rem; color: var(--danger); }

  .spinner {
    width: 36px;
    height: 36px;
    border: 2px solid var(--border);
    border-top-color: var(--accent);
    border-radius: 50%;
    animation: spin 700ms linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
</style>