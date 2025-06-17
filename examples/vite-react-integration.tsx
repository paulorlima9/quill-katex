import React, { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import { registerKatex } from 'quill-katex';
import 'quill/dist/quill.snow.css';
import 'katex/dist/katex.min.css';

// Registra o módulo KaTeX no Quill
registerKatex(Quill);

// Componente do editor
interface QuillEditorProps {
  initialValue?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
}

const QuillEditor: React.FC<QuillEditorProps> = ({ 
  initialValue = '', 
  onChange,
  placeholder = 'Escreva seu conteúdo aqui...'
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<any>(null);
  const [editorContent, setEditorContent] = useState<string>(initialValue);
  
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
        placeholder
      });
      
      // Define o conteúdo inicial se fornecido
      if (initialValue) {
        quillRef.current.clipboard.dangerouslyPasteHTML(initialValue);
      }
      
      // Adiciona evento de mudança para o callback
      quillRef.current.on('text-change', () => {
        const content = quillRef.current.root.innerHTML;
        setEditorContent(content);
        if (onChange) {
          onChange(content);
        }
      });
    }
    
    // Cleanup ao desmontar o componente
    return () => {
      if (quillRef.current) {
        // Limpa os eventos
        quillRef.current.off('text-change');
      }
    };
  }, [initialValue, onChange, placeholder]);
  
  return (
    <div className="quill-editor-wrapper">
      <div ref={editorRef} className="quill-editor" style={{ height: '300px' }} />
      
      {/* Preview do conteúdo (opcional) */}
      {editorContent && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Preview:</h3>
          <div 
            className="preview-content p-4 border rounded bg-white" 
            dangerouslySetInnerHTML={{ __html: editorContent }}
          />
        </div>
      )}
    </div>
  );
};

// Componente da página principal
function App() {
  const [savedContent, setSavedContent] = useState<string>('');
  
  const handleEditorChange = (content: string) => {
    // Aqui você pode processar o conteúdo conforme necessário
    console.log('Editor content updated');
  };
  
  const handleSave = () => {
    // Salva o conteúdo atual do editor
    const editor = document.querySelector('.ql-editor');
    if (editor) {
      setSavedContent(editor.innerHTML);
      alert('Conteúdo salvo com sucesso!');
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Editor de Matemática com KaTeX</h1>
      <p className="text-gray-600 mb-6">Usando Quill, KaTeX e React com Vite</p>
      
      <div className="bg-gray-50 p-4 rounded-lg shadow-md">
        <QuillEditor 
          onChange={handleEditorChange} 
          placeholder="Escreva seu texto e fórmulas matemáticas aqui..."
        />
        
        <div className="mt-4 flex justify-end">
          <button 
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Salvar Conteúdo
          </button>
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Instruções</h2>
        <p className="mb-2">Use os botões <strong>KaTeX</strong> e <strong>KaTeX Inline</strong> na barra de ferramentas para inserir fórmulas matemáticas.</p>
        <p className="mb-1">Exemplos de fórmulas:</p>
        <ul className="list-disc pl-5 mb-4">
          <li><code>E = mc^2</code></li>
          <li><code>\sum_{i=1}^{n} i = \frac{n(n+1)}{2}</code></li>
          <li><code>\int_{a}^{b} f(x) \, dx = F(b) - F(a)</code></li>
        </ul>
      </div>
      
      {savedContent && (
        <div className="mt-8 p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Conteúdo Salvo</h2>
          <div 
            className="saved-content p-4 bg-white rounded" 
            dangerouslySetInnerHTML={{ __html: savedContent }}
          />
        </div>
      )}
    </div>
  );
}

export default App;

// Para usar em um projeto Vite, adicione este arquivo de configuração:
// vite.config.ts
/*
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Adicione aliases se necessário
    },
  },
})
*/