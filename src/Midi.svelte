<script>
  import WebMidi from 'webmidi';
  import 'webaudiofont';
  import { notes, playSynthSounds, synthInstrument } from './stores';
  import { loadScript } from './utils';

  let clicked = false;
  let isSynthSetup = false;
  let AudioContextFunc = null;
  let audioContext = null;
  let player = null;
  let src;
  let tone;

  document.addEventListener('click', () => {
    clicked = true;
  });

  const updateSynthInstrument = (instrument) => {
    if (!clicked || !instrument) return;
    src = `https://surikov.github.io/webaudiofontdata/sound/${instrument}_sf2_file.js`;
    tone = `_tone_${instrument}_sf2_file`;

    loadScript(src, () => {
      AudioContextFunc = window.AudioContext || window.webkitAudioContext;
      audioContext = new AudioContextFunc();
      player = new WebAudioFontPlayer();
      player.loader.decodeAfterLoading(audioContext, tone);
      isSynthSetup = true;
    });
  };

  const playKey = (pitch) => {
    player.queueWaveTable(audioContext, audioContext.destination, window[tone], 0, pitch, 0.75);
  };

  // Actually start listening for instrument to be selected
  synthInstrument.subscribe(updateSynthInstrument);

  const midiListen = () => {
    console.log('listening');
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
    if ($playSynthSounds && player) playKey(note);

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
