import { octave } from './config';

export const nameToSymbol = (name) => {
  return name.replace(' sharp', '♯').replace(' flat', '♭');
};

export const isNoteBlack = (note) => {
  return note.names.reduce((acc, val) => {
    if (
      val.indexOf('sharp') > -1 ||
      val.indexOf('flat') > -1
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
