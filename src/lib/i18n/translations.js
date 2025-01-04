export const translations = {
    'pt-BR': {
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
            home: {
                title: 'Arbitragem de Futuros',
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
            }
        }
    },
    'en': {
        // Sidebar
        menu: {
            arbitragens: 'ARBITRAGE',
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
            home: {
                title: 'Futures Arbitrage',
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
            }
        }
    },
    'es': {
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
            home: {
                title: 'Arbitraje de Futuros',
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
            }
        }
    }
}; 