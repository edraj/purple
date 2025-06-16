import type { Attachment } from 'svelte/attachments';

// WATCH: here is one option for drodowns, the other is using DropdownMenu of bits-ui
export interface IExpandsOptions {
  src?: string;
  active?: boolean;
  togglecss?: string;
  hidesrc?: string;
  showsrc?: string;
  isvisible?: boolean;
  onShow?: () => void;
  onHide?: () => void;
  onToggle?: () => void;
}

const defaultOptions: IExpandsOptions = {
  src: '.h',
  showsrc: '.showexpands',
  hidesrc: '.hideexpands',
  active: true,
  togglecss: 'toggle',
  isvisible: false
};


export function expands(type: string = 'poplist', options?: IExpandsOptions): Attachment {
  return (element: HTMLElement) => {
    const _options = { ...defaultOptions, ...options };
    if (type === 'poplist') {
      element.classList.add('poplist');
    }


    function hide(): void {
      if (!_options.active) {
        return;
      }

      // toggle if isvisible was true
      if (_options.isvisible) {
        _options.onToggle && _options.onToggle();
      }
      _options.isvisible = false;

      element.classList.remove(_options.togglecss);
      _options.onHide && _options.onHide();

    }
    function show(): void {
      if (!_options.active) {
        return;
      }
      // toggle if isvisible was false
      if (!_options.isvisible) {
        _options.onToggle && _options.onToggle();
      }

      _options.isvisible = true;
      element.classList.add(_options.togglecss);
      _options.onShow && _options.onShow();
    }
    element.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (target.matches(_options.src) || element.querySelector(_options.src)?.contains(target)) {
        _options.isvisible ? hide() : show();
      }

      if (target.matches(_options.showsrc)) {
        show();
      }
      if (target.matches(_options.hidesrc)) {
        hide();
      }

    });

    if (type === 'poplist') {
      document.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        if (!element.contains(target)) {
          hide();
        }
      });
    }

    return () => {
      // destroy
      hide();
    };
  };
};


