export default class Cover extends HTMLElement {
  constructor () {
    super();
    this.render = () => {
      this.i = `Cover-${[this.centered, this.space, this.minHeight, this.noPad].join('')}`;
      this.dataset.i = this.i;
      if (!document.getElementById(this.i)) {
        const styleEl = document.createElement('style');
        styleEl.id = this.i;
        styleEl.innerHTML = `
          [data-i="${this.i}"] {
            min-height: ${this.minHeight};
            padding: ${!this.noPad ? this.space : '0'};
          }

          [data-i="${this.i}"] > * {
            margin-block: ${this.space};
          }

          [data-i="${this.i}"] > :first-child:not(${this.centered}) {
            margin-block-start: 0;
          }

          [data-i="${this.i}"] > ${this.centered} {
            margin-block: auto;
          }
        `.replace(/\s\s+/g, ' ').trim();
        document.head.appendChild(styleEl);
      }
    };
  }

  get centered () {
    return this.getAttribute('centered') || '.center-el';
  }

  set centered (val) {
    return this.setAttribute('centered', val);
  }

  get space () {
    return this.getAttribute('space') || 'var(--s1)';
  }

  set space (val) {
    return this.setAttribute('space', val);
  }

  get minHeight () {
    return this.getAttribute('minHeight') || '100vh';
  }

  set minHeight (val) {
    return this.setAttribute('minHeight', val);
  }

  get noPad () {
    return this.hasAttribute('noPad');
  }

  set noPad (val) {
    if (val) {
      return this.setAttribute('noPad');
    }

    return this.removeAttribute('noPad');
  }

  static get observedAttributes () {
    return ['centered', 'space', 'minHeight', 'noPad'];
  }

  connectedCallback () {
    this.render();
  }

  attributeChangedCallback () {
    this.render();
  }
}

if ('customElements' in window) {
  customElements.define('cover-l', Cover);
}
