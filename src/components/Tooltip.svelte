<script lang="ts">
    export let text: string;
</script>

<div class="group relative">
    <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 text-sm text-neutral-200 bg-neutral-900 rounded-lg border border-neutral-800 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
        {text}
        <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-neutral-900 border-b border-r border-neutral-800 rotate-45"></div>
    </div>
    <div class="w-4 h-4 rounded-full bg-neutral-800/50 flex items-center justify-center text-neutral-400 cursor-help">
        ?
    </div>
</div> 