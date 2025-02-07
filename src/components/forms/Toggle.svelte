<script lang="ts">
    export let checked = false;
    export let id: string | undefined = undefined;
</script>

<button
    type="button"
    role="switch"
    {id}
    aria-checked={checked}
    class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/20 {checked ? 'bg-emerald-500' : 'bg-neutral-700'}"
    on:click={() => checked = !checked}
>
    <span class="sr-only">Toggle</span>
    <span
        class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform {checked ? 'translate-x-6' : 'translate-x-1'}"
    ></span>
</button> 