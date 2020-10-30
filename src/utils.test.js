import {
  formatNotation,
  getAllNotes,
  getChordFromNotes, getFirstMidiNoteForOctave,
  getOctaveJumps,
  isNoteBlack,
} from './utils';

test('is note black', () => {
  expect(isNoteBlack({
    names: ['C'],
  })).toBe(false);

  expect(isNoteBlack({
    names: ['C#', 'Cb'],
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

test('get chord for notes', () => {
  let key = 'C';
  expect(
    getChordFromNotes([60, 64, 67], key),
  ).toEqual(['CM']);

  expect(
    getChordFromNotes([], key),
  ).toBeNull();

  expect(
    getChordFromNotes([60, 61, 62, 63, 64, 65], key),
  ).toBeNull();

  key = 'G';
  expect(
    getChordFromNotes([60, 64, 67], key),
  ).toEqual(['CM']);

  expect(
    getChordFromNotes([66, 72, 74], key),
  ).toEqual(['D7no5']);
});

test('format code', () => {
  expect(
    formatNotation('C#'),
  ).toEqual('C♯');

  expect(
    formatNotation('Cb'),
  ).toEqual('C♭');

  expect(
    formatNotation('CM'),
  ).toEqual('Cmaj');
});

test('get first midi note for octave', () => {
  expect(
    getFirstMidiNoteForOctave('A', 0),
  ).toEqual(33);

  expect(
    getFirstMidiNoteForOctave('C', 0),
  ).toEqual(24);

  expect(
    getFirstMidiNoteForOctave('C', 1),
  ).toEqual(36);
});
