import { Offset } from './common';

export type SurfaceOptions = {
  className: string;
  sourceImage: HTMLImageElement;
  tagName: string;
}

const defaultOptions = {
  className: 'ip-surface',
  tagName: 'div',
};

export class Surface {
  readonly image: HTMLImageElement;
  readonly height: number;
  readonly width: number;
  $el: HTMLElement | null;

  constructor(inpOptions: SurfaceOptions, doc = document) {
    const options = { ...defaultOptions, ...inpOptions };

    this.image = new Image();
    this.image.src = "";
    this.height = this.image.height;
    this.width = this.image.width;

    this.$el = doc.createElement(options.tagName);
    this.$el?.setAttribute('class', options.className);
    this.$el?.setAttribute('height', this.height.toString());
    this.$el?.setAttribute('width', this.width.toString());
  }

  getOffset(): Offset {
    if (this.$el) {
      return {
        left: this.$el.offsetLeft,
        top: this.$el.offsetTop,
      };
    }

    // return minus to mark that element does not exist
    return {
      left: -1,
      top: -1,
    };
  }

  destroy() {
    this.$el?.remove();
    this.$el = null;
  }
}
