# Quill KaTeX Module

Um módulo para o editor Quill.js que permite inserir e renderizar fórmulas matemáticas usando KaTeX. Este módulo é totalmente compatível com TypeScript e JavaScript.

[![npm version](https://img.shields.io/npm/v/quill-katex.svg)](https://www.npmjs.com/package/quill-katex)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Características

- Suporte completo para fórmulas matemáticas usando KaTeX
- Fórmulas em bloco (display mode) e inline
- Botões na toolbar para inserção de fórmulas
- Totalmente tipado com TypeScript
- Compatível com React, Vue, Angular e JavaScript puro
- Funciona com Next.js (incluindo App Router)
- Suporte para SSR (Server-Side Rendering)

## Instalação

```bash
npm install quill-katex katex --save
```

Ou usando yarn:

```bash
yarn add quill-katex katex
```

> **Nota**: Este módulo requer `quill` e `katex` como peer dependencies. Certifique-se de instalá-los se ainda não estiverem instalados no seu projeto.

## Uso

### Com TypeScript/JavaScript (ES Modules)

```typescript
import Quill from 'quill';
import { registerKatex } from 'quill-katex';

// Importe os estilos necessários
import 'quill/dist/quill.snow.css'; // ou outro tema que você esteja usando
import 'katex/dist/katex.min.css';

// Registre o módulo
registerKatex(Quill);

// Inicialize o Quill com o módulo KaTeX
const quill = new Quill('#editor', {
  modules: {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline'],
        ['katex', 'katex-inline'] // Adiciona botões para fórmulas KaTeX
      ],
    },
    katex: {
      toolbar: true // Habilita os handlers da toolbar
    }
  },
  theme: 'snow'
});
```

### Com React

```tsx
import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import { registerKatex } from 'quill-katex';
import 'quill/dist/quill.snow.css';
import 'katex/dist/katex.min.css';

const QuillEditor: React.FC = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<any>(null);
  
  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      // Registra o plugin
      registerKatex(Quill);
      
      // Inicializa o editor
      quillRef.current = new Quill(editorRef.current, {
        modules: {
          toolbar: {
            container: [
              ['bold', 'italic', 'underline'],
              ['katex', 'katex-inline']
            ],
          },
          katex: {
            toolbar: true
          }
        },
        theme: 'snow',
        placeholder: 'Escreva seu conteúdo aqui...'
      });
    }
    
    return () => {
      // Cleanup
    };
  }, []);
  
  return <div ref={editorRef} style={{ height: '300px' }} />;
};

export default QuillEditor;
```

### Com Next.js (App Router)

```tsx
'use client';

import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

// Componente cliente para o editor
const QuillEditor = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<any>(null);
  
  useEffect(() => {
    const loadQuill = async () => {
      if (editorRef.current && !quillRef.current) {
        // Import dinâmico para evitar problemas de SSR
        const Quill = (await import('quill')).default;
        const { registerKatex } = await import('quill-katex');
        
        // Importa os estilos
        await import('quill/dist/quill.snow.css');
        await import('katex/dist/katex.min.css');
        
        // Registra o plugin
        registerKatex(Quill);
        
        // Inicializa o editor
        quillRef.current = new Quill(editorRef.current, {
          modules: {
            toolbar: {
              container: [
                ['bold', 'italic', 'underline'],
                ['katex', 'katex-inline']
              ],
            },
            katex: {
              toolbar: true
            }
          },
          theme: 'snow',
          placeholder: 'Escreva seu conteúdo aqui...'
        });
      }
    };
    
    loadQuill();
  }, []);
  
  return <div ref={editorRef} className="h-64 bg-white" />;
};

export default QuillEditor;
```

### Importação via CDN (HTML)

```html
<!-- Adicione os estilos do Quill e KaTeX -->
<link href="https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/quill@1.3.7/dist/quill.snow.css" rel="stylesheet">

<!-- Elemento do editor -->
<div id="editor" style="height: 300px;"></div>

<!-- Scripts necessários -->
<script src="https://cdn.jsdelivr.net/npm/quill@1.3.7/dist/quill.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/quill-katex@1.0.0/dist/index.js"></script>

<script>
  // O módulo se registra automaticamente quando detecta o Quill global
  
  // Inicialize o Quill com o módulo KaTeX
  var quill = new Quill('#editor', {
    modules: {
      toolbar: {
        container: [
          ['bold', 'italic', 'underline'],
          ['katex', 'katex-inline']
        ],
      },
      katex: {
        toolbar: true
      }
    },
    theme: 'snow',
    placeholder: 'Escreva seu conteúdo aqui...'
  });
</script>
```

## Personalização

Você pode personalizar o comportamento do plugin através das opções:

```typescript
const quill = new Quill('#editor', {
  modules: {
    katex: {
      toolbar: true, // Habilita os botões na toolbar
      // Outras opções podem ser adicionadas aqui
    }
  }
});
```

## Estilos

Para garantir que as fórmulas sejam exibidas corretamente, importe os estilos do KaTeX:

```typescript
import 'katex/dist/katex.min.css';
```

Ou via HTML:

```html
<link href="https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css" rel="stylesheet">
```

## API

### `registerKatex(Quill)`

Registra o plugin no Quill.

### Classes e Componentes Exportados

```typescript
import { registerKatex, KatexBlot, KatexInlineBlot, KatexModule } from 'quill-katex';
```

- `registerKatex`: Função para registrar o plugin no Quill
- `KatexBlot`: Classe para renderização de fórmulas em bloco
- `KatexInlineBlot`: Classe para renderização de fórmulas inline
- `KatexModule`: Módulo para adicionar funcionalidades ao editor

### Formatos

- `katex`: Para fórmulas em bloco (display mode)
- `katex-inline`: Para fórmulas inline

## Exemplos

O pacote inclui exemplos de integração com:

- HTML puro via CDN
- React com Vite
- Next.js

Você pode encontrar esses exemplos na pasta `examples/` do repositório.

## Compatibilidade

- Quill.js: v1.3.0 ou superior
- KaTeX: v0.13.0 ou superior
- Navegadores modernos (Chrome, Firefox, Safari, Edge)
- TypeScript: v4.0 ou superior

## Contribuindo

Contribuições são bem-vindas! Por favor, sinta-se à vontade para enviar pull requests ou abrir issues.

## Licença

MIT
