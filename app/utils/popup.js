export { default } from 'portal-toolkit/utils/popup';

// We have to do this for browserify to work from within an addon
// See description here (Nov 17) https://github.com/ef4/ember-browserify
import qs from 'npm:qs'; // eslint-disable-line
