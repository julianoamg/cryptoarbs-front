export type Language = 'pt-BR' | 'en' | 'es';

export interface FAQ {
    question: string;
    answer: string;
}

export interface ImportantTip {
    title: string;
    content: string;
}

export interface GettingStartedPage {
    title: string;
    subtitle: string;
    importantTip: ImportantTip;
    faqs: FAQ[];
}

export interface MentoringBenefit {
    title: string;
    description: string;
}

export interface MentoringPage {
    title: string;
    subtitle: string;
    hero?: {
        title: string;
        description: string;
        cta: string;
    };
    benefits?: {
        advancedStrategies: MentoringBenefit;
        groupMentoring: MentoringBenefit;
        flexibleSchedule: MentoringBenefit;
        dedicatedSupport: MentoringBenefit;
        updatedContent: MentoringBenefit;
        certificate: MentoringBenefit;
    };
    cta?: {
        title: string;
        description: string;
        primary: string;
        secondary: string;
    };
}

export interface CredentialsPage {
    title: string;
    subtitle: string;
    cardTitle: string;
    addButton: string;
    noCredentials: string;
    addHint: string;
    configuredStatus: string;
    modal: {
        title: string;
        exchange: {
            label: string;
            description: string;
            placeholder: string;
        };
        apiKey: {
            label: string;
            description: string;
        };
        apiSecret: {
            label: string;
            description: string;
        };
        passphrase: {
            label: string;
            description: string;
        };
        buttons: {
            cancel: string;
            save: string;
        };
    };
    fields: {
        apiKey: string;
        apiSecret: string;
        passphrase: string;
    };
    deleteConfirm: string;
    success: {
        added: string;
        removed: string;
    };
}

export interface Pages {
    gettingStarted: GettingStartedPage;
    home: {
        title: string;
        subtitle: string;
        removeOpportunity: string;
        profit: string;
        volume24h: string;
        spread: string;
        price: string;
        entryValue: string;
        estimatedProfit: string;
        fundingRate: string;
        recommendedPosition: string;
        table?: {
            pair: string;
            buyPrice: string;
            sellPrice: string;
            profit: string;
            spread: string;
            gross: string;
            net: string;
            mobileHint: string;
        };
        tradingPair?: string;
        subscription?: {
            title: string;
            description: string;
            button: string;
        };
    };
    settings: {
        title: string;
        subtitle: string;
        exchanges: {
            title: string;
            features: {
                lowFees: string;
                highLiquidity: string;
                multiplePairs: string;
                pixDeposit: string;
                localSupport: string;
                brlCurrency: string;
                altcoins: string;
                staking: string;
                support24_7: string;
                intuitiveInterface: string;
                marginTrading: string;
            };
            descriptions: {
                binance: string;
                mercadoBitcoin: string;
                kucoin: string;
                foxbit: string;
                okx: string;
                novadax: string;
            };
        };
    };
    mentoring: MentoringPage;
    credentials: CredentialsPage;
}

export interface Menu {
    arbitragens: string;
    criptomoedas: string;
    robo: string;
    configuracoes: string;
    suporte: string;
    primeirosPassos: string;
    mentoria: string;
    whatsapp: string;
    conta: string;
    assinatura: string;
    meusDados: string;
    sair: string;
    carregando: string;
    erro: {
        carregarDados: string;
    };
}

export interface Auth {
    login: {
        titulo: string;
        email: string;
        senha: string;
        entrar: string;
        entrando: string;
        criarConta: string;
        esqueceuSenha: string;
    };
    cadastro: {
        titulo: string;
        nome: string;
        email: string;
        senha: string;
        confirmarSenha: string;
        criar: string;
        criando: string;
        jaTemConta: string;
        entrar: string;
    };
    recuperarSenha: {
        titulo: string;
        email: string;
        enviar: string;
        enviando: string;
        voltar: string;
    };
}

export interface Messages {
    success: {
        contaCriada: string;
        loginSucesso: string;
        emailRecuperacaoEnviado: string;
    };
    error: {
        loginAutomatico: string;
        senhasNaoCoincidem: string;
        verificarEmail: string;
    };
}

export interface Translation {
    menu: Menu;
    auth: Auth;
    messages: Messages;
    pages: Pages;
}

export interface Translations {
    'pt-BR': Translation;
    'en': Translation;
    'es': Translation;
} 