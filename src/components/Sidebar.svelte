<script>
// @ts-nocheck

    import {writable} from 'svelte/store';
    import {
        ArrowLeftRight,
        Settings,
        BookOpen,
        Target,
        ArrowRightLeft,
        MessageCircle,
        ChevronLeft,
        CreditCard,
        UserCircle,
        LogOut
    } from 'lucide-svelte';

    const sidebarOpen = writable(false);
    const sidebarCollapsed = writable(false);
    let touchStart = 0;
    let touchEnd = 0;

    const handleTouchStart = (e) => {
        touchStart = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e) => {
        touchEnd = e.changedTouches[0].screenX;
        if (touchStart - touchEnd > 50) { // Swipe left
            sidebarOpen.set(false);
        }
    };

    const toggleSidebar = () => {
        sidebarOpen.update(open => !open);
    };

    const toggleCollapse = () => {
        sidebarCollapsed.update(collapsed => !collapsed);
    };

    const menuSections = [
        {
            title: 'ARBITRAGENS',
            items: [
                {name: 'Criptomoedas', icon: ArrowLeftRight, href: '/'},
                {name: 'Configurações', icon: Settings, href: '/configuracoes'}
            ]
        },
        {
            title: 'SUPORTE',
            items: [
                {name: 'Primeiros Passos', icon: BookOpen, href: '/primeiros-passos'},
                {name: 'Mentoria', icon: Target, href: '/mentoria'},
                {name: 'WhatsApp', icon: MessageCircle, href: '/whatsapp'}
            ]
        },
        {
            title: 'CONTA',
            items: [
                {name: 'Assinatura', icon: CreditCard, href: '/assinatura'},
                {name: 'Meus Dados', icon: UserCircle, href: '/perfil'},
                {name: 'Sair', icon: LogOut, href: '/logout'}
            ]
        }
    ];
</script>

<div class="flex h-screen bg-neutral-950 overflow-hidden">
    <!-- Overlay for mobile -->
    <div
        class="fixed inset-0 bg-black/50 lg:hidden transition-opacity {$sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}"
        on:click={() => toggleSidebar()}
        role="button"
        tabindex="0"
        on:keydown={(e) => {
            if (e.key === 'Escape') toggleSidebar();
        }}
    />
    
    <!-- Sidebar -->
    <aside
        class="fixed lg:static flex flex-col h-screen transition-transform lg:translate-x-0 {$sidebarOpen ? 'translate-x-0' : '-translate-x-full'} {$sidebarCollapsed ? 'w-[4.5rem]' : 'w-64'} bg-gradient-to-b from-neutral-900 to-neutral-950 border-r border-neutral-800"
        on:touchstart={handleTouchStart}
        on:touchend={handleTouchEnd}
    >
        <!-- Header -->
        <div class="relative flex items-center h-14 px-3 border-b border-neutral-800 bg-gradient-to-r from-emerald-500/5 to-transparent">
            <div class="flex items-center space-x-2" class:hidden={$sidebarCollapsed}>
                <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 flex items-center justify-center">
                    <ArrowRightLeft class="w-5 h-5 text-emerald-500/80" />
                </div>
                <div class="flex flex-col">
                    <span class="text-sm font-semibold text-neutral-200 tracking-tight">CryptoArbs</span>
                    <span class="text-xs font-medium text-neutral-500">contato@example.com</span>
                </div>
            </div>
            <button 
                class="hidden lg:flex items-center justify-center w-6 h-6 rounded hover:bg-neutral-800 text-neutral-400"
                class:absolute={!$sidebarCollapsed}
                class:right-3={!$sidebarCollapsed}
                class:mx-auto={$sidebarCollapsed}
                on:click={toggleCollapse}
            >
                <div class="transform transition-transform" class:rotate-180={$sidebarCollapsed}>
                    <ChevronLeft class="w-4 h-4" />
                </div>
            </button>
        </div>

        <!-- Menu Items -->
        <nav class="flex-1 overflow-y-auto py-2">
            {#each menuSections as section}
                <div class="px-3 mb-2">
                    <span class="text-xs font-semibold text-emerald-500/70 tracking-wider uppercase px-2" class:hidden={$sidebarCollapsed}>
                        {section.title}
                    </span>
                    <div class="mt-1 space-y-0.5">
                        {#each section.items as {name, icon, href}}
                            <a
                                href={href}
                                class="flex items-center px-2 py-1 text-sm text-neutral-300 rounded-lg hover:bg-gradient-to-r hover:from-emerald-500/10 hover:to-transparent group"
                            >
                                <div class="w-8 h-8 rounded-lg flex items-center justify-center transition-colors bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 group-hover:from-emerald-500/20 group-hover:to-emerald-500/10">
                                    <svelte:component this={icon} class="w-5 h-5 text-emerald-500/80 group-hover:text-emerald-400"/>
                                </div>
                                <span class="ml-3 font-medium group-hover:text-neutral-200" class:hidden={$sidebarCollapsed}>{name}</span>
                            </a>
                        {/each}
                    </div>
                </div>
            {/each}
        </nav>
    </aside>

    <div class="flex-1 flex flex-col min-h-screen overflow-hidden">
        <!-- Mobile Header -->
        <header class="lg:hidden flex items-center h-16 px-4 bg-gradient-to-b from-neutral-900 to-neutral-950 border-b border-neutral-800">
            <button 
                class="p-2 hover:bg-gradient-to-r hover:from-emerald-500/10 hover:to-transparent rounded-lg text-neutral-400" 
                on:click={toggleSidebar}
                aria-label="Toggle menu"
            >
                {#if $sidebarOpen}
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                {:else}
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                {/if}
            </button>
        </header>

        <!-- Main Content -->
        <main class="flex-1 overflow-auto bg-neutral-950 p-6">
            <div class="max-w-5xl mx-auto">
                <slot />
            </div>
        </main>
    </div>
</div>