export const translations = {
    'pt-BR': {
        loading: 'Carregando...',
        // Sidebar
        menu: {
            arbitragens: 'ARBITRAGENS',
            criptomoedas: 'Criptomoedas',
            configuracoes: 'Configurações',
            suporte: 'SUPORTE',
            primeirosPassos: 'Primeiros Passos',
            mentoria: 'Mentoria',
            whatsapp: 'WhatsApp',
            conta: 'CONTA',
            assinatura: 'Assinatura',
            meusDados: 'Meus Dados',
            sair: 'Sair',
            carregando: 'Carregando...',
            erro: {
                carregarDados: 'Erro ao carregar dados do usuário'
            }
        },
        // Auth pages
        auth: {
            login: {
                titulo: 'Faça login para continuar',
                email: 'Email',
                senha: 'Senha',
                entrar: 'Entrar',
                entrando: 'Entrando...',
                criarConta: 'Criar conta',
                esqueceuSenha: 'Esqueceu a senha?'
            },
            cadastro: {
                titulo: 'Crie sua conta',
                nome: 'Nome',
                email: 'Email',
                senha: 'Senha',
                confirmarSenha: 'Confirmar senha',
                whatsapp: 'WhatsApp',
                criar: 'Criar conta',
                criando: 'Criando...',
                jaTemConta: 'Já tem uma conta?',
                entrar: 'Entrar',
                salvar: 'Salvar alterações',
                salvando: 'Salvando...'
            },
            recuperarSenha: {
                titulo: 'Recuperar senha',
                email: 'Email',
                enviar: 'Enviar',
                enviando: 'Enviando...',
                voltar: 'Voltar ao login'
            }
        },
        messages: {
            success: {
                contaCriada: 'Conta criada com sucesso!',
                loginSucesso: 'Login realizado com sucesso!',
                emailRecuperacaoEnviado: 'Email de recuperação enviado com sucesso!',
                dadosAtualizados: 'Dados atualizados com sucesso!'
            },
            error: {
                loginAutomatico: 'Erro ao fazer login automático. Por favor, faça login manualmente.',
                senhasNaoCoincidem: 'As senhas não coincidem.',
                verificarEmail: 'Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.',
                atualizarDados: 'Erro ao atualizar dados. Por favor, tente novamente.',
                semAlteracoes: 'Nenhuma alteração foi feita para salvar.'
            }
        },
        pages: {
            gettingStarted: {
                title: 'Primeiros Passos',
                subtitle: 'Aprenda os fundamentos da arbitragem de criptomoedas no mercado de futuros.',
                importantTip: {
                    title: 'Dica importante',
                    content: 'Comece com pequenas operações para ganhar experiência e entender como o mercado funciona. Use nossa plataforma para identificar oportunidades seguras e sempre faça sua própria análise antes de executar qualquer operação.'
                },
                faqs: [
                    {
                        question: 'O que é arbitragem de criptomoedas?',
                        answer: 'Arbitragem de criptomoedas é uma estratégia de trading que envolve comprar um ativo em uma exchange por um preço mais baixo e vendê-lo em outra exchange por um preço mais alto, lucrando com a diferença. No mercado de futuros, isso pode ser feito através de posições long e short simultâneas em diferentes exchanges.'
                    },
                    {
                        question: 'Como funciona a arbitragem no mercado de futuros?',
                        answer: 'No mercado de futuros, a arbitragem envolve abrir posições opostas (long e short) do mesmo ativo em diferentes exchanges ou mercados. Por exemplo, se o preço do Bitcoin está mais alto no mercado futuro da Exchange A do que na Exchange B, você pode fazer um short na Exchange A e um long na Exchange B, lucrando com a convergência dos preços.'
                    },
                    {
                        question: 'Quais são os riscos envolvidos?',
                        answer: 'Os principais riscos incluem: 1) Risco de liquidez - não conseguir executar as ordens rapidamente o suficiente; 2) Risco de contraparte - problemas com as exchanges; 3) Risco de execução - slippage e taxas podem reduzir ou eliminar o lucro; 4) Risco de mercado - movimentos bruscos podem afetar as posições; 5) Risco técnico - falhas de conexão ou sistema.'
                    },
                    {
                        question: 'Qual é o capital mínimo recomendado?',
                        answer: 'O capital mínimo recomendado varia dependendo das exchanges e dos pares negociados, mas geralmente recomenda-se começar com pelo menos $1000 para cobrir as taxas e ter margem suficiente. É importante considerar que você precisará manter fundos em múltiplas exchanges.'
                    },
                    {
                        question: 'Quais são as melhores exchanges para arbitragem?',
                        answer: 'As melhores exchanges para arbitragem são aquelas com alta liquidez, baixas taxas e boa infraestrutura técnica. Algumas das mais populares incluem Binance Futures, OKX, Bybit e MEXC, pois oferecem uma boa variedade de pares e liquidez suficiente.'
                    },
                    {
                        question: 'Como calcular o lucro potencial?',
                        answer: 'O lucro potencial é calculado subtraindo todas as taxas (trading, withdrawal, network) da diferença de preço entre as exchanges. Por exemplo: se a diferença é de 1% e as taxas totais são 0.2%, seu lucro potencial seria 0.8%. Nossa plataforma já faz esse cálculo automaticamente.'
                    },
                    {
                        question: 'Quanto tempo leva para completar uma arbitragem?',
                        answer: 'Uma operação de arbitragem pode ser completada em segundos ou minutos, dependendo da liquidez do mercado e da velocidade de execução das ordens. No entanto, algumas estratégias podem envolver manter as posições por horas ou dias até que os preços convirjam.'
                    },
                    {
                        question: 'Como gerenciar o risco em operações de arbitragem?',
                        answer: 'O gerenciamento de risco envolve: 1) Diversificar entre diferentes exchanges e pares; 2) Usar apenas uma parte do capital por operação; 3) Definir stop loss para casos de divergência extrema; 4) Monitorar a saúde financeira das exchanges; 5) Manter registros detalhados das operações.'
                    },
                    {
                        question: 'Quais são as principais estratégias de arbitragem?',
                        answer: 'As principais estratégias incluem: 1) Arbitragem spot-futuro - explorar diferenças entre mercados spot e futuros; 2) Arbitragem de funding rate - lucrar com taxas de financiamento; 3) Arbitragem triangular - envolvendo três ou mais mercados; 4) Arbitragem estatística - baseada em desvios estatísticos dos preços.'
                    },
                    {
                        question: 'Como a alavancagem afeta a arbitragem?',
                        answer: 'A alavancagem pode amplificar tanto os lucros quanto as perdas. No mercado de futuros, é comum usar alavancagem para otimizar o capital, mas é crucial usar de forma responsável. Recomenda-se começar com alavancagem baixa (2-3x) e aumentar gradualmente conforme ganha experiência.'
                    }
                ]
            },
            subscription: {
                title: 'Planos de Assinatura',
                subtitle: 'Maximize seus lucros com nossas ferramentas profissionais de arbitragem',
                subscribe: 'Assinar',
                perMonth: 'por mês',
                perQuarter: 'por trimestre',
                perSemester: 'por semestre',
                perYear: 'por ano',
                monthly: {
                    name: 'Mensal',
                    price: '997',
                    description: 'Ideal para quem está começando no mercado de arbitragem e quer validar os resultados mês a mês.'
                },
                quarterly: {
                    name: 'Trimestral',
                    price: '2.797',
                    description: 'Perfeito para traders que já conhecem o mercado e buscam consistência nos resultados com economia.'
                },
                semiannual: {
                    name: 'Semestral',
                    price: '4.297',
                    description: 'Excelente para profissionais que desejam maximizar seus ganhos com estratégias exclusivas de arbitragem.'
                },
                annual: {
                    name: 'Anual',
                    price: '7.997',
                    description: 'A escolha dos traders profissionais que buscam as melhores oportunidades com o maior custo-benefício.'
                },
                savings: {
                    quarterly: 'Economia de 7%',
                    semiannual: 'Economia de 28%',
                    annual: 'Economia de 33%'
                },
                faq: {
                    title: 'Perguntas Frequentes',
                    items: [
                        {
                            question: 'Como funciona o período de teste?',
                            answer: 'Oferecemos 7 dias de teste gratuito em todos os planos. Você pode cancelar a qualquer momento durante este período sem custo algum.'
                        },
                        {
                            question: 'Posso mudar de plano depois?',
                            answer: 'Sim, você pode fazer upgrade ou downgrade do seu plano a qualquer momento. A diferença será calculada proporcionalmente.'
                        },
                        {
                            question: 'Qual a política de reembolso?',
                            answer: 'Oferecemos garantia de reembolso de 7 dias. Se você não estiver satisfeito, devolvemos 100% do seu investimento.'
                        },
                        {
                            question: 'Quais formas de pagamento são aceitas?',
                            answer: 'Aceitamos cartões de crédito, PIX e transferência bancária. Todas as transações são processadas de forma segura.'
                        },
                        {
                            question: 'Preciso fornecer dados pessoais?',
                            answer: 'Sim, precisamos de algumas informações básicas para criar sua conta e emitir a nota fiscal, mas todos os dados são protegidos conforme a LGPD.'
                        }
                    ]
                },
                securePurchase: {
                    title: 'Compra 100% Segura',
                    ssl: 'Ambiente seguro com criptografia SSL',
                    gateway: 'Pagamento processado por gateway homologado',
                    lgpd: 'Dados protegidos conforme LGPD'
                }
            },
            home: {
                title: 'Arbitragem de Futuros',
                subtitle: 'Esta página é atualizada automaticamente.',
                removeOpportunity: 'Remover oportunidade',
                profit: 'lucro',
                volume24h: 'Volume 24h',
                spread: 'Spread',
                price: 'Preço',
                entryValue: 'Valor',
                estimatedProfit: 'Lucro estimado',
                searching: 'Procurando...',
                waitingMessage: 'Não se preocupe, estamos buscando as melhores oportunidades para você',
                tradingPair: 'Par',
                profitAfterFees: 'Lucro após taxas'
            },
            settings: {
                title: 'Configurações',
                subtitle: 'Gerencie suas preferências',
                exchanges: {
                    title: 'Selecione suas exchanges favoritas',
                    defaultDescription: 'Exchange de criptomoedas',
                    descriptions: {
                        binance: 'Exchange global com alta liquidez',
                        mercadoBitcoin: 'Maior exchange brasileira',
                        kucoin: 'Exchange com foco em altcoins',
                        foxbit: 'Exchange brasileira tradicional',
                        okx: 'Exchange com foco em derivativos',
                        novadax: 'Exchange brasileira com foco em usabilidade'
                    }
                },
                saveButton: 'Salvar configurações'
            },
            mentoring: {
                title: 'Mentoria',
                subtitle: 'Aprenda com especialistas',
                hero: {
                    title: 'Transforme seu Conhecimento em Resultados',
                    description: 'Nossa mentoria foi desenvolvida para ajudar você a dominar as técnicas de arbitragem e construir uma operação lucrativa e sustentável no mercado de criptomoedas.',
                    cta: 'Começar Agora'
                },
                benefits: {
                    advancedStrategies: {
                        title: 'Estratégias Avançadas',
                        description: 'Aprenda técnicas exclusivas de arbitragem para maximizar seus resultados'
                    },
                    groupMentoring: {
                        title: 'Mentoria em Grupo',
                        description: 'Participe de sessões semanais com outros traders e aprenda com suas experiências'
                    },
                    flexibleSchedule: {
                        title: 'Horários Flexíveis',
                        description: 'Escolha os melhores horários para participar das sessões de mentoria'
                    },
                    dedicatedSupport: {
                        title: 'Suporte Dedicado',
                        description: 'Acesso direto aos mentores para tirar dúvidas e receber orientações'
                    },
                    updatedContent: {
                        title: 'Conteúdo Atualizado',
                        description: 'Material didático sempre atualizado com as últimas tendências do mercado'
                    },
                    certificate: {
                        title: 'Certificado',
                        description: 'Receba um certificado ao completar o programa de mentoria'
                    }
                },
                cta: {
                    title: 'Pronto para Começar?',
                    description: 'Junte-se a nossa comunidade de traders de sucesso e comece sua jornada rumo à independência financeira.',
                    primary: 'Agendar Mentoria',
                    secondary: 'Saber Mais'
                }
            }
        }
    },
    'en': {
        loading: 'Loading...',
        // Sidebar
        menu: {
            arbitragens: 'ARBITRAJE',
            criptomoedas: 'Cryptocurrencies',
            configuracoes: 'Settings',
            suporte: 'SUPPORT',
            primeirosPassos: 'Getting Started',
            mentoria: 'Mentoring',
            whatsapp: 'WhatsApp',
            conta: 'ACCOUNT',
            assinatura: 'Subscription',
            meusDados: 'My Data',
            sair: 'Logout',
            carregando: 'Loading...',
            erro: {
                carregarDados: 'Error loading user data'
            }
        },
        // Auth pages
        auth: {
            login: {
                titulo: 'Login to continue',
                email: 'Email',
                senha: 'Password',
                entrar: 'Login',
                entrando: 'Logging in...',
                criarConta: 'Create account',
                esqueceuSenha: 'Forgot password?'
            },
            cadastro: {
                titulo: 'Create your account',
                nome: 'Name',
                email: 'Email',
                senha: 'Password',
                confirmarSenha: 'Confirm password',
                whatsapp: 'WhatsApp',
                criar: 'Create account',
                criando: 'Creating...',
                jaTemConta: 'Already have an account?',
                entrar: 'Sign in',
                salvar: 'Save changes',
                salvando: 'Saving...'
            },
            recuperarSenha: {
                titulo: 'Reset password',
                email: 'Email',
                enviar: 'Send',
                enviando: 'Sending...',
                voltar: 'Back to login'
            }
        },
        messages: {
            success: {
                contaCriada: 'Account created successfully!',
                loginSucesso: 'Login successful!',
                emailRecuperacaoEnviado: 'Recovery email sent successfully!',
                dadosAtualizados: 'Data updated successfully!'
            },
            error: {
                loginAutomatico: 'Error during automatic login. Please login manually.',
                senhasNaoCoincidem: 'Passwords do not match.',
                verificarEmail: 'Check your inbox and follow the instructions to reset your password.',
                atualizarDados: 'Error updating data. Please try again.',
                semAlteracoes: 'No changes were made to save.'
            }
        },
        pages: {
            gettingStarted: {
                title: 'Getting Started',
                subtitle: 'Learn the fundamentals of cryptocurrency arbitrage in the futures market.',
                importantTip: {
                    title: 'Important tip',
                    content: 'Start with small operations to gain experience and understand how the market works. Use our platform to identify safe opportunities and always do your own analysis before executing any operation.'
                },
                faqs: [
                    {
                        question: 'What is cryptocurrency arbitrage?',
                        answer: 'Cryptocurrency arbitrage is a trading strategy that involves buying an asset on one exchange at a lower price and selling it on another exchange at a higher price, profiting from the difference. In the futures market, this can be done through simultaneous long and short positions on different exchanges.'
                    },
                    {
                        question: 'How does arbitrage work in the futures market?',
                        answer: 'In the futures market, arbitrage involves opening opposite positions (long and short) of the same asset on different exchanges or markets. For example, if the Bitcoin price is higher in the futures market of Exchange A than in Exchange B, you can short on Exchange A and long on Exchange B, profiting from price convergence.'
                    },
                    {
                        question: 'What are the risks involved?',
                        answer: 'The main risks include: 1) Liquidity risk - not being able to execute orders quickly enough; 2) Counterparty risk - problems with exchanges; 3) Execution risk - slippage and fees can reduce or eliminate profit; 4) Market risk - sudden movements can affect positions; 5) Technical risk - connection or system failures.'
                    },
                    {
                        question: 'What is the recommended minimum capital?',
                        answer: 'The recommended minimum capital varies depending on the exchanges and traded pairs, but it is generally recommended to start with at least $1000 to cover fees and have sufficient margin. It is important to consider that you will need to maintain funds on multiple exchanges.'
                    },
                    {
                        question: 'Which are the best exchanges for arbitrage?',
                        answer: 'The best exchanges for arbitrage are those with high liquidity, low fees, and good technical infrastructure. Some of the most popular ones include Binance Futures, OKX, Bybit, and MEXC, as they offer a good variety of pairs and sufficient liquidity.'
                    },
                    {
                        question: 'How to calculate potential profit?',
                        answer: 'Potential profit is calculated by subtracting all fees (trading, withdrawal, network) from the price difference between exchanges. For example: if the difference is 1% and total fees are 0.2%, your potential profit would be 0.8%. Our platform already does this calculation automatically.'
                    },
                    {
                        question: 'How long does it take to complete an arbitrage?',
                        answer: 'An arbitrage operation can be completed in seconds or minutes, depending on market liquidity and order execution speed. However, some strategies may involve holding positions for hours or days until prices converge.'
                    },
                    {
                        question: 'How to manage risk in arbitrage operations?',
                        answer: 'Risk management involves: 1) Diversifying between different exchanges and pairs; 2) Using only a portion of capital per operation; 3) Setting stop loss for extreme divergence cases; 4) Monitoring exchanges financial health; 5) Maintaining detailed operation records.'
                    },
                    {
                        question: 'What are the main arbitrage strategies?',
                        answer: 'The main strategies include: 1) Spot-futures arbitrage - exploiting differences between spot and futures markets; 2) Funding rate arbitrage - profiting from funding fees; 3) Triangular arbitrage - involving three or more markets; 4) Statistical arbitrage - based on statistical price deviations.'
                    },
                    {
                        question: 'How does leverage affect arbitrage?',
                        answer: 'Leverage can amplify both profits and losses. In the futures market, it is common to use leverage to optimize capital, but it is crucial to use it responsibly. It is recommended to start with low leverage (2-3x) and gradually increase as you gain experience.'
                    }
                ]
            },
            subscription: {
                title: 'Subscription Plans',
                subtitle: 'Maximize your profits with our professional arbitrage tools',
                subscribe: 'Subscribe',
                perMonth: 'per month',
                perQuarter: 'per quarter',
                perSemester: 'per semester',
                perYear: 'per year',
                monthly: {
                    name: 'Monthly',
                    price: '997',
                    description: 'Ideal for those starting in the arbitrage market and want to validate results month by month.'
                },
                quarterly: {
                    name: 'Quarterly',
                    price: '2,797',
                    description: 'Perfect for traders who already know the market and seek consistency in results with savings.'
                },
                semiannual: {
                    name: 'Semiannual',
                    price: '4,297',
                    description: 'Excellent for professionals who want to maximize their earnings with exclusive arbitrage strategies.'
                },
                annual: {
                    name: 'Annual',
                    price: '7,997',
                    description: 'The choice of professional traders who seek the best opportunities with the best cost-benefit.'
                },
                savings: {
                    quarterly: '7% savings',
                    semiannual: '28% savings',
                    annual: '33% savings'
                },
                faq: {
                    title: 'Frequently Asked Questions',
                    items: [
                        {
                            question: 'How does the trial period work?',
                            answer: 'We offer a 7-day free trial on all plans. You can cancel at any time during this period at no cost.'
                        },
                        {
                            question: 'Can I change plans later?',
                            answer: 'Yes, you can upgrade or downgrade your plan at any time. The difference will be calculated proportionally.'
                        },
                        {
                            question: 'What is the refund policy?',
                            answer: 'We offer a 7-day money-back guarantee. If you are not satisfied, we will refund 100% of your investment.'
                        },
                        {
                            question: 'What payment methods are accepted?',
                            answer: 'We accept credit cards, PIX, and bank transfer. All transactions are processed securely.'
                        },
                        {
                            question: 'Do I need to provide personal data?',
                            answer: 'Yes, we need some basic information to create your account and issue the invoice, but all data is protected according to LGPD.'
                        }
                    ]
                },
                securePurchase: {
                    title: '100% Secure Purchase',
                    ssl: 'Secure environment with SSL encryption',
                    gateway: 'Payment processed by approved gateway',
                    lgpd: 'Data protected according to LGPD'
                }
            },
            home: {
                title: 'Futures Arbitrage',
                subtitle: 'This page updates automatically.',
                removeOpportunity: 'Remove opportunity',
                profit: 'profit',
                volume24h: '24h Volume',
                spread: 'Spread',
                price: 'Price',
                entryValue: 'Value',
                estimatedProfit: 'Estimated profit',
                searching: 'Searching...',
                waitingMessage: "Don't worry, we're finding the best opportunities for you",
                tradingPair: 'Pair',
                profitAfterFees: 'Lucro após taxas'
            },
            settings: {
                title: 'Settings',
                subtitle: 'Manage your preferences',
                exchanges: {
                    title: 'Select your favorite exchanges',
                    defaultDescription: 'Cryptocurrency exchange',
                    descriptions: {
                        binance: 'Global exchange with high liquidity',
                        mercadoBitcoin: 'Largest Brazilian exchange',
                        kucoin: 'Exchange focused on altcoins',
                        foxbit: 'Traditional Brazilian exchange',
                        okx: 'Exchange focused on derivatives',
                        novadax: 'Brazilian exchange focused on usability'
                    }
                },
                saveButton: 'Save settings'
            },
            mentoring: {
                title: 'Mentoring',
                subtitle: 'Learn from experts',
                hero: {
                    title: 'Transform Your Knowledge into Results',
                    description: 'Our mentoring was developed to help you master arbitrage techniques and build a profitable and sustainable operation in the cryptocurrency market.',
                    cta: 'Start Now'
                },
                benefits: {
                    advancedStrategies: {
                        title: 'Advanced Strategies',
                        description: 'Learn exclusive arbitrage techniques to maximize your results'
                    },
                    groupMentoring: {
                        title: 'Group Mentoring',
                        description: 'Participate in weekly sessions with other traders and learn from their experiences'
                    },
                    flexibleSchedule: {
                        title: 'Flexible Schedule',
                        description: 'Choose the best times to participate in mentoring sessions'
                    },
                    dedicatedSupport: {
                        title: 'Dedicated Support',
                        description: 'Direct access to mentors to ask questions and receive guidance'
                    },
                    updatedContent: {
                        title: 'Updated Content',
                        description: 'Educational material always updated with the latest market trends'
                    },
                    certificate: {
                        title: 'Certificate',
                        description: 'Receive a certificate upon completing the mentoring program'
                    }
                },
                cta: {
                    title: 'Ready to Start?',
                    description: 'Join our community of successful traders and start your journey towards financial independence.',
                    primary: 'Schedule Mentoring',
                    secondary: 'Learn More'
                }
            }
        }
    },
    'es': {
        loading: 'Cargando...',
        // Sidebar
        menu: {
            arbitragens: 'ARBITRAJE',
            criptomoedas: 'Criptomonedas',
            configuracoes: 'Configuración',
            suporte: 'SOPORTE',
            primeirosPassos: 'Primeros Pasos',
            mentoria: 'Mentoría',
            whatsapp: 'WhatsApp',
            conta: 'CUENTA',
            assinatura: 'Suscripción',
            meusDados: 'Mis Datos',
            sair: 'Salir',
            carregando: 'Cargando...',
            erro: {
                carregarDados: 'Error al cargar datos del usuario'
            }
        },
        // Auth pages
        auth: {
            login: {
                titulo: 'Inicia sesión para continuar',
                email: 'Email',
                senha: 'Contraseña',
                entrar: 'Entrar',
                entrando: 'Entrando...',
                criarConta: 'Crear cuenta',
                esqueceuSenha: '¿Olvidaste tu contraseña?'
            },
            cadastro: {
                titulo: 'Crea tu cuenta',
                nome: 'Nombre',
                email: 'Email',
                senha: 'Contraseña',
                confirmarSenha: 'Confirmar contraseña',
                whatsapp: 'WhatsApp',
                criar: 'Crear cuenta',
                criando: 'Creando...',
                jaTemConta: '¿Ya tienes una cuenta?',
                entrar: 'Iniciar sesión',
                salvar: 'Guardar cambios',
                salvando: 'Guardando...'
            },
            recuperarSenha: {
                titulo: 'Recuperar contraseña',
                email: 'Email',
                enviar: 'Enviar',
                enviando: 'Enviando...',
                voltar: 'Volver al inicio de sesión'
            }
        },
        messages: {
            success: {
                contaCriada: '¡Cuenta creada con éxito!',
                loginSucesso: '¡Inicio de sesión exitoso!',
                emailRecuperacaoEnviado: '¡Correo de recuperación enviado con éxito!',
                dadosAtualizados: '¡Datos actualizados con éxito!'
            },
            error: {
                loginAutomatico: 'Error en el inicio de sesión automático. Por favor, inicie sesión manualmente.',
                senhasNaoCoincidem: 'Las contraseñas no coinciden.',
                verificarEmail: 'Revise su bandeja de entrada y siga las instrucciones para restablecer su contraseña.',
                atualizarDados: 'Error al actualizar datos. Por favor, inténtelo de nuevo.',
                semAlteracoes: 'No se realizaron cambios para guardar.'
            }
        },
        pages: {
            gettingStarted: {
                title: 'Primeros Pasos',
                subtitle: 'Aprenda los fundamentos del arbitraje de criptomonedas en el mercado de futuros.',
                importantTip: {
                    title: 'Consejo importante',
                    content: 'Comience con operaciones pequeñas para ganar experiencia y entender cómo funciona el mercado. Utilice nuestra plataforma para identificar oportunidades seguras y siempre haga su propio análisis antes de ejecutar cualquier operación.'
                },
                faqs: [
                    {
                        question: '¿Qué es el arbitraje de criptomonedas?',
                        answer: 'El arbitraje de criptomonedas es una estrategia de trading que implica comprar un activo en un exchange a un precio más bajo y venderlo en otro exchange a un precio más alto, beneficiándose de la diferencia. En el mercado de futuros, esto se puede hacer a través de posiciones largas y cortas simultáneas en diferentes exchanges.'
                    },
                    {
                        question: '¿Cómo funciona el arbitraje en el mercado de futuros?',
                        answer: 'En el mercado de futuros, el arbitraje implica abrir posiciones opuestas (larga y corta) del mismo activo en diferentes exchanges o mercados. Por ejemplo, si el precio del Bitcoin es más alto en el mercado de futuros del Exchange A que en el Exchange B, puede hacer un corto en el Exchange A y un largo en el Exchange B, beneficiándose de la convergencia de precios.'
                    },
                    {
                        question: '¿Cuáles son los riesgos involucrados?',
                        answer: 'Los principales riesgos incluyen: 1) Riesgo de liquidez - no poder ejecutar órdenes lo suficientemente rápido; 2) Riesgo de contraparte - problemas con los exchanges; 3) Riesgo de ejecución - el deslizamiento y las comisiones pueden reducir o eliminar el beneficio; 4) Riesgo de mercado - movimientos bruscos pueden afectar las posiciones; 5) Riesgo técnico - fallos de conexión o sistema.'
                    },
                    {
                        question: '¿Cuál es el capital mínimo recomendado?',
                        answer: 'El capital mínimo recomendado varía según los exchanges y los pares negociados, pero generalmente se recomienda comenzar con al menos $1000 para cubrir las comisiones y tener suficiente margen. Es importante considerar que necesitará mantener fondos en múltiples exchanges.'
                    },
                    {
                        question: '¿Cuáles son los mejores exchanges para arbitraje?',
                        answer: 'Los mejores exchanges para arbitraje son aquellos con alta liquidez, bajas comisiones y buena infraestructura técnica. Algunos de los más populares incluyen Binance Futures, OKX, Bybit y MEXC, ya que ofrecen una buena variedad de pares y suficiente liquidez.'
                    },
                    {
                        question: '¿Cómo calcular el beneficio potencial?',
                        answer: 'El beneficio potencial se calcula restando todas las comisiones (trading, retiro, red) de la diferencia de precio entre exchanges. Por ejemplo: si la diferencia es del 1% y las comisiones totales son del 0.2%, su beneficio potencial sería del 0.8%. Nuestra plataforma ya hace este cálculo automáticamente.'
                    },
                    {
                        question: '¿Cuánto tiempo lleva completar un arbitraje?',
                        answer: 'Una operación de arbitraje puede completarse en segundos o minutos, dependiendo de la liquidez del mercado y la velocidad de ejecución de las órdenes. Sin embargo, algunas estrategias pueden implicar mantener posiciones durante horas o días hasta que los precios converjan.'
                    },
                    {
                        question: '¿Cómo gestionar el riesgo en operaciones de arbitraje?',
                        answer: 'La gestión de riesgos implica: 1) Diversificar entre diferentes exchanges y pares; 2) Usar solo una parte del capital por operación; 3) Establecer stop loss para casos de divergencia extrema; 4) Monitorear la salud financiera de los exchanges; 5) Mantener registros detallados de las operaciones.'
                    },
                    {
                        question: '¿Cuáles son las principales estrategias de arbitraje?',
                        answer: 'Las principales estrategias incluyen: 1) Arbitraje spot-futuros - explotar diferencias entre mercados spot y futuros; 2) Arbitraje de tasa de financiación - beneficiarse de las tasas de financiación; 3) Arbitraje triangular - involucrando tres o más mercados; 4) Arbitraje estadístico - basado en desviaciones estadísticas de precios.'
                    },
                    {
                        question: '¿Cómo afecta el apalancamiento al arbitraje?',
                        answer: 'El apalancamiento puede amplificar tanto los beneficios como las pérdidas. En el mercado de futuros, es común usar apalancamiento para optimizar el capital, pero es crucial usarlo de manera responsable. Se recomienda comenzar con un apalancamiento bajo (2-3x) y aumentar gradualmente a medida que se gana experiencia.'
                    }
                ]
            },
            subscription: {
                title: 'Planes de Suscripción',
                subtitle: 'Maximiza tus ganancias con nuestras herramientas profesionales de arbitraje',
                subscribe: 'Suscribirse',
                perMonth: 'por mes',
                perQuarter: 'por trimestre',
                perSemester: 'por semestre',
                perYear: 'por año',
                monthly: {
                    name: 'Mensual',
                    price: '997',
                    description: 'Ideal para quienes comienzan en el mercado de arbitraje y quieren validar resultados mes a mes.'
                },
                quarterly: {
                    name: 'Trimestral',
                    price: '2.797',
                    description: 'Perfecto para traders que ya conocen el mercado y buscan consistencia en los resultados con ahorro.'
                },
                semiannual: {
                    name: 'Semestral',
                    price: '4.297',
                    description: 'Excelente para profesionales que desean maximizar sus ganancias con estrategias exclusivas de arbitraje.'
                },
                annual: {
                    name: 'Anual',
                    price: '7.997',
                    description: 'La elección de los traders profesionales que buscan las mejores oportunidades con la mejor relación costo-beneficio.'
                },
                savings: {
                    quarterly: 'Ahorro del 7%',
                    semiannual: 'Ahorro del 28%',
                    annual: 'Ahorro del 33%'
                },
                faq: {
                    title: 'Preguntas Frecuentes',
                    items: [
                        {
                            question: '¿Cómo funciona el período de prueba?',
                            answer: 'Ofrecemos 7 días de prueba gratuita en todos los planes. Puedes cancelar en cualquier momento durante este período sin costo alguno.'
                        },
                        {
                            question: '¿Puedo cambiar de plan después?',
                            answer: 'Sí, puedes hacer upgrade o downgrade de tu plan en cualquier momento. La diferencia se calculará proporcionalmente.'
                        },
                        {
                            question: '¿Cuál es la política de reembolso?',
                            answer: 'Ofrecemos garantía de devolución de 7 días. Si no estás satisfecho, te devolvemos el 100% de tu inversión.'
                        },
                        {
                            question: '¿Qué métodos de pago se aceptan?',
                            answer: 'Aceptamos tarjetas de crédito, PIX y transferencia bancaria. Todas las transacciones se procesan de forma segura.'
                        },
                        {
                            question: '¿Necesito proporcionar datos personales?',
                            answer: 'Sí, necesitamos información básica para crear tu cuenta y emitir la factura, pero todos los datos están protegidos según la LGPD.'
                        }
                    ]
                },
                securePurchase: {
                    title: 'Compra 100% Segura',
                    ssl: 'Entorno seguro con encriptación SSL',
                    gateway: 'Pago procesado por gateway homologado',
                    lgpd: 'Datos protegidos según LGPD'
                }
            },
            home: {
                title: 'Arbitraje de Futuros',
                subtitle: 'Esta página se actualiza automáticamente.',
                removeOpportunity: 'Eliminar oportunidad',
                profit: 'beneficio',
                volume24h: 'Volumen 24h',
                spread: 'Spread',
                price: 'Precio',
                entryValue: 'Valor',
                estimatedProfit: 'Beneficio estimado',
                searching: 'Buscando...',
                waitingMessage: 'No te preocupes, estamos buscando las mejores oportunidades para ti',
                tradingPair: 'Par de trading',
                profitAfterFees: 'Lucro após taxas'
            },
            settings: {
                title: 'Configuraciones',
                subtitle: 'Administra tus preferencias',
                exchanges: {
                    title: 'Selecciona tus exchanges favoritas',
                    defaultDescription: 'Exchange de criptomonedas',
                    descriptions: {
                        binance: 'Exchange global con alta liquidez',
                        mercadoBitcoin: 'Mayor exchange brasileña',
                        kucoin: 'Exchange enfocada en altcoins',
                        foxbit: 'Exchange brasileña tradicional',
                        okx: 'Exchange enfocada en derivados',
                        novadax: 'Exchange brasileña enfocada en usabilidad'
                    }
                },
                saveButton: 'Guardar configuraciones'
            },
            mentoring: {
                title: 'Mentoría',
                subtitle: 'Aprende de expertos',
                hero: {
                    title: 'Transforma tu Conocimiento en Resultados',
                    description: 'Nuestra mentoría fue desarrollada para ayudarte a dominar las técnicas de arbitraje y construir una operación rentable y sostenible en el mercado de criptomonedas.',
                    cta: 'Empezar Ahora'
                },
                benefits: {
                    advancedStrategies: {
                        title: 'Estrategias Avanzadas',
                        description: 'Aprende técnicas exclusivas de arbitraje para maximizar tus resultados'
                    },
                    groupMentoring: {
                        title: 'Mentoría en Grupo',
                        description: 'Participa en sesiones semanales con otros traders y aprende de sus experiencias'
                    },
                    flexibleSchedule: {
                        title: 'Horarios Flexibles',
                        description: 'Elige los mejores horarios para participar en las sesiones de mentoría'
                    },
                    dedicatedSupport: {
                        title: 'Soporte Dedicado',
                        description: 'Acceso directo a los mentores para resolver dudas y recibir orientación'
                    },
                    updatedContent: {
                        title: 'Contenido Actualizado',
                        description: 'Material didáctico siempre actualizado con las últimas tendencias del mercado'
                    },
                    certificate: {
                        title: 'Certificado',
                        description: 'Recibe un certificado al completar el programa de mentoría'
                    }
                },
                cta: {
                    title: '¿Listo para Empezar?',
                    description: 'Únete a nuestra comunidad de traders exitosos y comienza tu camino hacia la independencia financiera.',
                    primary: 'Agendar Mentoría',
                    secondary: 'Saber Más'
                }
            }
        }
    }
}; 