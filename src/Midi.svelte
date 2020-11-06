<script context="module">
  import WebMidi from 'webmidi';
  import 'webaudiofont';
  import { notes, playSynthSounds, synthInstrument } from './stores';
  import { loadScript } from './utils';

  let clicked = false;
  let AudioContextFunc = null;
  let audioContext = null;
  let player = null;
  let playerLoaded = false;
  let src;
  let tone;
  let midiOutput = null;

  document.addEventListener('click', () => {
    clicked = true;
  });

  const updateSynthInstrument = (instrument) => {
    if (!clicked || !instrument) return;
    playerLoaded = false;
    src = `https://surikov.github.io/webaudiofontdata/sound/${instrument}_sf2_file.js`;
    tone = `_tone_${instrument}_sf2_file`;

    loadScript(src, () => {
      AudioContextFunc = window.AudioContext || window.webkitAudioContext;
      audioContext = new AudioContextFunc();
      player = new WebAudioFontPlayer();
      player.loader.decodeAfterLoading(audioContext, tone);
      player.loader.waitLoad(() => playerLoaded = true);
    });
  };

  // Actually start listening for instrument to be selected
  synthInstrument.subscribe(updateSynthInstrument);

  /**
   * Plays a given MIDI note on one of the built-in synthesizer instruments,
   * or a virtual software instrument such as MainStage or Ableton Live.
   * @param pitch
   */
  export const playNote = (pitch) => {
    playMidi(pitch);
    if (!playerLoaded) return;
    player.queueWaveTable(audioContext, audioContext.destination, window[tone], 0, pitch, 0.75);
  };

  /**
   * Stop playing a note.
   * @param pitch
 */
  export const stopNote = (pitch) => {
    stopMidi(pitch);
  };

  /**
   * Plays a given MIDI note on a virtual software instrument via MIDI.
   * If you want to play a virtual instrument in software such as MainStage,
   * Ableton Live, or Logic, you must set up an IAC Driver in Audio MIDI Setup
   * on your mac using the following steps:
   *
   * 1. Open Audio MIDI Setup
   * 2. Choose Window > Show MIDI Studio
   * 3. Double-click on IAC Driver
   * 4. Check the box for "Device is online"
   * 5. Click "Apply" and close the window
   * 6. Make sure that your software using using the new IAC Driver as an input
   * @param pitch
   */
  const playMidi = (pitch) => {
    if (midiOutput) {
      midiOutput.playNote(pitch, 'all', {
        velocity: 0.3,
      });
    }
  };

  const stopMidi = (pitch) => {
    if (midiOutput) {
      midiOutput.stopNote(pitch);
    }
  };
</script>

<script>
  const midiListen = () => {
    midiOutput = WebMidi.getOutputByName('IAC Driver Bus 1');
    WebMidi.inputs.forEach(input => {
      input.addListener('noteon', 'all', onNoteOn);
      input.addListener('noteoff', 'all', onNoteOff);
    });
  };

  const onNoteOn = function(message) {
    // eslint-disable-next-line no-unused-vars
    let [command, note, velocity] = message.data;
    console.log(`note on: ${note}`);

    // Play synthesized sound
    if ($playSynthSounds && player && !midiOutput) playNote(note);

    notes.update(notes => {
      return [...notes, note];
    });
  };

  const onNoteOff = function(message) {
    // eslint-disable-next-line no-unused-vars
    let [command, note, velocity] = message.data;
    console.log(`note off: ${note}`);

    notes.update(notes => {
      return notes.filter(val => val !== note);
    });
  };

  // If MIDI is supported by the browser, request MIDI access
  new Promise((res, rej) => {
    const webmidiEnabled = navigator.requestMIDIAccess;

    if (webmidiEnabled) {
      WebMidi.enable(err => {
        if (err) {
          console.error('WebMIDI is not supported in this browser.');
        } else {
          console.log('MIDI devices successfully connected.');
          midiListen();
        }
      });
    }
  })
    .catch(err => {
      console.error(err);
    });

</script>
