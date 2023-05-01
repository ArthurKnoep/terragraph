import { AbstractReactFactory, DiagramEngine, GenerateWidgetEvent } from '@projectstorm/react-diagrams';
import { VariablesNodeModel } from './model';
import { VariablesNodeWidget } from './widget';

export class VariablesNodeFactory extends AbstractReactFactory<VariablesNodeModel, DiagramEngine> {
  constructor() {
    super('variables');
  }

  generateReactWidget(event: GenerateWidgetEvent<VariablesNodeModel>): JSX.Element {
    return <VariablesNodeWidget engine={this.engine} node={event.model} />;
  }

  generateModel() {
    return new VariablesNodeModel();
  }
}
