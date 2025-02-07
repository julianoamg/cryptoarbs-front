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
            arbify: {
                title: 'Configuração do Robô',
                subtitle: 'Configure os parâmetros do seu robô de arbitragem',
                basicSettings: 'Configurações Básicas',
                robotName: 'Nome do Robô',
                enabled: 'Ativo',
                exchanges: 'Exchanges',
                pairs: 'Pares',
                strategy: 'Estratégia',
                tradingParameters: 'Parâmetros de Trading',
                minSpread: 'Spread Mínimo (%)',
                maxSpread: 'Spread Máximo (%)',
                minVolume: 'Volume Mínimo (USDT)',
                maxVolume: 'Volume Máximo (USDT)',
                minProfit: 'Lucro Mínimo (%)',
                maxLoss: 'Perda Máxima (%)',
                riskManagement: 'Gerenciamento de Risco',
                stopLoss: 'Stop Loss (%)',
                takeProfit: 'Take Profit (%)',
                trailingStop: 'Stop Móvel',
                trailingStopDistance: 'Distância do Stop Móvel (%)',
                maxPositions: 'Máximo de Posições',
                maxDailyTrades: 'Máximo de Trades Diários',
                maxDailyLoss: 'Perda Máxima Diária (%)',
                maxDrawdown: 'Drawdown Máximo (%)',
                positionSize: 'Tamanho da Posição (USDT)',
                leverageLevel: 'Alavancagem',
                save: 'Salvar Configurações',
                saving: 'Salvando...'
            }
        }
    },
    'en': {
        menu: {
            arbitragens: 'ARBITRAGE',
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
            arbify: {
                title: 'Configuração do Robô',
                subtitle: 'Configure os parâmetros do seu robô de arbitragem',
                basicSettings: 'Configurações Básicas',
                robotName: 'Nome do Robô',
                enabled: 'Ativo',
                exchanges: 'Exchanges',
                pairs: 'Pares',
                strategy: 'Estratégia',
                tradingParameters: 'Parâmetros de Trading',
                minSpread: 'Spread Mínimo (%)',
                maxSpread: 'Spread Máximo (%)',
                minVolume: 'Volume Mínimo (USDT)',
                maxVolume: 'Volume Máximo (USDT)',
                minProfit: 'Lucro Mínimo (%)',
                maxLoss: 'Perda Máxima (%)',
                riskManagement: 'Gerenciamento de Risco',
                stopLoss: 'Stop Loss (%)',
                takeProfit: 'Take Profit (%)',
                trailingStop: 'Stop Móvel',
                trailingStopDistance: 'Distância do Stop Móvel (%)',
                maxPositions: 'Máximo de Posições',
                maxDailyTrades: 'Máximo de Trades Diários',
                maxDailyLoss: 'Perda Máxima Diária (%)',
                maxDrawdown: 'Drawdown Máximo (%)',
                positionSize: 'Tamanho da Posição (USDT)',
                leverageLevel: 'Alavancagem',
                save: 'Salvar Configurações',
                saving: 'Salvando...'
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
            arbify: {
                title: 'Configuração do Robô',
                subtitle: 'Configure os parâmetros do seu robô de arbitragem',
                basicSettings: 'Configurações Básicas',
                robotName: 'Nome do Robô',
                enabled: 'Ativo',
                exchanges: 'Exchanges',
                pairs: 'Pares',
                strategy: 'Estratégia',
                tradingParameters: 'Parâmetros de Trading',
                minSpread: 'Spread Mínimo (%)',
                maxSpread: 'Spread Máximo (%)',
                minVolume: 'Volume Mínimo (USDT)',
                maxVolume: 'Volume Máximo (USDT)',
                minProfit: 'Lucro Mínimo (%)',
                maxLoss: 'Perda Máxima (%)',
                riskManagement: 'Gerenciamento de Risco',
                stopLoss: 'Stop Loss (%)',
                takeProfit: 'Take Profit (%)',
                trailingStop: 'Stop Móvel',
                trailingStopDistance: 'Distância do Stop Móvel (%)',
                maxPositions: 'Máximo de Posições',
                maxDailyTrades: 'Máximo de Trades Diários',
                maxDailyLoss: 'Perda Máxima Diária (%)',
                maxDrawdown: 'Drawdown Máximo (%)',
                positionSize: 'Tamanho da Posição (USDT)',
                leverageLevel: 'Alavancagem',
                save: 'Salvar Configurações',
                saving: 'Salvando...'
            }
        }
    }
}; 