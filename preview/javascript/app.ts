import { Container } from '../../src/index';

const run = () => {
  const $container1 = document.querySelector('.wrap-1');
  new Container($container1 as HTMLElement);

  const $container2 = document.querySelector('.wrap-2');
  new Container($container2 as HTMLElement, { projectionPosition: { top: 400, left: 0 } });
};

document.addEventListener('DOMContentLoaded', run);
