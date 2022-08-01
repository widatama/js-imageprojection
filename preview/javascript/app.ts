import { Container } from '../../src/index';

const run = () => {
  const $container1 = document.querySelector('.wrap-1') as HTMLElement;
  new Container($container1 as HTMLElement, { projectionImageUrl: $container1.dataset.projectionImageUrl });

  const $container2 = document.querySelector('.wrap-2') as HTMLElement;
  new Container($container2 as HTMLElement, { projectionImageUrl: $container2.dataset.projectionImageUrl, projectionPosition: { top: 400, left: 0 } });
};

document.addEventListener('DOMContentLoaded', run);
