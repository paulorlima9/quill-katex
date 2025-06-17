import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import 'katex/dist/katex.min.css';

// Importação dinâmica do Quill para evitar problemas de SSR
const QuillEditor = dynamic(
  async () => {
    // Importações dinâmicas para evitar problemas de SSR
    const { default: Quill } = await import('quill');
    
    // No Next.js, os estilos CSS devem ser importados no _app.tsx ou em arquivos de página
    // Não importamos o CSS aqui para evitar erros de TypeScript
    // Em um projeto real, você importaria em _app.tsx: import 'quill/dist/quill.snow.css';
    
    // Importar o plugin quill-katex
    // Usando caminho relativo para desenvolvimento local
    // Em um projeto real, seria: const { registerKatex } = await import('quill-katex');
    const { registerKatex } = await import('../dist');
    
    // Registra o plugin KaTeX no Quill
    registerKatex(Quill);
    
    // Componente do editor
    return function QuillEditorComponent({ onChange }: { onChange?: (content: string) => void }) {
      const editorRef = useRef<HTMLDivElement>(null);
      const quillRef = useRef<any>(null);
      
      useEffect(() => {
        if (editorRef.current && !quillRef.current) {
          // Inicializa o editor Quill com o módulo KaTeX
          quillRef.current = new Quill(editorRef.current, {
            modules: {
              toolbar: {
                container: [
                  [{ 'header': [1, 2, 3, false] }],
                  ['bold', 'italic', 'underline', 'strike'],
                  ['katex', 'katex-inline'],
                  [{ 'color': [] }, { 'background': [] }],
                  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                  ['clean']
                ]
              },
              katex: {
                toolbar: true
              }
            },
            theme: 'snow',
            placeholder: 'Escreva seu conteúdo aqui...'
          });
          
          // Adiciona evento de mudança para o callback
          if (onChange) {
            quillRef.current.on('text-change', () => {
              const content = quillRef.current.root.innerHTML;
              onChange(content);
            });
          }
        }
        
        // Cleanup ao desmontar o componente
        return () => {
          if (quillRef.current) {
            // Remover listeners e limpar recursos se necessário
            quillRef.current.off('text-change');
          }
        };
      }, [onChange]);
      
      return (
        <div className="quill-editor-container">
          <div ref={editorRef} style={{ height: '300px' }} />
        </div>
      );
    };
  },
  { ssr: false } // Importante: desabilita SSR para este componente
);

// Página de exemplo
export default function MathEditorPage() {
  const handleEditorChange = (content: string) => {
    console.log('Editor content:', content);
    // Aqui você pode salvar o conteúdo em um estado ou enviá-lo para uma API
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Editor de Matemática com KaTeX</h1>
      <div className="bg-gray-50 p-4 rounded-lg shadow-md">
        <QuillEditor onChange={handleEditorChange} />
      </div>
      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Instruções</h2>
        <p className="mb-2">Use os botões <strong>KaTeX</strong> e <strong>KaTeX Inline</strong> na barra de ferramentas para inserir fórmulas matemáticas.</p>
        <p className="mb-1">Exemplos de fórmulas:</p>
        <ul className="list-disc pl-5">
          <li><code>E = mc^2</code></li>
          <li><code>\sum_{i=1}^{n} i = \frac{n(n+1)}{2}</code></li>
          <li><code>\int_{a}^{b} f(x) \, dx = F(b) - F(a)</code></li>
        </ul>
      </div>
    </div>
  );
}
