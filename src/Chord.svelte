<script>
  import { formatNotation, getMidiForSelectedChord } from './utils';
  import { selectedChord, currentOctaveIdx } from './stores';
  import { playNote, stopNote } from './Midi.svelte';

  export let name;

  $: midiNotes = getMidiForSelectedChord(name, $currentOctaveIdx);

  $: noteTimeouts = midiNotes.reduce((acc, note) => {
    acc[note] = null;
    return acc;
  }, {});

  const onMouseEnter = evt => {
    selectedChord.update(chord => {
      return name;
    });
  };

  const onMouseLeave = evt => {
    selectedChord.update(chord => {
      return null;
    });
  };

  const onMouseDown = () => {
    midiNotes.forEach((note, idx) => {
      window.clearTimeout(noteTimeouts[note]);
      playNote(note);
    });
  };

  const onMouseUp = () => {
    midiNotes.forEach((note, idx) => {
      stopNote(note);
    });
  };
</script>

<style type="text/scss">
  .Chord {
    @include border-common;
    font-size: 12px;
    line-height: 15px;
    padding: 8px;
    color: white;
    transition: border-color 0.2s;
    cursor: pointer;
    min-width: 40px;

    &:active {
      opacity: 0.5;
    }

    &:hover {
      border-color: white;
    }
  }
</style>

<div class="Chord" on:mousedown={onMouseDown} on:mouseup={onMouseUp} on:mouseenter={onMouseEnter} on:mouseleave={onMouseLeave}>
  {formatNotation(name)}
</div>

