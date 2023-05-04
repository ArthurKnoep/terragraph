import { v4 as uuid } from 'uuid';
import { Point } from '@projectstorm/geometry';
import {
  DefaultLinkModel,
  LinkModel,
  NodeModel,
  NodeModelGenerics,
  PortModel,
  PortModelAlignment,
} from '@projectstorm/react-diagrams';
import { EventBus } from '../../data/eventBus';
import { NodeBlock } from '../../data/types';


export interface Output {
  identifier: string
  type: string
  name: string
}
export interface OutputsNodeModelData {
  outputList: Output[];
}

export class OutputPortModel extends PortModel {
  constructor() {
    super({
      type: 'output',
      name: 'in',
      alignment: PortModelAlignment.LEFT
    });
  }

  createLinkModel(): LinkModel | null {
    return new DefaultLinkModel();
  }
}

export class OutputsNodeModel extends NodeModel<NodeModelGenerics> {
  private readonly eventBus: EventBus;
  private readonly data: NodeBlock<OutputsNodeModelData>;

  constructor(data: NodeBlock<OutputsNodeModelData>, eventBus: EventBus) {
    super({
      id: data.id,
      position: new Point(data.position.x, data.position.y),
      type: 'outputs',
    });
    this.eventBus = eventBus;
    this.data = data;
    this.addPort(new OutputPortModel());
    this.registerListener({
      positionChanged: this.onPositionChanged.bind(this),
      entityRemoved: this.onRemove.bind(this),
    });
  }

  onRemove() {
    this.eventBus.emit('node:removed', { ...this.data });
  }

  onPositionChanged(event: any) {
    this.data.position = {
      x: event.entity.position.x,
      y: event.entity.position.y,
    };
    this.eventBus.emit('node:updated', { ...this.data });
  }

  onAddOutput() {
    const name = window.prompt('Enter output name');
    if (!name) return;
    this.data.properties.outputList.push({
      identifier: uuid(),
      type: 'string',
      name,
    });
    this.eventBus.emit('node:updated', { ...this.data });
  }

  outputRename(identifier: string, name: string) {
    this.data.properties.outputList.some((output) => {
      if (output.identifier === identifier) {
        output.name = name;
        return true;
      }
      return false;
    });
    this.eventBus.emit('node:updated', { ...this.data });
  }

  outputDelete(identifier: string) {
    this.data.properties.outputList = this.data.properties.outputList.filter((output) => output.identifier !== identifier);
    this.eventBus.emit('node:updated', { ...this.data });
  }

  getOutputs(): Output[] {
    return this.data.properties.outputList;
  }
}
