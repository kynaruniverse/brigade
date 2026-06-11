<script>
  import '../app.css';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { navItems } from '$lib/stores/nav.js';
  import { isPro } from '$lib/stores/pro.js';
  import NavIcon from '$components/shared/NavIcon.svelte';

  $: currentPath = $page.url.pathname;
</script>

<div id="app">
  <main class="app-content">
    <slot />
  </main>

  <nav class="bottom-nav" aria-label="Main navigation">
    {#each navItems as item}
      <button
        class="nav-item"
        class:active={currentPath === item.path || (item.path !== '/' && currentPath.startsWith(item.path))}
        on:click={() => goto(item.path)}
        aria-label={item.label}
        aria-current={currentPath === item.path ? 'page' : undefined}
      >
        <NavIcon name={item.icon} />
        <span class="nav-label">{item.label}</span>
      </button>
    {/each}
  </nav>
</div>

<style>
  .bottom-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: calc(var(--nav-height) + var(--safe-bottom));
    padding-bottom: var(--safe-bottom);
    background: var(--bg-surface);
    border-top: 1px solid var(--border);
    display: flex;
    align-items: stretch;
    z-index: 100;
  }

  .nav-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3px;
    background: none;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    padding: var(--space-2) var(--space-1);
    transition: color var(--transition-fast);
    -webkit-tap-highlight-color: transparent;
    min-height: var(--touch-min);
  }

  .nav-item.active {
    color: var(--accent);
  }

  .nav-item:active {
    opacity: 0.7;
  }

  .nav-label {
    font-size: var(--text-xs);
    font-weight: 500;
    letter-spacing: 0.02em;
  }
</style>