import tape from 'tape';

import { defaultClassPrefix } from '../src/common';
import { Viewfinder } from '../src/Viewfinder';

tape('Viewfinder', (assert) => {
  const viewfinder = new Viewfinder({});

  assert.ok(viewfinder.$el, 'Element created');
  assert.ok(viewfinder.$el?.classList.contains(`${defaultClassPrefix}${Viewfinder.elClassName}`), 'Element css class set');
  assert.ok(viewfinder.$el?.style.height, 'Element height set');
  assert.ok(viewfinder.$el?.style.width, 'Element width set');

  const currentPosition = viewfinder.position;
  const mousePosition = {left: 50, top: 60};
  viewfinder.setPosition(mousePosition);
  assert.notEqual(viewfinder.position, currentPosition, 'Element moved');

  const newSize = {height: 200, width: 200};
  viewfinder.setSize(newSize);
  console.warn(viewfinder.$el?.style.height);
  assert.equal(viewfinder.$el?.style.height, `${newSize.height}px`, 'Element height changed');
  assert.equal(viewfinder.$el?.style.width, `${newSize.width}px`, 'Element width changed');

  viewfinder.show();
  assert.ok(viewfinder.$el?.classList.contains(`${defaultClassPrefix}${Viewfinder.elClassName}--visible`), 'Element shown');

  viewfinder.hide();
  assert.notOk(viewfinder.$el?.classList.contains(`${defaultClassPrefix}${Viewfinder.elClassName}--visible`), 'Element hidden');

  viewfinder.destroy();
  assert.notOk(viewfinder.$el, 'Element removed');

  assert.end();
});
