import { defaultClassPrefix, Offset, Size } from './common';

export type ProjectionOptions = {
  classPrefix?: string;
  imageUrl: string;
  position?: Offset;
  size?: Size,
  tagName?: string;
};

export class Projection {
  $el: HTMLElement | null;
  $image: HTMLImageElement;
  readonly className: string;
  readonly width: number;
  readonly height: number;

  static readonly elClassName = 'projection';
  static readonly defaultOptions = {
    classPrefix: defaultClassPrefix,
    size: {
      height: 0,
      width: 0,
    },
    tagName: 'div',
  };

  constructor(inpOptions: ProjectionOptions, glbl = window) {
    const options = { ...Projection.defaultOptions, ...inpOptions };

    this.className = `${options.classPrefix}${Projection.elClassName}`;
    this.$el = glbl.document.createElement(options.tagName);
    this.$el.classList.add(this.className);
    if (options.position) {
      this.$el.style.left = options.position.left.toString();
      this.$el.style.top = options.position.top.toString();
    }

    this.$image = new Image();
    this.$image.src = options.imageUrl;
    this.width = options.size.width;
    this.height = options.size.height;

    this.$image.onload = () => {
      if (this.$el) {
        this.$el.style['background-image'] = `url('${this.$image.src}')`;
        this.$el.style['background-repeat'] = 'no-repeat';

        const event = new glbl.CustomEvent('ip.projection.imageLoaded', { bubbles: true });

        this.$el?.dispatchEvent(event);
      }
    };
  }

  setImagePosition(position: Offset) {
    if (this.$el) {
      this.$el.style['background-position'] = `${position.left}px ${position.top}px`;
    }
  }

  show() {
    if (this.$el) {
      this.$el.classList.toggle(this.className + '--visible');
      this.$el.style.height = this.height.toString();
      this.$el.style.width = this.width.toString();
    }
  }

  hide() {
    if (this.$el) {
      this.$el.classList.toggle(this.className + '--visible');
      this.$el.style.height = '0';
      this.$el.style.width = '0';
    }
  }

  destroy() {
    this.$el?.remove();
    this.$el = null;
  }
}
