<script>
  export let prev = () => {};
  export let next = () => {};
  export let disabled = false;
</script>

<style type="text/scss">
  .PrevNext {
    display: flex;
    padding-left: 12px;
  }

  .btn {
    font-family: 'Helvetica Neue', 'helvetica', 'arial', sans-serif;
    font-size: 14px;
    border-radius: 0;
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 5px 0;
    border-bottom: 1px solid transparent;

    & + & {
      margin-left: 8px;
    }

    &:hover {
      opacity: 0.6;
    }

    &:active {
      opacity: 0.8;
    }

    &:focus {
      outline: none;
    }

    &.btn--prev {
      content: 'Prev';
    }

    &.btn--next {
      content: 'Next';
    }

    &[disabled] {
      pointer-events: none;
      opacity: 0.2;
    }
  }
</style>

<div class="PrevNext">
  <button disabled={disabled} on:click={prev} class="btn btn--prev" aria-label="Previous">◄</button>
  <button disabled={disabled} on:click={next} class="btn btn--next" aria-label="Next">►</button>
</div>
