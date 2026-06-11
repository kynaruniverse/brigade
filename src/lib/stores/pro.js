import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';

// Pro status is stored locally after Stripe purchase verification
// Key is obfuscated — not security, just raises the bar vs naive tampering
const PRO_KEY = 'bgd_pro_v1';
const PRO_TOKEN_KEY = 'bgd_pro_token';

function createProStore() {
  // Initialise from localStorage on first load
  const initial = browser ? localStorage.getItem(PRO_KEY) === 'true' : false;
  const { subscribe, set } = writable(initial);

  return {
    subscribe,

    // Called after Stripe payment verified server-side
    activate(token) {
      if (!browser) return;
      localStorage.setItem(PRO_KEY, 'true');
      localStorage.setItem(PRO_TOKEN_KEY, token);
      set(true);
    },

    // Dev only — never expose in production UI
    deactivate() {
      if (!browser) return;
      localStorage.removeItem(PRO_KEY);
      localStorage.removeItem(PRO_TOKEN_KEY);
      set(false);
    },

    getToken() {
      if (!browser) return null;
      return localStorage.getItem(PRO_TOKEN_KEY);
    }
  };
}

export const isPro = createProStore();

// Derived limits for free tier caps
export const limits = derived(isPro, ($isPro) => ({
  maxSavedRecipes: $isPro ? Infinity : 3,
  maxChecklists: $isPro ? Infinity : 1,
  maxTimers: $isPro ? Infinity : 3,
  canUseBanquetCalc: $isPro,
  canUseNotebook: $isPro,
  canUseShiftBriefs: $isPro
}));
