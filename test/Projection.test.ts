import tape from 'tape';

import { defaultClassPrefix } from '../src/common';
import { Projection } from '../src/Projection';

tape('Projection', (assert) => {
  const options = {
    imageUrl: 'base/test/test-image.png',
    position: {
      left: 0,
      top: 0,
    },
    tagName: 'div',
  };

  const backgroundImagePosition = {
    left: 20,
    top: 10
  };

  const projection = new Projection(options);

  assert.plan(13);

  assert.ok(projection.$image, 'Image created');
  assert.notEqual(projection.width, undefined, 'Width defined');
  assert.notEqual(projection.height, undefined, 'Height defined');
  assert.ok(projection.$el, 'Element created');
  assert.ok(projection.$el?.classList.contains(`${defaultClassPrefix}${Projection.elClassName}`), 'Element css class set');

  projection.$el?.addEventListener('ip.projection.imageLoaded', function() {
    assert.ok(projection.$el?.style['background-image'], 'Background image set');
    assert.equal(projection.$el?.style['background-repeat'], 'no-repeat', 'Background no-repeat set');

    assert.equal(projection.$el?.style.left, `${options.position.left}px`, 'Left position set');
    assert.equal(projection.$el?.style.top, `${options.position.top}px`, 'Top position set');

    projection.setImagePosition(backgroundImagePosition);
    assert.equal(projection.$el?.style['background-position'], `${backgroundImagePosition.left}px ${backgroundImagePosition.top}px`, 'Background image position updated');

    projection.show();
    assert.ok(projection.$el?.classList.contains(`${defaultClassPrefix}${Projection.elClassName}--visible`), 'Element shown');

    projection.hide();
    assert.notOk(projection.$el?.classList.contains(`${defaultClassPrefix}${Projection.elClassName}--visible`), 'Element hidden');

    projection.destroy();
    assert.notOk(projection.$el, 'Element removed');
  });
});
