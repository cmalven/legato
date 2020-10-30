import { octave } from './config';
import { Chord, Key, Midi, Progression } from '@tonaljs/tonal';

export const isNoteBlack = (note) => {
  return note.names.reduce((acc, val) => {
    if (
      val.indexOf('#') > -1 ||
      val.indexOf('b') > -1
    ) {
      acc = true;
    }
    return acc;
  }, false);
};

export const getOctaveLength = () => {
  return octave.length;
};

export const getNumOctaves = () => {
  return 6;
};

export const getAllNotes = () => {
  const num = getNumOctaves();
  let allOctaves = [];
  for (let idx = 0, length = num; idx < length; idx++) {
    allOctaves = allOctaves.concat(octave);
  }
  return allOctaves;
};

export const noteIdxToMidi = (noteIdx, keyOffset) => {
  return noteIdx + 21 + keyOffset;
};

export const getOctaveJumps = (numOctaves, octavesPer) => {
  return numOctaves - octavesPer + 1;
};

export const getChordFromNotes = (notes, limitToKey = null) => {
  // If notes are empty or no key is specified, don't do anything
  if (!notes.length || !limitToKey) return null;

  let chromaticNotesFlat = notes.map(note => Midi.midiToNoteName(note, { pitchClass: true }));
  let chromaticNotesSharp = notes.map(note => Midi.midiToNoteName(note, { pitchClass: true, sharps: true }));

  // Get the base chords for the scale
  let chordsForKey = Key.majorKey(limitToKey).chords;

  // And any chords that are reduced versions
  chordsForKey.forEach(chord => {
    chordsForKey = chordsForKey.concat(Chord.reduced(chord));
  });

  // Narrow down to all chords that have all of the current notes
  let chordsForNotes = chordsForKey.filter(chord => {
    const notesForChord = Chord.get(chord).notes;

    // TODO: Pretty major repetition of code here
    const matchFlat = chromaticNotesFlat.every(note => notesForChord.indexOf(note) > -1) &&
      notesForChord.every(note => chromaticNotesFlat.indexOf(note) > -1);

    const matchSharp = chromaticNotesSharp.every(note => notesForChord.indexOf(note) > -1) &&
      notesForChord.every(note => chromaticNotesSharp.indexOf(note) > -1);

    return matchFlat || matchSharp;
  });

  return chordsForNotes.length ? chordsForNotes : null;
};

export const formatNotation = (notation) => {
  return notation
    .replace('M', 'maj')
    .replace('#', '♯')
    .replace('b', '♭');
};

export const getKeys = () => {
  return octave.reduce((acc, item) => {
    const name = item.names[0];
    [
      'major',
      // 'minor',
    ].forEach(variant => {
      const key = Key[variant + 'Key'](name);
      acc.push(key);
    });
    return acc;
  }, []);
};

export const getChordProgressions = () => {
  return [
    ['I', 'IV', 'V7'],
    ['I', 'V', 'vim', 'IV'],
    ['I', 'IV', 'V', 'IV'],
    ['I', 'vim', 'IV', 'V'],
    ['iim7', 'V7', 'I7'],
  ];
};

export const noteInCurrentKey = (note, key) => {
  return note.names.filter(name => key.scale.indexOf(name) > -1).length;
};

export const getProgressionForKey = (progression, key) => {
  console.log(key);
  if (!key || !progression) return [];
  return Progression.fromRomanNumerals(key.tonic, progression);
};

export const getFirstMidiNoteForOctave = (noteName, octaveIdx, afterMidi = 0) => {
  let octIdx = octaveIdx;
  let midiPosition = -1;
  while(midiPosition < afterMidi) {
    const notePosition = noteName + (octIdx + 1);
    midiPosition = Midi.toMidi(notePosition);
    octIdx++;
  }
  return midiPosition;
};

export const getMidiForSelectedChord = (chordName, octaveIdx) => {
  const chord = Chord.get(chordName);
  if (chord.empty) return [];

  const notes = chord.notes;

  const firstNotePosition = getFirstMidiNoteForOctave(notes[0], octaveIdx);

  const midiNotes = notes.map((note, idx) => {
    const firstNote = getFirstMidiNoteForOctave(note, octaveIdx, firstNotePosition);
    return Midi.toMidi(firstNote);
  });

  return midiNotes;
};
