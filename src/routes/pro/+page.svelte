<script>
  import { isPro } from '$lib/stores/pro.js';
  import NavIcon from '$components/shared/NavIcon.svelte';

  let loading = false;
  let error = null;

  const proFeatures = [
    { icon: 'scale',     label: 'Unlimited saved recipes' },
    { icon: 'banquet',   label: 'Banquet Calculator' },
    { icon: 'notebook',  label: "Chef's Notebook" },
    { icon: 'brief',     label: 'Shift Briefs' },
    { icon: 'checklist', label: 'Unlimited checklists' },
    { icon: 'timer',     label: 'Unlimited timers' },
  ];

  async function startCheckout() {
    loading = true;
    error = null;
    try {
      const res = await fetch('/api/checkout', { method: 'POST' });
      if (!res.ok) throw new Error('Checkout failed');
      const { url } = await res.json();
      window.location.href = url;
    } catch (e) {
      error = 'Could not start checkout. Check your connection.';
      loading = false;
    }
  }
</script>

<div class="page">
  {#if $isPro}
    <div class="already-pro">
      <div class="pro-tick">✓</div>
      <h1>You're on Pro</h1>
      <p>All Brigade tools are unlocked. Thanks for supporting independent development.</p>
    </div>
  {:else}
    <div class="page-header">
      <div class="pro-badge" style="margin-bottom: var(--space-3)">PRO</div>
      <h1>Brigade Pro</h1>
      <p>One payment. Every tool. No subscription.</p>
    </div>

    <div class="price-block">
      <span class="price mono">£9.99</span>
      <span class="price-note">one-time</span>
    </div>

    <div class="features-list">
      {#each proFeatures as f}
        <div class="feature-row">
          <div class="feature-icon">
            <NavIcon name={f.icon} size={18} />
          </div>
          <span>{f.label}</span>
        </div>
      {/each}
      <div class="feature-row accent-row">
        <div class="feature-icon">★</div>
        <span>All future Pro tools as they ship</span>
      </div>
    </div>

    {#if error}
      <div class="error-msg">{error}</div>
    {/if}

    <button
      class="btn btn-primary btn-full"
      on:click={startCheckout}
      disabled={loading}
    >
      {loading ? 'Opening checkout…' : 'Unlock Pro — £9.99'}
    </button>

    <p class="fine-print">
      Secure payment via Stripe. Pro status stored on your device — no account needed.
      Works fully offline after activation.
    </p>
  {/if}
</div>

<style>
  .already-pro {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: var(--space-12) var(--space-4);
    gap: var(--space-4);
  }

  .pro-tick {
    font-size: var(--text-3xl);
    color: var(--ok);
  }

  .price-block {
    display: flex;
    align-items: baseline;
    gap: var(--space-3);
    margin-bottom: var(--space-6);
  }

  .price {
    font-size: var(--text-3xl);
    font-weight: 600;
    color: var(--text-primary);
  }

  .price-note {
    font-size: var(--text-sm);
    color: var(--text-muted);
  }

  .features-list {
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    overflow: hidden;
    margin-bottom: var(--space-5);
  }

  .feature-row {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-3) var(--space-4);
    font-size: var(--text-sm);
    color: var(--text-secondary);
    border-bottom: 1px solid var(--border);
  }

  .feature-row:last-child {
    border-bottom: none;
  }

  .accent-row {
    color: var(--accent);
  }

  .feature-icon {
    color: var(--accent);
    flex-shrink: 0;
    width: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .error-msg {
    background: var(--danger-dim);
    border: 1px solid var(--danger);
    border-radius: var(--radius-sm);
    color: var(--danger);
    font-size: var(--text-sm);
    padding: var(--space-3) var(--space-4);
    margin-bottom: var(--space-4);
  }

  .fine-print {
    font-size: var(--text-xs);
    color: var(--text-muted);
    text-align: center;
    margin-top: var(--space-4);
  }
</style>