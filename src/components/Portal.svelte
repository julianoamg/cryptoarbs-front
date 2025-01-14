<script lang="ts">
    import { onMount, onDestroy } from 'svelte';

    let portal: HTMLDivElement;
    let target: HTMLElement;

    onMount(() => {
        target = document.createElement('div');
        target.className = 'portal-container';
        document.body.appendChild(target);
    });

    onDestroy(() => {
        if (target && target.parentNode) {
            target.parentNode.removeChild(target);
        }
    });

    $: if (portal && target) {
        target.appendChild(portal);
    }
</script>

<div bind:this={portal} class="contents">
    <slot />
</div> 