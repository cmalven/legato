<script>
  import Keyboard from './Keyboard.svelte';
  import ChangeOctave from './ChangeOctave.svelte';
  import Midi from './Midi.svelte';
  import Toolbar from './Toolbar.svelte';
  import CurrentChord from './CurrentChord.svelte';
  import KeySelect from './KeySelect.svelte';
  import ChordProgression from './ChordProgression.svelte';
  import ControlLayout from './ControlLayout.svelte';
  import Chords from './Chords.svelte';
  import SynthInstruments from './SynthInstruments.svelte';
</script>

<style type="text/scss">
  :global(body) {
    --white-key-ratio: calc(0.875 / 5.7);
    --black-key-height-ratio: calc(4.2 / 6);
    --black-key-ratio: calc(0.5 / 3.9375);
    --scale: 370px;
    --key-margin: calc(var(--scale) * 0.005);
    margin: 0;
    font-family: 'Georgia', 'Times', 'Times New Roman', serif;
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    background-color: black;
  }

  .App {
    flex: 1;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    perspective: 1000px;
    transform-style: preserve-3d;
  }
</style>

<div class="App">
  <Midi />

  <ControlLayout>
    <span slot="left">
      <Chords />
    </span>
    <span slot="center">
      <Toolbar>
        <KeySelect />
        <ChordProgression />
      </Toolbar>
    </span>
    <span slot="right">
      <CurrentChord />
    </span>
  </ControlLayout>


  <Keyboard/>

  <ControlLayout>
    <span slot="left">
      <SynthInstruments />
    </span>
    <span slot="center">
      <Toolbar>
        <ChangeOctave />
      </Toolbar>
    </span>
    <span slot="right"></span>
  </ControlLayout>
</div>
