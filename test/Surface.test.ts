import tape from 'tape';

import { Surface } from '../src/Surface';

function setup(className: string, tagName: string) {
  const sourceImage = new Image();
  sourceImage.src = 'an-image.jpg';

  return new Surface({
    className,
    sourceImage,
    tagName,
  });
}

tape('test', (assert) => {
  const className = 'ip-surface';
  const tagName = 'div';
  const surface = setup(className, tagName);

  assert.ok(surface.image, 'Image created');
  assert.notEqual(surface.width, undefined, 'Width defined');
  assert.notEqual(surface.height, undefined, 'Height defined');
  assert.ok(surface.$el, 'Element created');
  assert.equal(surface.$el?.className, className, 'Element css class set');
  assert.ok(surface.getOffset(), 'Offset returned');

  surface.destroy();
  assert.notOk(surface.$el, 'Element removed');

  assert.end();
});

