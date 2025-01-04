<script>
    import { UserCircle } from 'lucide-svelte';
    
    export let title = '';
    export let description = '';
</script>

<div class="space-y-6">
    <div class="flex items-center space-x-4">
        <div class="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10">
            <UserCircle class="h-8 w-8 text-emerald-500" />
        </div>
        <div>
            <h1 class="text-2xl font-bold text-neutral-200">{title}</h1>
            <p class="text-sm text-neutral-400">
                {description}
            </p>
        </div>
    </div>
</div> 