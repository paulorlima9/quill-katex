import Quill from 'quill';

/**
 * Opções de configuração para o módulo KaTeX
 * @interface KatexModuleOptions
 */
export interface KatexModuleOptions {
  /**
   * Se verdadeiro, adiciona botões à toolbar do Quill automaticamente
   * @default false
   */
  toolbar?: boolean;
  
  /**
   * Permite opções adicionais personalizadas
   */
  [key: string]: any;
}

/**
 * Blot para renderizar fórmulas matemáticas em bloco (display mode)
 * @class KatexBlot
 */
export class KatexBlot {
  /**
   * Cria um elemento HTML para renderizar uma fórmula matemática em bloco
   * @param value - String contendo a fórmula LaTeX
   * @returns Elemento HTML com a fórmula renderizada
   */
  static create(value: string): HTMLElement;
  
  /**
   * Extrai o valor da fórmula de um nó HTML
   * @param node - Elemento HTML contendo a fórmula
   * @returns String da fórmula ou null se não encontrada
   */
  static value(node: HTMLElement): string | null;
}

/**
 * Blot para renderizar fórmulas matemáticas inline
 * @class KatexInlineBlot
 */
export class KatexInlineBlot {
  /**
   * Cria um elemento HTML para renderizar uma fórmula matemática inline
   * @param value - String contendo a fórmula LaTeX
   * @returns Elemento HTML com a fórmula renderizada
   */
  static create(value: string): HTMLElement;
  
  /**
   * Extrai o valor da fórmula de um nó HTML
   * @param node - Elemento HTML contendo a fórmula
   * @returns String da fórmula ou null se não encontrada
   */
  static value(node: HTMLElement): string | null;
}

/**
 * Módulo para adicionar funcionalidades de fórmulas matemáticas ao editor Quill
 * @class KatexModule
 */
export class KatexModule {
  /**
   * Cria uma nova instância do módulo KaTeX
   * @param quill - Instância do editor Quill
   * @param options - Opções de configuração do módulo
   */
  constructor(quill: any, options: KatexModuleOptions);
  
  /**
   * Adiciona botões para inserção de fórmulas à toolbar do Quill
   */
  addToolbarButtons(): void;
  
  /**
   * Manipulador para inserção de fórmulas em bloco
   */
  katexHandler(): void;
  
  /**
   * Manipulador para inserção de fórmulas inline
   */
  katexInlineHandler(): void;
  
  /**
   * Exibe um prompt para inserção de fórmulas
   * @param displayMode - Se verdadeiro, insere fórmula em bloco; se falso, insere inline
   */
  showFormulaInput(displayMode: boolean): void;
}

/**
 * Registra o módulo KaTeX no Quill
 * @param quill - Construtor do Quill
 */
export function registerKatex(quill: typeof Quill): void;
