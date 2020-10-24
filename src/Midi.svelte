<script>
  import WebMidi from 'webmidi';
  import { notes } from './stores';


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
