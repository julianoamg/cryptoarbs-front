<script>
// @ts-nocheck
    import {writable} from 'svelte/store';
    import {page} from '$app/stores';
    import { goto } from '$app/navigation';
    import { auth } from '$lib/stores/auth';
    import { logout } from '$lib/services/auth';
    import { getMe } from '$lib/services/user';
    import { onMount } from 'svelte';
    import { toast } from '$lib/stores/toast';
    import { language } from '$lib/stores/i18n';
    import { translations } from '$lib/i18n/translations';
    import LanguageSelector from '../components/LanguageSelector.svelte';
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
    let userEmail = '';

    $: t = translations[$language];

    onMount(async () => {
        if ($auth.token) {
            try {
                const userData = await getMe($auth.token);
                userEmail = userData.email;
            } catch {
                toast.error(t.menu.erro.carregarDados);
            }
        }
    });

    const toggleSidebar = () => sidebarOpen.update(open => !open);
    const toggleCollapse = () => sidebarCollapsed.update(collapsed => !collapsed);

    async function handleLogout(event) {
        event.preventDefault();
        try {
            if ($auth.token) await logout($auth.token);
        } catch (error) {
            console.error('Logout failed:', error);
        }
        auth.clearAuth();
        sidebarOpen.set(false);
        goto('/login');
    }

    async function handleNavigation(href) {
        if (window.innerWidth < 1024) sidebarOpen.set(false);
        await goto(href);
    }

    $: menuSections = [
        {
            title: t.menu.arbitragens,
            items: [
                {name: t.menu.criptomoedas, icon: ArrowLeftRight, href: '/'},
                {name: t.menu.configuracoes, icon: Settings, href: '/configuracoes'}
            ]
        },
        {
            title: t.menu.suporte,
            items: [
                {name: t.menu.primeirosPassos, icon: BookOpen, href: '/primeiros-passos'},
                {name: t.menu.mentoria, icon: Target, href: '/mentoria'},
                {name: t.menu.whatsapp, icon: MessageCircle, href: '/whatsapp'}
            ]
        },
        {
            title: t.menu.conta,
            items: [
                {name: t.menu.assinatura, icon: CreditCard, href: '/assinatura'},
                {name: t.menu.meusDados, icon: UserCircle, href: '/perfil'},
                {name: t.menu.sair, icon: LogOut, href: '#', onClick: handleLogout}
            ]
        }
    ];
</script>

<div class="flex h-screen bg-neutral-950 overflow-hidden">
    <!-- Mobile Overlay -->
    <div
        class="fixed inset-0 bg-black/50 lg:hidden transition-opacity z-40 {$sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}"
        on:click={toggleSidebar}
        role="button"
        tabindex="0"
        on:keydown={(e) => e.key === 'Escape' && toggleSidebar()}
    ></div>
    
    <!-- Sidebar -->
    <aside
        class="fixed lg:static flex flex-col h-screen transition-transform lg:translate-x-0 {$sidebarOpen ? 'translate-x-0' : '-translate-x-full'} {$sidebarCollapsed ? 'w-[4.5rem]' : 'w-64'} bg-gradient-to-b from-neutral-900 to-neutral-950 border-r border-neutral-800 z-50"
    >
        <!-- Header -->
        <div class="relative flex items-center h-14 px-3 border-b border-neutral-800 bg-gradient-to-r from-emerald-500/5 to-transparent">
            <div class="flex items-center space-x-2" class:hidden={$sidebarCollapsed}>
                <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 flex items-center justify-center">
                    <ArrowRightLeft class="w-5 h-5 text-emerald-500/80" />
                </div>
                <div class="flex flex-col">
                    <span class="text-sm font-semibold text-neutral-200 tracking-tight">CryptoArbs</span>
                    <span class="text-xs font-medium text-neutral-500">{userEmail || t.menu.carregando}</span>
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

        <!-- Language Selector -->
        <div class="px-3 py-3 border-b border-neutral-800" class:hidden={$sidebarCollapsed}>
            <LanguageSelector variant="sidebar" />
        </div>

        <!-- Menu -->
        <nav class="flex-1 overflow-y-auto py-2">
            {#each menuSections as section}
                <div class="px-3 mb-2">
                    <span class="text-xs font-semibold text-emerald-500/70 tracking-wider uppercase px-2" class:hidden={$sidebarCollapsed}>
                        {section.title}
                    </span>
                    <div class="mt-1 space-y-0.5">
                        {#each section.items as {name, icon, href, onClick}}
                            <a
                                {href}
                                on:click|preventDefault={onClick || (() => handleNavigation(href))}
                                class="flex items-center px-2 py-1 text-sm text-neutral-300 rounded-lg hover:bg-gradient-to-r hover:from-emerald-500/10 hover:to-transparent group {$page.url.pathname === href ? 'bg-gradient-to-r from-emerald-500/10 to-transparent text-neutral-200' : ''}"
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
        <header class="lg:hidden flex items-center justify-between h-16 px-4 bg-gradient-to-b from-neutral-900 to-neutral-950 border-b border-neutral-800">
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

            <!-- Mobile Language Selector -->
            <div class="lg:hidden">
                <LanguageSelector />
            </div>
        </header>

        <!-- Content -->
        <main class="flex-1 overflow-auto bg-neutral-950 p-6">
            <div class="max-w-5xl mx-auto">
                <slot />
            </div>
        </main>
    </div>
</div>