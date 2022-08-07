import GlobalsPolyfills from '@esbuild-plugins/node-globals-polyfill';
import NodeModulesPolyfills from '@esbuild-plugins/node-modules-polyfill';
import karmaEsbuild from 'karma-esbuild';
import karmaFirefoxLauncher from 'karma-firefox-launcher';
import karmaTap from 'karma-tap';
import karmaTapPrettyReporter from 'karma-tap-pretty-reporter';

module.exports = (config) => {
  config.set({
    plugins: [karmaEsbuild, karmaFirefoxLauncher, karmaTap, karmaTapPrettyReporter],
    browsers: ['FirefoxHeadless'],
    frameworks: ['tap'],
    reporters: ['tap-pretty'],
    tapReporter: {
      prettifier: 'tap-summary',
    },
    files: [
      './test/**/*.test.ts',
      { pattern: './test/test-image.png', watched: false, included: false, served: true },
    ],
    preprocessors: {
      // pass the entry file to esbuild
      './test/**/*.test.ts': ['esbuild'],
    },
    esbuild: {
      plugins: [GlobalsPolyfills({ process: true }), NodeModulesPolyfills()],
    },
    client: {
      captureConsole: true,
    },
    port: 9899,
    autoWatch: false,
    singleRun: true,
    colors: true,
  });
};
