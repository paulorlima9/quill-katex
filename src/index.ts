import _Quill from 'quill';
import katex from 'katex';

// Definição de tipos para os Blots
interface _BlotStatic {
  blotName: string;
  tagName: string;
  className?: string;
  create(value: any): HTMLElement;
  value(node: HTMLElement): any;
}

// Blot para renderizar fórmulas matemáticas
class KatexBlot {
  static create(value: string) {
    const node = document.createElement('div');
    node.setAttribute('data-formula', value);
    
    // Renderiza a fórmula matemática usando KaTeX
    const formulaContainer = document.createElement('div');
    katex.render(value, formulaContainer, {
      throwOnError: false,
      displayMode: true
    });
    
    node.appendChild(formulaContainer);
    return node;
  }

  static value(node: HTMLElement) {
    return node.getAttribute('data-formula');
  }
}

// Inline blot para fórmulas inline
class KatexInlineBlot {
  static create(value: string) {
    const node = document.createElement('span');
    node.setAttribute('data-formula', value);
    
    // Renderiza a fórmula matemática inline usando KaTeX
    katex.render(value, node, {
      throwOnError: false,
      displayMode: false
    });
    
    return node;
  }

  static value(node: HTMLElement) {
    return node.getAttribute('data-formula');
  }
}

// Módulo para adicionar botões e funcionalidades ao editor
class KatexModule {
  private quill: any;
  private options: any;

  constructor(quill: any, options: any) {
    this.quill = quill;
    this.options = options || {};
    
    // Adiciona botões à toolbar se especificado nas opções
    if (this.options.toolbar) {
      this.addToolbarButtons();
    }
  }

  addToolbarButtons() {
    const toolbar = this.quill.getModule('toolbar');
    if (toolbar) {
      toolbar.addHandler('katex', this.katexHandler.bind(this));
      toolbar.addHandler('katex-inline', this.katexInlineHandler.bind(this));
    }
  }

  katexHandler() {
    this.showFormulaInput(true);
  }

  katexInlineHandler() {
    this.showFormulaInput(false);
  }

  showFormulaInput(displayMode: boolean) {
    const value = prompt('Digite sua fórmula LaTeX:');
    if (value) {
      const range = this.quill.getSelection(true);
      if (displayMode) {
        this.quill.insertEmbed(range.index, 'katex', value);
        this.quill.setSelection(range.index + 1);
      } else {
        this.quill.insertEmbed(range.index, 'katex-inline', value);
        this.quill.setSelection(range.index + 1);
      }
    }
  }
}

/**
 * Registra o módulo KaTeX no Quill
 */
function registerKatex(Quill: any) {
  // Registra os formatos
  const BlockBlot = Quill.import('blots/block');
  const InlineBlot = Quill.import('blots/inline');
  
  // Estende os blots do Quill
  class QuillKatexBlot extends BlockBlot {
    static create(value: string) {
      return KatexBlot.create(value);
    }
    
    static value(node: HTMLElement) {
      return KatexBlot.value(node);
    }
  }
  
  class QuillKatexInlineBlot extends InlineBlot {
    static create(value: string) {
      return KatexInlineBlot.create(value);
    }
    
    static value(node: HTMLElement) {
      return KatexInlineBlot.value(node);
    }
  }
  
  // Define as propriedades dos blots
  QuillKatexBlot.blotName = 'katex';
  QuillKatexBlot.tagName = 'div';
  QuillKatexBlot.className = 'ql-katex';
  
  QuillKatexInlineBlot.blotName = 'katex-inline';
  QuillKatexInlineBlot.tagName = 'span';
  QuillKatexInlineBlot.className = 'ql-katex-inline';
  
  // Registra os blots e o módulo no Quill
  Quill.register({
    'formats/katex': QuillKatexBlot,
    'formats/katex-inline': QuillKatexInlineBlot,
    'modules/katex': KatexModule
  });
}

export { registerKatex, KatexBlot, KatexInlineBlot, KatexModule };

// Detecta se estamos em um ambiente de navegador com Quill disponível globalmente
if (typeof window !== 'undefined' && (window as any).Quill) {
  registerKatex((window as any).Quill);
}
