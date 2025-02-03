<script lang="ts">
    import { PUBLIC_LOGO_FILE } from '$env/static/public';
    
    export let size: 'small' | 'default' | 'large' = 'default';
    export let className = '';
    
    const sizeClasses = {
        small: 'h-6',
        default: 'h-8',
        large: 'h-12'
    } as const;
    
    $: finalSize = sizeClasses[size];
</script>

<div class="flex justify-center">
    {#if PUBLIC_LOGO_FILE}
        <img 
            src={`/assets/${PUBLIC_LOGO_FILE}`} 
            alt="CryptoArbs Logo" 
            class="{finalSize} {className} w-auto object-contain"
        />
    {:else}
        <!-- Fallback icon when no logo is configured -->
        <div class="{finalSize} aspect-square {className} rounded-lg bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-emerald-500/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M7 16V4M7 4L3 8M7 4L11 8M17 8V20M17 20L21 16M17 20L13 16"/>
            </svg>
        </div>
    {/if}
</div> 