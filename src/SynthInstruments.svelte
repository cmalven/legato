<script>
  import { synthInstrument } from './stores';

  import ControlSet from './ControlSet.svelte';
  import Select from './Select.svelte';

  const options = [
    '0010_FluidR3_GM',
    '0010_GeneralUserGS',
    '0000_Aspirin',
    '0000_FluidR3_GM',
    '0000_GeneralUserGS',
    '0001_GeneralUserGS',
    '0010_JCLive',
    '0011_Aspirin',
    '0011_FluidR3_GM',
    '0011_GeneralUserGS',
  ].map(inst => {
    return {
      label: inst.replaceAll('_', ' '),
      value: inst,
    };
  });
</script>

<ControlSet label="Instrument">
  <Select
    options={options}
    placeholder="Select an instrument…"
    bind:value={ $synthInstrument}
  />
</ControlSet>
