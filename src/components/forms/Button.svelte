<script>
    export let type = 'button';
    export let label = '';
</script>

<button
    {type}
    class="rounded bg-gradient-to-r from-emerald-500 to-green-400 px-6 py-3 text-sm font-bold text-neutral-900 shadow-lg shadow-emerald-500/20 hover:from-emerald-400 hover:to-green-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-neutral-950"
>
    {label}
</button> 