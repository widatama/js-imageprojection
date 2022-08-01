import tape from 'tape';

import { defaultClassPrefix } from '../src/common';
import { Surface } from '../src/Surface';

function setup() {
  const sourceImage = new Image();
  sourceImage.src = 'base/test/test-image.png';

  return new Surface({
    sourceImage,
  });
}

tape('Surface', (assert) => {
  const surface = setup();

  assert.ok(surface.$image, 'Image created');
  assert.notEqual(surface.width, undefined, 'Width defined');
  assert.notEqual(surface.height, undefined, 'Height defined');
  assert.ok(surface.$el, 'Element created');
  assert.ok(surface.$el?.classList.contains(`${defaultClassPrefix}${Surface.elClassName}`), 'Element css class set');
  assert.ok(surface.getOffset(), 'Offset returned');

  surface.destroy();
  assert.notOk(surface.$el, 'Element removed');

  assert.end();
});
