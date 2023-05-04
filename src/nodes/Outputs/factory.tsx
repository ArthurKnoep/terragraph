import {
  AbstractReactFactory,
  DiagramEngine,
  GenerateModelEvent,
  GenerateWidgetEvent,
} from '@projectstorm/react-diagrams';
import { eventBus } from '../../data/eventBus';
import { OutputsNodeModel } from './model';
import { OutputsNodeWidget } from './widget';

export class OutputsNodeFactory extends AbstractReactFactory<OutputsNodeModel, DiagramEngine> {
  constructor() {
    super('outputs');
  }

  generateReactWidget(event: GenerateWidgetEvent<OutputsNodeModel>): JSX.Element {
    return <OutputsNodeWidget engine={this.engine} model={event.model} />;
  }

  generateModel(event: GenerateModelEvent) {
    return new OutputsNodeModel(event.initialConfig, eventBus);
  }
}
