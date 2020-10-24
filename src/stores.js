import { writable } from 'svelte/store';

export const currentOctaveIdx = writable(2);
export const visibleOctaves = writable(3);
export const notes = writable([]);
