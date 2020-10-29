import { writable } from 'svelte/store';

/**
 * The octave, starting with C, that should appear at the start
 * of the visible keyboard.
 */
export const currentOctaveIdx = writable(2);

/**
 * The number of octaves that should be displayed on the keyboard
 * at one time.
 */
export const visibleOctaves = writable(3);

/**
 * How many keys after the default start key - A0 - the visible keyboard should
 * start. For instance, a value of 3 means that the first key ever displayed will be C0
 */
export const keyOffset = writable(3);

/**
 * An array of all all notes that are currently being played.
 * This number is a MIDI value, which means that it starts at 21 (A0)
 * and goes to 108 (C8)
 */
export const notes = writable([]);

/**
 * The currently selected chord (e.g. C Major)
 */
export const currentChord = writable(null);

/**
 * The currently selected key (e.g. C Major)
 */
export const currentKey = writable(null);

/**
 * The currently selected chord progression
 */
export const currentChordProgression = writable(null);
