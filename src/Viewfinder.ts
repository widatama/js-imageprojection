import { defaultClassPrefix, Offset, Size } from './common';

export type ViewfinderOptions = {
  classPrefix?: string;
  size?: {
    height: number;
    width: number;
  };
  tagName?: string;
};

export class Viewfinder {
  $el: HTMLElement | null;
  readonly size: { height: number; width: number };
  readonly className: string;
  position: Offset | Record<string, never>;

  static readonly elClassName = 'viewfinder';
  static readonly defaultOptions = {
    classPrefix: defaultClassPrefix,
    size: {
      height: 100,
      width: 100,
    },
    tagName: 'div',
  };

  constructor(inpOptions: ViewfinderOptions, doc = document) {
    const options = { ...Viewfinder.defaultOptions, ...inpOptions };

    this.size = options.size;
    this.className = `${options.classPrefix}${Viewfinder.elClassName}`;
    this.position = {};

    this.$el = doc.createElement(options.tagName);
    this.$el.classList.add(this.className);
    this.$el.style.height = `${options.size.height.toString()}px`;
    this.$el.style.width = `${options.size.width.toString()}px`;
  }

  // Calculate viewfinder position based on mouse position
  calculatePosition(mousePosition: Offset, math = Math): Offset {
    const position = {
      left: 0,
      top: 0,
    };

    if (this.$el) {
      // Calculate viewfinder position while keeping the mouse pointer at the center of viewfinder
      position.left = (mousePosition.left - (this.$el.getBoundingClientRect().width / 2));
      position.top = (mousePosition.top - (this.$el.getBoundingClientRect().height / 2));

      // Keep viewfinder from getting out of top or left boundaries
      position.left = math.max(position.left, 0);
      position.top = math.max(position.top, 0);

      // Keep viewfinder from getting out of bottom or right boundaries
      position.left = math.min(
        position.left,
        (this.size.width - this.$el.offsetWidth),
      );
      position.top = Math.min(
        position.top,
        (this.size.height - this.$el.offsetHeight),
      );
    }

    return position;
  }

  setPosition(mousePosition: Offset) {
    this.position = this.calculatePosition(mousePosition);

    if (this.$el) {
      this.$el.style.left = `${this.position.left}px`;
      this.$el.style.top = `${this.position.top}px`;
    }
  }

  setSize(size: Size) {
    if (this.$el) {
      this.$el.style.height = `${size.height.toString()}px`;
      this.$el.style.width = `${size.width.toString()}px`;
    }
  }

  show() {
    if (this.$el) {
      this.$el.classList.toggle(this.className + '--visible');
    }
  }

  hide() {
    if (this.$el) {
      this.$el.classList.toggle(this.className + '--visible');
    }
  }

  destroy() {
    this.$el?.remove();
    this.$el = null;
  }
}
