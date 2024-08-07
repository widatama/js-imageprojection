import { defaultClassPrefix, Offset } from './common';

export type SurfaceOptions = {
  classPrefix?: string;
  sourceImage: HTMLImageElement;
  tagName?: string;
};

export class Surface {
  $el: HTMLElement | null;
  readonly $image: HTMLImageElement;
  readonly height: number;
  readonly width: number;

  static readonly elClassName = 'surface';
  static readonly defaultOptions = {
    classPrefix: defaultClassPrefix,
    tagName: 'div',
  };

  constructor(inpOptions: SurfaceOptions, doc = document) {
    const options = { ...Surface.defaultOptions, ...inpOptions };

    this.$image = new Image();
    this.$image.src = options.sourceImage.getAttribute('src') as string;
    this.height = this.$image.height;
    this.width = this.$image.width;

    this.$el = doc.createElement(options.tagName);
    this.$el?.classList.add(`${options.classPrefix}${Surface.elClassName}`);
    this.$el?.setAttribute('height', this.height.toString());
    this.$el?.setAttribute('width', this.width.toString());
  }

  getOffset(): Offset {
    if (this.$el) {
      const domRect = this.$el.getBoundingClientRect();

      return {
        left: domRect.x,
        top: domRect.y,
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
