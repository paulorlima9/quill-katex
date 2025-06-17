# Contributing to Quill-KaTeX

Obrigado pelo seu interesse em contribuir para o Quill-KaTeX! Este documento fornece diretrizes para contribuir com o projeto.

## Código de Conduta

Este projeto adota o [Contributor Covenant](https://www.contributor-covenant.org/) como código de conduta. Esperamos que todos os participantes sigam estas diretrizes ao interagir com o projeto.

## Como Contribuir

### Reportando Bugs

Se você encontrou um bug, por favor abra uma issue com os seguintes detalhes:

- Título claro e descritivo
- Passos detalhados para reproduzir o problema
- Comportamento esperado vs. comportamento atual
- Capturas de tela (se aplicável)
- Ambiente (navegador, versão do Quill, versão do KaTeX)

### Sugerindo Melhorias

Para sugerir melhorias, abra uma issue descrevendo:

- Sua ideia de melhoria
- Por que isso seria útil
- Como você imagina que isso funcionaria

### Pull Requests

1. Faça um fork do repositório
2. Clone seu fork: `git clone https://github.com/seu-usuario/quill-katex.git`
3. Crie uma branch para sua feature: `git checkout -b feature/minha-feature`
4. Instale as dependências: `npm install`
5. Faça suas alterações
6. Execute `npm run lint` e `npm run build` para garantir que tudo está funcionando
7. Commit suas alterações: `git commit -m 'Adiciona minha feature'`
8. Push para a branch: `git push origin feature/minha-feature`
9. Abra um Pull Request

## Ambiente de Desenvolvimento

```bash
# Instalar dependências
npm install

# Compilar em modo de desenvolvimento com watch
npm run dev

# Compilar para produção
npm run build

# Executar linting
npm run lint
```

## Estrutura do Projeto

```
quill-katex/
├── dist/           # Código compilado (gerado)
├── examples/       # Exemplos de uso
├── src/            # Código fonte
│   ├── index.ts    # Ponto de entrada principal
│   └── index.d.ts  # Definições de tipos
├── .eslintrc.js    # Configuração do ESLint
├── tsconfig.json   # Configuração do TypeScript
└── package.json    # Dependências e scripts
```

## Convenções de Código

- Use TypeScript para todo o código
- Siga o estilo de código existente
- Adicione comentários para código complexo
- Mantenha a compatibilidade com versões anteriores
- Escreva testes para novas funcionalidades (quando aplicável)

## Licença

Ao contribuir para este projeto, você concorda que suas contribuições serão licenciadas sob a mesma licença MIT do projeto.