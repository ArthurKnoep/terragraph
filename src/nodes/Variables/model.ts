import {
  LinkModel,
  DefaultLinkModel,
  NodeModel,
  NodeModelGenerics,
  PortModel,
  PortModelAlignment, BaseEntityEvent, BaseEntity, BaseEvent,
} from '@projectstorm/react-diagrams';
import { v4 as uuid } from 'uuid';
import { EventBus } from '../../data/eventBus';
import { NodeBlock } from '../../data/types';

export interface Variable {
  identifier: string
  type: string
  name: string
}
export interface VariablesNodeModelGenerics {
  variableList: Variable[]
}

export class VariablePortModel extends PortModel {
  constructor() {
    super({
      type: 'variable',
      name: 'out',
      alignment: PortModelAlignment.RIGHT
    });
  }

  createLinkModel(): LinkModel | null {
    return new DefaultLinkModel();
  }
}

export class VariablesNodeModel extends NodeModel<NodeModelGenerics & VariablesNodeModelGenerics> {
  private readonly eventBus: EventBus;
  private readonly data: NodeBlock<VariablesNodeModelGenerics>

  constructor(data: NodeBlock<VariablesNodeModelGenerics>, eventBus: EventBus) {
    super({
      type: 'variables'
    });
    this.eventBus = eventBus;
    this.data = data;
    this.addPort(new VariablePortModel());
    this.setPosition(data.position.x, data.position.y);
    this.registerListener({
      positionChanged: this.onPositionChanged.bind(this)
    });
  }

  onPositionChanged(event: any) {
    this.data.position = {
      x: event.entity.position.x,
      y: event.entity.position.y,
    };
    this.eventBus.emit('node:updated', { ...this.data })
  }

  onAddVar() {
    const name = window.prompt('Enter variable name');
    if (!name) return;
    this.data.properties.variableList.push({
      identifier: uuid(),
      type: 'string',
      name,
    });
    this.eventBus.emit('node:updated', { ...this.data });
  }

  varRename(identifier: string, value: string) {
    this.data.properties.variableList.some((variable) => {
      if (variable.identifier === identifier) {
        variable.name = value;
        return true;
      }
      return false;
    });
    this.eventBus.emit('node:updated', { ...this.data });
  }

  varDelete(identifier: string) {
    this.data.properties.variableList = this.data.properties.variableList.filter((variable) => variable.identifier !== identifier);
    this.eventBus.emit('node:updated', { ...this.data });
  }

  getVars() {
    return this.data.properties.variableList;
  }
}
