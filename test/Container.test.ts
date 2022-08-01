import tape from 'tape';

import { Container } from '../src/Container';

tape('Container', (assert) => {
  const className = 'ip-container';

  const $image = document.createElement('img');
  $image.setAttribute('src', 'base/test/test-image.png');

  const $container = document.createElement('div');
  $container.appendChild($image);

  const container = new Container($container, { projectionImageUrl: 'base/test/test-image.png' });

  assert.ok(container.$el, 'Element exists');
  assert.ok(container.$el?.classList.contains(className), 'Element css class set');
  assert.ok(container.surface, 'Surface created');
  assert.ok(container.viewfinder, 'Viewfinder created');
  assert.ok(container.projection, 'Projection created');

  assert.end();
});
