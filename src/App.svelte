<script>
  import Keyboard from './Keyboard.svelte';
  import ChangeOctave from './ChangeOctave.svelte';
  import Midi from './Midi.svelte';
</script>

<style>
  :global(body) {
    --white-key-ratio: calc(0.875 / 6);
    --black-key-height-ratio: calc(3.9375 / 6);
    --black-key-ratio: calc(0.5 / 3.9375);
    --scale: 400px;
    --key-margin: calc(var(--scale) * 0.005);
    margin: 0;
    font-family: 'Arial', 'Helvetica', sans-serif;
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
  <Keyboard/>
  <ChangeOctave />
</div>
