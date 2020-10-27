import { getAllNotes, getOctaveJumps, isNoteBlack, isNoteInChord, nameToSymbol } from './utils';

test('convert name to symbol', () => {
  expect(nameToSymbol('C')).toBe('C');
  expect(nameToSymbol('C sharp')).toBe('C♯');
  expect(nameToSymbol('C flat')).toBe('C♭');
});

test('is note black', () => {
  expect(isNoteBlack({
    names: ['C'],
  })).toBe(false);

  expect(isNoteBlack({
    names: ['C sharp', 'C flat'],
  })).toBe(true);
});

test('get all notes', () => {
  expect(getAllNotes()).toHaveLength(72);
});


test('get octave jumps', () => {
  expect(
    getOctaveJumps(6, 2),
  ).toBe(5);

  expect(
    getOctaveJumps(6, 3),
  ).toBe(4);

  expect(
    getOctaveJumps(6, 1),
  ).toBe(6);

  expect(
    getOctaveJumps(6, 4),
  ).toBe(3);

  expect(
    getOctaveJumps(7, 3),
  ).toBe(5);

  expect(
    getOctaveJumps(7, 2),
  ).toBe(6);
});
