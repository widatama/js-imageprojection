"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };

  // src/common.ts
  var defaultClassPrefix = "ip-";

  // src/Surface.ts
  var _Surface = class {
    constructor(inpOptions, doc = document) {
      __publicField(this, "$el");
      __publicField(this, "$image");
      __publicField(this, "height");
      __publicField(this, "width");
      const options = { ..._Surface.defaultOptions, ...inpOptions };
      this.$image = new Image();
      this.$image.src = options.sourceImage.getAttribute("src");
      this.height = this.$image.height;
      this.width = this.$image.width;
      this.$el = doc.createElement(options.tagName);
      this.$el?.classList.add(`${options.classPrefix}${_Surface.elClassName}`);
      this.$el?.setAttribute("height", this.height.toString());
      this.$el?.setAttribute("width", this.width.toString());
    }
    getOffset() {
      if (this.$el) {
        const domRect = this.$el.getBoundingClientRect();
        return {
          left: domRect.x,
          top: domRect.y
        };
      }
      return {
        left: -1,
        top: -1
      };
    }
    destroy() {
      this.$el?.remove();
      this.$el = null;
    }
  };
  var Surface = _Surface;
  __publicField(Surface, "elClassName", "surface");
  __publicField(Surface, "defaultOptions", {
    classPrefix: defaultClassPrefix,
    tagName: "div"
  });

  // src/Projection.ts
  var _Projection = class {
    constructor(inpOptions, glbl = window) {
      __publicField(this, "$el");
      __publicField(this, "$image");
      __publicField(this, "className");
      __publicField(this, "width");
      __publicField(this, "height");
      const options = { ..._Projection.defaultOptions, ...inpOptions };
      this.className = `${options.classPrefix}${_Projection.elClassName}`;
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
          this.$el.style["background-image"] = `url('${this.$image.src}')`;
          this.$el.style["background-repeat"] = "no-repeat";
          const event = new glbl.CustomEvent("ip.projection.imageLoaded", { bubbles: true });
          this.$el?.dispatchEvent(event);
        }
      };
    }
    setImagePosition(position) {
      if (this.$el) {
        this.$el.style["background-position"] = `${position.left}px ${position.top}px`;
      }
    }
    show() {
      if (this.$el) {
        this.$el.classList.toggle(this.className + "--visible");
        this.$el.style.height = this.height.toString();
        this.$el.style.width = this.width.toString();
      }
    }
    hide() {
      if (this.$el) {
        this.$el.classList.toggle(this.className + "--visible");
        this.$el.style.height = "0";
        this.$el.style.width = "0";
      }
    }
    destroy() {
      this.$el?.remove();
      this.$el = null;
    }
  };
  var Projection = _Projection;
  __publicField(Projection, "elClassName", "projection");
  __publicField(Projection, "defaultOptions", {
    classPrefix: defaultClassPrefix,
    size: {
      height: 0,
      width: 0
    },
    tagName: "div"
  });

  // src/Viewfinder.ts
  var _Viewfinder = class {
    constructor(inpOptions, doc = document) {
      __publicField(this, "$el");
      __publicField(this, "size");
      __publicField(this, "className");
      __publicField(this, "position");
      const options = { ..._Viewfinder.defaultOptions, ...inpOptions };
      this.size = options.size;
      this.className = `${options.classPrefix}${_Viewfinder.elClassName}`;
      this.position = {};
      this.$el = doc.createElement(options.tagName);
      this.$el.classList.add(this.className);
      this.$el.style.height = `${options.size.height.toString()}px`;
      this.$el.style.width = `${options.size.width.toString()}px`;
    }
    calculatePosition(mousePosition, math = Math) {
      const position = {
        left: 0,
        top: 0
      };
      if (this.$el) {
        position.left = mousePosition.left - this.$el.getBoundingClientRect().width / 2;
        position.top = mousePosition.top - this.$el.getBoundingClientRect().height / 2;
        position.left = math.max(position.left, 0);
        position.top = math.max(position.top, 0);
        position.left = math.min(position.left, this.size.width - this.$el.offsetWidth);
        position.top = Math.min(position.top, this.size.height - this.$el.offsetHeight);
      }
      return position;
    }
    setPosition(mousePosition) {
      this.position = this.calculatePosition(mousePosition);
      if (this.$el) {
        this.$el.style.left = `${this.position.left}px`;
        this.$el.style.top = `${this.position.top}px`;
      }
    }
    setSize(size) {
      if (this.$el) {
        this.$el.style.height = `${size.height.toString()}px`;
        this.$el.style.width = `${size.width.toString()}px`;
      }
    }
    show() {
      if (this.$el) {
        this.$el.classList.toggle(this.className + "--visible");
      }
    }
    hide() {
      if (this.$el) {
        this.$el.classList.toggle(this.className + "--visible");
      }
    }
    destroy() {
      this.$el?.remove();
      this.$el = null;
    }
  };
  var Viewfinder = _Viewfinder;
  __publicField(Viewfinder, "elClassName", "viewfinder");
  __publicField(Viewfinder, "defaultOptions", {
    classPrefix: defaultClassPrefix,
    size: {
      height: 100,
      width: 100
    },
    tagName: "div"
  });

  // src/Container.ts
  var _Container = class {
    constructor(inpElement, inpOptions, doc = document) {
      __publicField(this, "$body");
      __publicField(this, "$el");
      __publicField(this, "$image");
      __publicField(this, "heightRatio");
      __publicField(this, "widthRatio");
      __publicField(this, "surface");
      __publicField(this, "projection");
      __publicField(this, "viewfinder");
      const options = { ..._Container.defaultOptions, ...inpOptions };
      this.$el = inpElement;
      this.$body = doc.querySelector("html");
      this.$el.classList.add(`${options.classPrefix}${_Container.elClassName}`);
      this.$el.style.position = "relative";
      this.$el.style.width = "fit-content";
      this.$image = this.$el.querySelector("img");
      this.surface = new Surface({
        classPrefix: options.classPrefix,
        sourceImage: this.$image
      });
      this.viewfinder = new Viewfinder({
        classPrefix: options.classPrefix,
        size: { height: this.surface.height, width: this.surface.width }
      });
      this.projection = new Projection({
        classPrefix: options.classPrefix,
        imageUrl: options.projectionImageUrl,
        position: options.projectionPosition,
        size: { height: this.surface.height, width: this.surface.width }
      });
      this.heightRatio = 1;
      this.widthRatio = 1;
      this.projection.$el?.addEventListener("ip.projection.imageLoaded", this.buildDOM.bind(this));
      this.surface.$el?.addEventListener("mouseover", this.handleMouseOver.bind(this));
      this.surface.$el?.addEventListener("mouseout", this.handleMouseOut.bind(this));
      this.surface.$el?.addEventListener("mousemove", this.handleMouseMove.bind(this));
    }
    buildDOM() {
      this.heightRatio = this.projection.$image.height / this.surface.height;
      this.widthRatio = this.projection.$image.width / this.surface.width;
      this.viewfinder.setSize({
        height: this.surface.height / this.heightRatio,
        width: this.surface.width / this.widthRatio
      });
      this.surface.$el?.appendChild(this.viewfinder.$el);
      this.$el?.prepend(this.surface.$el);
      this.$el?.appendChild(this.projection.$el);
    }
    handleMouseOver() {
      this.viewfinder.show();
      this.projection.show();
    }
    handleMouseOut() {
      this.viewfinder.hide();
      this.projection.hide();
    }
    handleMouseMove(event) {
      const mousePosition = {
        left: 0,
        top: 0
      };
      mousePosition.left = Math.floor(event.clientX - this.surface.getOffset().left + this.$body.scrollLeft);
      mousePosition.top = Math.floor(event.clientY - this.surface.getOffset().top + this.$body.scrollTop);
      this.viewfinder.setPosition(mousePosition);
      const projectionImagePosition = {
        left: 0,
        top: 0
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
  };
  var Container = _Container;
  __publicField(Container, "elClassName", "container");
  __publicField(Container, "defaultOptions", {
    classPrefix: defaultClassPrefix
  });

  // preview/javascript/app.ts
  var run = () => {
    const $container1 = document.querySelector(".wrap-1");
    new Container($container1, { projectionImageUrl: $container1.dataset.projectionImageUrl });
    const $container2 = document.querySelector(".wrap-2");
    new Container($container2, { projectionImageUrl: $container2.dataset.projectionImageUrl, projectionPosition: { top: -400, left: 0 } });
  };
  document.addEventListener("DOMContentLoaded", run);
})();
