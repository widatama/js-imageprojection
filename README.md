Simple image projection in vanilla Javascript. [See the demo](http://widatama.github.io/js-imageprojection).

![Image Projection Diagram](/preview/images/diagram.jpg "Image Projection Diagram")

Whenever the surface is hovered, the viewfinder and the projection show up. Everything covered by the viewfinder is shown as the projection.

## Usage

### Install package

Package is hosted in github https://github.com/widatama/js-imageprojection/pkgs/npm/js-imageprojection

### Prepare HTML

Create a `div` with an `img` inside it. This `div` will be the container and the `img` will be used as the image for the surface. The url for projection image is also needed, in this example it is provided as a data attribute in the `div`.
```html
<div class="wrap" data-projection-image-url="images/sample.jpg">
  <img src="images/sample-halved.jpg"/>
</div>
```

### Prepare CSS

The HTML elements will need to be styled, here is an example of how to do it. The class prefix `ip-` can be changed with javascript.

In general, the viewfinder and projection have to be shown when `--visible` class is applied. The projection position also have to be set if it is not set with Javascript.

```css
.ip-surface {
  position: absolute;
  z-index: 2;

  display: block;

  width: 100%;
  height: 100%;
}

.ip-viewfinder {
  background: rgba(255,255,255,.5);

  position: absolute;
  z-index: 3;

  transition: opacity .2s ease-in-out;

  opacity: 0;
  border: dotted #CCCCCC 1px;
}

.ip-viewfinder--visible {
  opacity: 1;
}

.ip-projection {
  position: absolute;
  z-index: 3;
  left: 600px;
  top: 0;

  transition: opacity .2s ease-in-out;

  opacity: 0;
}

.ip-projection--visible {
  opacity: 1;
}
```

### Initiate the container

Import the `Container` and create an instance of it. Available options are
- `classPrefix` default: `ip-`. Set HTML element class prefix
- `projectionImageUrl`. The url for image that will be shown in the projection
- `projectionPosition`. The `left` and `top` value of projection HTML element. This can also be set with CSS.

```javascript
import { Container } from 'js-imageprojection';

const run = () => {
    const $container = document.querySelector('.wrap');
    new Container($container, { projectionImageUrl: $container.dataset.projectionImageUrl });
};

document.addEventListener('DOMContentLoaded', run);
```

## Development

Install dependencies
```bash
npm install
```

This will run a preview server at `localhost:9999`. Everything that is served by the dev server is inside `preview` directory.
```bash
npm start
```

This will create a Javascript bundle in `dist` directory.
```bash
npm run build
```

This will run the tests.
```bash
npm test
```
