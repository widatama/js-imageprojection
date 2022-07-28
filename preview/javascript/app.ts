import { Container } from '../../src/index';

const run = () => {
  const $container = document.querySelector('.wrap');
  const container = new Container($container as HTMLElement);

  console.warn($container);
  console.warn(container);
};

document.addEventListener('DOMContentLoaded', run);
