import { defaultClassPrefix, Offset } from './common';
import { Surface } from './Surface';
import { Projection } from './Projection';
import { Viewfinder } from './Viewfinder';

export type ContainerOptions = {
  classPrefix?: string;
  projectionImageUrl: string;
  projectionPosition?: Offset;
};

export class Container {
  readonly $body: HTMLElement;
  $el: HTMLElement | null;
  readonly $image: HTMLImageElement;
  heightRatio: number;
  widthRatio: number;
  readonly surface: Surface;
  readonly projection: Projection;
  readonly viewfinder: Viewfinder;

  static readonly elClassName = 'container';
  static readonly defaultOptions = {
    classPrefix: defaultClassPrefix,
  };

  constructor(inpElement: HTMLElement, inpOptions?: ContainerOptions, doc = document) {
    const options = { ...Container.defaultOptions, ...inpOptions };

    this.$el = inpElement;
    this.$body = doc.querySelector('html') as HTMLElement;

    // Class name is assigned to container so it can be styled with css
    this.$el.classList.add(`${options.classPrefix}${Container.elClassName}`);
    // Container should be relatively positioned with proper size
    this.$el.style.position = 'relative';
    this.$el.style.width = 'fit-content';
    this.$image = this.$el.querySelector('img') as HTMLImageElement;

    // Create surface
    this.surface = new Surface({
      classPrefix: options.classPrefix,
      sourceImage: this.$image,
    });

    // Create viewfinder
    this.viewfinder = new Viewfinder({
      classPrefix: options.classPrefix,
      size: { height: this.surface.height, width: this.surface.width },
    });

    // Create projection
    this.projection = new Projection({
      classPrefix: options.classPrefix,
      imageUrl: options.projectionImageUrl as string,
      position: options.projectionPosition,
      size: { height: this.surface.height, width: this.surface.width },
    });

    this.heightRatio = 1;
    this.widthRatio = 1;

    // Build DOM when projection image is loaded
    this.projection.$el?.addEventListener('ip.projection.imageLoaded', this.buildDOM.bind(this));

    // Show/hide the viewfinder and projection when the mouse cursor is inside/outside the surface
    this.surface.$el?.addEventListener('mouseover', this.handleMouseOver.bind(this));
    this.surface.$el?.addEventListener('mouseout', this.handleMouseOut.bind(this));

    // Handle viewfinder and projection display whenever the mouse cursor is moving inside the surface
    this.surface.$el?.addEventListener('mousemove', this.handleMouseMove.bind(this));
  }

  buildDOM() {
    // Calculate ratio between projection and surface
    this.heightRatio = this.projection.$image.height / this.surface.height;
    this.widthRatio = this.projection.$image.width / this.surface.width;

    this.viewfinder.setSize({
      height: this.surface.height / this.heightRatio,
      width: this.surface.width / this.widthRatio,
    });

    this.surface.$el?.appendChild(this.viewfinder.$el as Node);
    this.$el?.prepend(this.surface.$el as Node);
    this.$el?.appendChild(this.projection.$el as Node);
  }

  handleMouseOver() {
    this.viewfinder.show();
    this.projection.show();
  }

  handleMouseOut() {
    this.viewfinder.hide();
    this.projection.hide();
  }

  handleMouseMove(event: MouseEvent) {
    // Adjust viewfinder position as the mouse cursor is moving around the surface
    const mousePosition = {
      left: 0,
      top: 0,
    };
    mousePosition.left = Math.floor(event.clientX - this.surface.getOffset().left + this.$body.scrollLeft);
    mousePosition.top = Math.floor(event.clientY - this.surface.getOffset().top + this.$body.scrollTop);
    this.viewfinder.setPosition(mousePosition);

    // Adjust projection image position as the mouse cursor is moving around the surface
    const projectionImagePosition = {
      left: 0,
      top: 0,
    };
    projectionImagePosition.left = this.viewfinder.position.left * -1 * this.widthRatio;
    projectionImagePosition.top = this.viewfinder.position.top * -1 * this.heightRatio;
    this.projection.setImagePosition(projectionImagePosition);
  }

  destroy() {
    this.surface.destroy();
    this.projection.destroy();
    this.viewfinder.destroy();
    this.$el?.remove();
    this.$el = null;
  }
}
