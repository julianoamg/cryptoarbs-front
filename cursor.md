O projeto utiliza SvelteKit, TailwindCSS, LucideIcons, Vite e Yarn para gerenciar as dependencias.
Deve respeitar as boas práticas de acessibilidade, responsividade, SEO, programação clean code e reutilização de código.
Os componentes do sveltekit devem ser criados no diretorio /src/components
Os componentes do sveltekit nao devem utilizar typescript
As cores do tailwind devem ser baseadas em tons de cinza escuro e sem classes com cores hexadecimais
Procure sempre utilizar pouco codigo, de maneira simples e objetiva

Meu package.json contem a seguinte estrutura:
    {"name": "cryptoarbs-front",
    "private": true,
    "version": "0.0.1",
    "type": "module",
    "scripts": {
        "dev": "vite dev",
        "build": "vite build",
        "preview": "vite preview",
        "check": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json",
        "check:watch": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json --watch",
        "lint": "eslint ."
    },
    "devDependencies": {
        "@eslint/compat": "^1.2.3",
        "@sveltejs/adapter-auto": "^3.0.0",
        "@sveltejs/kit": "^2.0.0",
        "@sveltejs/vite-plugin-svelte": "^4.0.0",
        "autoprefixer": "^10.4.20",
        "eslint": "^9.7.0",
        "eslint-plugin-svelte": "^2.36.0",
        "globals": "^15.0.0",
        "svelte": "^5.0.0",
        "svelte-check": "^4.0.0",
        "tailwindcss": "^3.4.9",
        "typescript": "^5.0.0",
        "typescript-eslint": "^8.0.0",
        "vite": "^5.4.11"
    },
    "dependencies": {
        "lucide-svelte": "^0.469.0"
    }

Meu projeto esta estruturado da seguinte forma:
    arduino
    Copy code
    .idea
    .svelte-kit
    node_modules
    src/
    components/
    lib/
    routes/
        app.css
        app.d.ts
        app.html
    static
    .gitignore
    .npmrc
    cursor.md
    eslint.config.js
    package.json
    postcss.config.js
    README.md
    svelte.config.js
    tailwind.config.ts
    tsconfig.json
    vite.config.ts
    yarn.lock


O codigo sempre deve ser escrito em inglês.
O projeto esta traduzido em PT-BR, EN e ES, respeite as strings para sempre serem traduzidas nessas linguagens, suportando as configuracoes atuais do projeto.
Utilizar apenas JS, nada de TS.