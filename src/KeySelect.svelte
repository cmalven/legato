<script>
  import { currentKey, currentOctaveIdx } from './stores';
  import { formatNotation, getKeys, getMidiForNotes } from './utils';
  import ControlSet from './ControlSet.svelte';
  import Select from './Select.svelte';
  import { playNote } from './Midi.svelte';

  const options = getKeys().map(key => {
    return {
      label: formatNotation(key.tonic + ' ' + key.type),
      value: key,
    };
  });

  // Play scale on change
  currentKey.subscribe(key => {
    if (!key) return;
    const midiScale = getMidiForNotes(key.scale, $currentOctaveIdx);
    midiScale.forEach((note, idx) => {
      window.setTimeout(playNote.bind(null, note), idx * 150);
      window.setTimeout(stopNote.bind(null, note), (idx + 1) * 300);
    });
  });
</script>

<ControlSet label="Key">
  <Select
    options={options}
    placeholder="Select a key…"
    bind:value={$currentKey}
  />
</ControlSet>
