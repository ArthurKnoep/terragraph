import {
  AbstractReactFactory,
  DiagramEngine,
  GenerateModelEvent,
  GenerateWidgetEvent,
} from '@projectstorm/react-diagrams';
import { eventBus } from '../../data/eventBus';
import { VariablesNodeModel } from './model';
import { VariablesNodeWidget } from './widget';

export class VariablesNodeFactory extends AbstractReactFactory<VariablesNodeModel, DiagramEngine> {
  constructor() {
    super('variables');
  }

  generateReactWidget(event: GenerateWidgetEvent<VariablesNodeModel>): JSX.Element {
    return <VariablesNodeWidget engine={this.engine} node={event.model} />;
  }

  generateModel(event: GenerateModelEvent) {
    return new VariablesNodeModel(event.initialConfig, eventBus);
  }
}
