import type { Translations } from './types';

export const translations: Translations = {
    'pt-BR': {
        menu: {
            arbitragens: 'ARBITRAGENS',
            criptomoedas: 'Criptomoedas',
            robo: 'Robô',
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
                criar: 'Criar conta',
                criando: 'Criando...',
                jaTemConta: 'Já tem uma conta?',
                entrar: 'Entrar'
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
                emailRecuperacaoEnviado: 'Email de recuperação enviado com sucesso!'
            },
            error: {
                loginAutomatico: 'Erro ao fazer login automático. Por favor, faça login manualmente.',
                senhasNaoCoincidem: 'As senhas não coincidem.',
                verificarEmail: 'Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.'
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
                    }
                ]
            },
            home: {
                title: 'Arbitragem de Criptomoedas',
                subtitle: 'Esta página é atualizada automaticamente.',
                removeOpportunity: 'Remover oportunidade',
                profit: 'lucro',
                volume24h: 'Volume 24h',
                spread: 'Spread',
                price: 'Preço',
                entryValue: 'Valor de entrada ($)',
                estimatedProfit: 'Lucro estimado'
            },
            settings: {
                title: 'Configurações',
                subtitle: 'Gerencie suas preferências e conexões',
                exchanges: {
                    title: 'Exchanges',
                    features: {
                        lowFees: 'Baixas taxas',
                        highLiquidity: 'Alta liquidez',
                        multiplePairs: 'Múltiplos pares',
                        pixDeposit: 'Depósito via PIX',
                        localSupport: 'Suporte local',
                        brlCurrency: 'Real (BRL)',
                        altcoins: 'Grande variedade',
                        staking: 'Staking',
                        support24_7: 'Suporte 24/7',
                        intuitiveInterface: 'Interface intuitiva',
                        marginTrading: 'Trading com margem'
                    },
                    descriptions: {
                        binance: 'Exchange global com alta liquidez',
                        mercadoBitcoin: 'Maior exchange brasileira',
                        kucoin: 'Exchange com foco em altcoins',
                        foxbit: 'Exchange brasileira tradicional',
                        okx: 'Exchange com foco em derivativos',
                        novadax: 'Exchange brasileira com foco em usabilidade'
                    }
                }
            },
            mentoring: {
                title: 'Mentoria',
                subtitle: 'Aprenda com especialistas'
            },
            subscription: {
                title: 'Planos e Preços',
                subtitle: 'Escolha o plano que melhor se adapta às suas necessidades',
                monthly: {
                    name: 'Mensal',
                    price: '497',
                    description: 'Ideal para quem está começando no mercado de arbitragem e quer validar os resultados mês a mês.'
                },
                quarterly: {
                    name: 'Trimestral',
                    price: '1.197',
                    description: 'Perfeito para traders que já conhecem o mercado e buscam consistência nos resultados com economia.'
                },
                semiannual: {
                    name: 'Semestral',
                    price: '1.697',
                    description: 'Excelente para profissionais que desejam maximizar seus ganhos com estratégias exclusivas de arbitragem.'
                },
                annual: {
                    name: 'Anual',
                    price: '2.697',
                    description: 'A escolha dos traders profissionais que buscam as melhores oportunidades com o maior custo-benefício.'
                },
                perMonth: 'por mês',
                perQuarterly: 'por trimestre',
                perSemiannual: 'por semestre',
                perAnnual: 'por ano',
                subscribe: 'Assinar agora',
                savings: {
                    quarterly: 'Economize 20%',
                    semiannual: 'Economize 43%',
                    annual: 'Economize 55%'
                },
                securePurchase: {
                    title: 'Compra 100% Segura',
                    ssl: 'Conexão SSL Segura',
                    gateway: 'Gateway de Pagamento Confiável',
                    lgpd: 'Dados Protegidos (LGPD)'
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
                        }
                    ]
                }
            }
        }
    },
    'en': {
        menu: {
            arbitragens: 'ARBITRAJE',
            criptomoedas: 'Cryptocurrencies',
            robo: 'Robô',
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
                criar: 'Create account',
                criando: 'Creating...',
                jaTemConta: 'Already have an account?',
                entrar: 'Login'
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
                emailRecuperacaoEnviado: 'Recovery email sent successfully!'
            },
            error: {
                loginAutomatico: 'Error during automatic login. Please login manually.',
                senhasNaoCoincidem: 'Passwords do not match.',
                verificarEmail: 'Check your inbox and follow the instructions to reset your password.'
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
                    }
                ]
            },
            home: {
                title: 'Cryptocurrency Arbitrage',
                subtitle: 'This page updates automatically.',
                removeOpportunity: 'Remove opportunity',
                profit: 'profit',
                volume24h: '24h Volume',
                spread: 'Spread',
                price: 'Price',
                entryValue: 'Entry value ($)',
                estimatedProfit: 'Estimated profit'
            },
            settings: {
                title: 'Settings',
                subtitle: 'Manage your preferences and connections',
                exchanges: {
                    title: 'Exchanges',
                    features: {
                        lowFees: 'Low fees',
                        highLiquidity: 'High liquidity',
                        multiplePairs: 'Multiple pairs',
                        pixDeposit: 'PIX deposit',
                        localSupport: 'Local support',
                        brlCurrency: 'Brazilian Real (BRL)',
                        altcoins: 'Wide variety',
                        staking: 'Staking',
                        support24_7: '24/7 Support',
                        intuitiveInterface: 'Intuitive interface',
                        marginTrading: 'Margin trading'
                    },
                    descriptions: {
                        binance: 'Global exchange with high liquidity',
                        mercadoBitcoin: 'Largest Brazilian exchange',
                        kucoin: 'Exchange focused on altcoins',
                        foxbit: 'Traditional Brazilian exchange',
                        okx: 'Exchange focused on derivatives',
                        novadax: 'Brazilian exchange focused on usability'
                    }
                }
            },
            mentoring: {
                title: 'Mentoring',
                subtitle: 'Learn from experts'
            },
            subscription: {
                title: 'Plans & Pricing',
                subtitle: 'Choose the plan that best fits your needs',
                monthly: {
                    name: 'Monthly',
                    price: '497',
                    description: 'Perfect for those starting in the arbitrage market and want to validate results month by month.'
                },
                quarterly: {
                    name: 'Quarterly',
                    price: '1.197',
                    description: 'Great for traders who know the market and seek consistent results with savings.'
                },
                semiannual: {
                    name: 'Semiannual',
                    price: '1.697',
                    description: 'Excellent for professionals who want to maximize their gains with exclusive arbitrage strategies.'
                },
                annual: {
                    name: 'Annual',
                    price: '2.697',
                    description: 'The choice of professional traders looking for the best opportunities with the best cost-benefit.'
                },
                perMonth: 'per month',
                perQuarterly: 'per quarter',
                perSemiannual: 'per semester',
                perAnnual: 'per year',
                subscribe: 'Subscribe now',
                savings: {
                    quarterly: 'Save 20%',
                    semiannual: 'Save 43%',
                    annual: 'Save 55%'
                },
                securePurchase: {
                    title: '100% Secure Purchase',
                    ssl: 'Secure SSL Connection',
                    gateway: 'Trusted Payment Gateway',
                    lgpd: 'Protected Data (GDPR)'
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
                        }
                    ]
                }
            }
        }
    },
    'es': {
        menu: {
            arbitragens: 'ARBITRAJE',
            criptomoedas: 'Criptomonedas',
            robo: 'Robô',
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
                criar: 'Crear cuenta',
                criando: 'Creando...',
                jaTemConta: '¿Ya tienes una cuenta?',
                entrar: 'Entrar'
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
                emailRecuperacaoEnviado: '¡Correo de recuperación enviado con éxito!'
            },
            error: {
                loginAutomatico: 'Error en el inicio de sesión automático. Por favor, inicie sesión manualmente.',
                senhasNaoCoincidem: 'Las contraseñas no coinciden.',
                verificarEmail: 'Revise su bandeja de entrada y siga las instrucciones para restablecer su contraseña.'
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
                    }
                ]
            },
            home: {
                title: 'Arbitraje de Criptomoedas',
                subtitle: 'Esta página se actualiza automáticamente.',
                removeOpportunity: 'Eliminar oportunidad',
                profit: 'beneficio',
                volume24h: 'Volumen 24h',
                spread: 'Spread',
                price: 'Precio',
                entryValue: 'Valor de entrada ($)',
                estimatedProfit: 'Beneficio estimado'
            },
            settings: {
                title: 'Configuración',
                subtitle: 'Gestiona tus preferencias y conexiones',
                exchanges: {
                    title: 'Exchanges',
                    features: {
                        lowFees: 'Comisiones bajas',
                        highLiquidity: 'Alta liquidez',
                        multiplePairs: 'Múltiples pares',
                        pixDeposit: 'Depósito PIX',
                        localSupport: 'Soporte local',
                        brlCurrency: 'Real brasileño (BRL)',
                        altcoins: 'Gran variedad',
                        staking: 'Staking',
                        support24_7: 'Soporte 24/7',
                        intuitiveInterface: 'Interfaz intuitiva',
                        marginTrading: 'Trading con margen'
                    },
                    descriptions: {
                        binance: 'Exchange global con alta liquidez',
                        mercadoBitcoin: 'Mayor exchange brasileño',
                        kucoin: 'Exchange enfocado en altcoins',
                        foxbit: 'Exchange brasileño tradicional',
                        okx: 'Exchange enfocado en derivados',
                        novadax: 'Exchange brasileño enfocado en usabilidad'
                    }
                }
            },
            mentoring: {
                title: 'Mentoría',
                subtitle: 'Aprende de expertos'
            },
            subscription: {
                title: 'Planes y Precios',
                subtitle: 'Elige el plan que mejor se adapte a tus necesidades',
                monthly: {
                    name: 'Mensual',
                    price: '497',
                    description: 'Ideal para quienes comienzan en el mercado de arbitraje y quieren validar resultados mes a mes.'
                },
                quarterly: {
                    name: 'Trimestral',
                    price: '1.197',
                    description: 'Perfecto para traders que ya conocen el mercado y buscan consistencia en los resultados con ahorro.'
                },
                semiannual: {
                    name: 'Semestral',
                    price: '1.697',
                    description: 'Excelente para profesionales que desean maximizar sus ganancias con estrategias exclusivas de arbitraje.'
                },
                annual: {
                    name: 'Anual',
                    price: '2.697',
                    description: 'La elección de los traders profesionales que buscan las mejores oportunidades con la mejor relación costo-beneficio.'
                },
                perMonth: 'por mes',
                perQuarterly: 'por trimestre',
                perSemiannual: 'por semestre',
                perAnnual: 'por año',
                subscribe: 'Suscribirse ahora',
                savings: {
                    quarterly: 'Ahorra 20%',
                    semiannual: 'Ahorra 43%',
                    annual: 'Ahorra 55%'
                },
                securePurchase: {
                    title: 'Compra 100% Segura',
                    ssl: 'Conexión SSL Segura',
                    gateway: 'Pasarela de Pago Confiable',
                    lgpd: 'Datos Protegidos (LGPD)'
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
                        }
                    ]
                }
            }
        }
    }
}; 