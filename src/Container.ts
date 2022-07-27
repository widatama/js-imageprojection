import { Surface } from './Surface';
import { Projection } from './Projection';
import { Viewfinder } from './Viewfinder';

export type ContainerOptions = {
  className?: string;
}

const defaultOptions = {
  className: 'ip-container',
};

export class Container {
  readonly $body: HTMLElement;
  $el: HTMLElement | null;
  readonly $image: HTMLImageElement;
  readonly heightRatio: number;
  readonly widthRatio: number;
  readonly surface: Surface;
  readonly projection: Projection;
  readonly viewfinder: Viewfinder;

  constructor(inpElement: HTMLElement, inpOptions?: ContainerOptions, doc = document) {
    const options = { ...defaultOptions, ...inpOptions };

    this.$el = inpElement;
    this.$body = doc.querySelector('html') as HTMLElement;

    // Container should be relatively positioned, class name is assigned so it can be handled with css
    this.$el.setAttribute('class', options.className);
    this.$image = this.$el.querySelector('img.ip-source-image') as HTMLImageElement;

    // Create surface
    this.surface = new Surface({
      sourceImage: this.$image,
    });

    // Create viewfinder
    this.viewfinder = new Viewfinder({
      size: { height: this.surface.height, width: this.surface.width },
    });

    // Create projection
    this.projection = new Projection({
      imageUrl: "",
      position: { left: this.surface.width + 30, top: 0 }
    });

    // Calculate ratio between projection and surface
    this.heightRatio = this.projection.$image.height / this.surface.height;
    this.widthRatio = this.projection.$image.width / this.surface.width;

    // Build DOM when projection image is loaded
    this.projection.$el?.addEventListener('ip.projection.imageLoaded', this.buildDOM.bind(this));

    // Show/hide the viewfinder and projection when the mouse cursor is inside/outside the surface
    this.surface.$el?.addEventListener('mouseover', this.handleMouseOver.bind(this));
    this.surface.$el?.addEventListener('mouseout', this.handleMouseOut.bind(this));

    // Handle viewfinder and projection display whenever the mouse cursor is moving inside the surface
    this.surface.$el?.addEventListener('mousemove', this.handleMouseMove.bind(this));
  }

  buildDOM() {
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