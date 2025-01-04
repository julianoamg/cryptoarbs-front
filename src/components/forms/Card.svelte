<script>
    export let title = '';
</script>

<div class="rounded-lg border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm">
    <div class="border-b border-neutral-800 px-6 py-4 bg-gradient-to-r from-emerald-500/20 to-transparent">
        <h2 class="text-lg font-semibold text-neutral-200">{title}</h2>
    </div>
    <div class="p-6">
        <slot />
    </div>
</div> 