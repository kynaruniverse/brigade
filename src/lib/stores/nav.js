import { writable } from 'svelte/store';

export const activeRoute = writable('/');

export const navItems = [
  {
    id: 'scaler',
    label: 'Scaler',
    path: '/scaler',
    icon: 'scale',
    pro: false
  },
  {
    id: 'allergens',
    label: 'Allergens',
    path: '/allergens',
    icon: 'shield',
    pro: false
  },
  {
    id: 'conversions',
    label: 'Convert',
    path: '/conversions',
    icon: 'arrows',
    pro: false
  },
  {
    id: 'timers',
    label: 'Timers',
    path: '/timers',
    icon: 'timer',
    pro: false
  },
  {
    id: 'more',
    label: 'More',
    path: '/more',
    icon: 'grid',
    pro: false
  }
];
