import { DiagramModel } from '@projectstorm/react-diagrams';
import { VariablesNodeModel } from '../../nodes/Variables';
import { engine } from '../diagram';
import { eventBus } from '../eventBus';
import { DataBlock, NodeBlock, Position } from '../types';

const STORAGE_KEY = 'terragraph-nodedata';

export const FactoryMap: { [k: string]: any } = {
  'variables': VariablesNodeModel,
}

export class LocalStore {
  private data?: DataBlock = undefined;

  loadData() {
    this.data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  }

  saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
  }

  registerListeners() {
    eventBus.on('node:updated', this.handleNodeUpdated.bind(this));
    eventBus.on('node:added', this.handleNodeAdded.bind(this));
  }

  unregisterListeners() {
    eventBus.off('node:updated', this.handleNodeUpdated.bind(this));
    eventBus.off('node:added', this.handleNodeAdded.bind(this));
  }

  private handleNodeAdded(data: NodeBlock<any>) {
    if (!this.data) throw new Error('No data loaded');
    this.data.nodes = this.data.nodes ?? [];
    this.data.nodes.push(data);
    this.saveData();
  }

  private handleNodeUpdated(node: NodeBlock<any>) {
    if (!this.data) throw new Error('No data loaded');
    if (!this.data.nodes) return;
    this.data.nodes = this.data?.nodes.map((n) => {
      if (n.id === node.id) return node;
      return n;
    });
    this.saveData();
  }

  recreateSavedNodes(model: DiagramModel) {
    if (!this.data) throw new Error('No data loaded');
    if (!this.data.nodes) return;
    this.data.nodes.forEach((node) => {
      if (model.getNode(node.id)) return;
      const NodeModel = FactoryMap[node.nodeType];
      if (!NodeModel) throw new Error(`Unknown node type ${node.nodeType}`);
      const nodeModel = new NodeModel(node, eventBus);
      model.addNode(nodeModel);
    });
    engine.repaintCanvas();
  }
}

export const store = new LocalStore();
