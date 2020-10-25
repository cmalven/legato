import { getAllNotes, isNoteBlack, nameToSymbol } from './utils';

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
