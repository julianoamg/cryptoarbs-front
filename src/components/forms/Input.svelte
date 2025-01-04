<script>
    export let id = '';
    export let label = '';
    export let type = 'text';
    export let value = '';
    export let placeholder = '';
    export let maxlength = undefined;
    export let onInput = undefined;
</script>

<div class="space-y-2">
    <label for={id} class="text-sm font-medium text-neutral-300">
        {label}
    </label>
    <input
        {type}
        {id}
        {placeholder}
        {maxlength}
        value={value}
        on:input={onInput || ((e) => value = e.target.value)}
        class="w-full rounded-lg border border-neutral-800 bg-neutral-900/50 px-4 py-3 text-neutral-200 placeholder-neutral-500 backdrop-blur-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-neutral-950"
    />
</div> 