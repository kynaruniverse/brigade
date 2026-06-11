<script>
  import { goto } from '$app/navigation';
  import NavIcon from './NavIcon.svelte';

  export let feature = 'This feature';
  export let description = '';
</script>

<div class="gate">
  <div class="gate-icon">
    <NavIcon name="lock" size={28} />
  </div>

  <h2>{feature}</h2>
  <p class="gate-desc">
    {description || `${feature} is part of Brigade Pro.`}
  </p>

  <div class="gate-perks">
    <div class="perk">Unlimited saved recipes</div>
    <div class="perk">Banquet Calculator</div>
    <div class="perk">Chef's Notebook</div>
    <div class="perk">Shift Briefs</div>
    <div class="perk">Unlimited checklists & timers</div>
    <div class="perk">All future Pro tools</div>
  </div>

  <button class="btn btn-primary btn-full" on:click={() => goto('/pro')}>
    Unlock Brigade Pro — £9.99
  </button>

  <p class="gate-note">One payment. No subscription. Works offline.</p>
</div>

<style>
  .gate {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: var(--space-8) var(--space-6);
    gap: var(--space-4);
  }

  .gate-icon {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: var(--bg-raised);
    border: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-muted);
  }

  h2 {
    color: var(--text-primary);
  }

  .gate-desc {
    font-size: var(--text-sm);
    color: var(--text-secondary);
    max-width: 280px;
  }

  .gate-perks {
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    padding: var(--space-4);
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .perk {
    font-size: var(--text-sm);
    color: var(--text-secondary);
    display: flex;
    align-items: center;
    gap: var(--space-2);
    text-align: left;
  }

  .perk::before {
    content: '—';
    color: var(--accent);
    font-weight: 700;
    flex-shrink: 0;
  }

  .gate-note {
    font-size: var(--text-xs);
    color: var(--text-muted);
  }
</style>
