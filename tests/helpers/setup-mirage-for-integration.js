import mirageInitializer from '../../initializers/ember-cli-mirage';
import defaultScenario from '../../../dummy/mirage/scenarios/default';

export default function startMirage(container) {
  mirageInitializer.initialize(container);
  defaultScenario(window.server);
}
