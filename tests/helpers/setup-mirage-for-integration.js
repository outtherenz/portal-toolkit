import { startMirage } from '../../initializers/ember-cli-mirage';
import defaultScenario from '../../../dummy/mirage/scenarios/default';

export default function startMirageWithDefaults(container) {
  startMirage(container);
  defaultScenario(window.server);
}
