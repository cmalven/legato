<script>
  import { formatNotation, getMidiForSelectedChord } from './utils';
  import { selectedChord, currentOctaveIdx } from './stores';
  import { playNote } from './Midi.svelte';

  export let name;

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
    const notes = getMidiForSelectedChord(name, $currentOctaveIdx);
    notes.forEach((note, idx) => {
      window.setTimeout(playNote.bind(null, note), idx * 20);
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

    &:active {
      opacity: 0.5;
    }

    &:hover {
      border-color: white;
    }
  }
</style>

<div class="Chord" on:mousedown={onMouseDown} on:mouseenter={onMouseEnter} on:mouseleave={onMouseLeave}>
  {formatNotation(name)}
</div>

