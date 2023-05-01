import { DiagramModel } from '@projectstorm/react-diagrams';
import { VariablesNodeModel } from '../../nodes/Variables';
import { eventBus } from '../eventBus';
import { DataBlock, NodeBlock } from '../types';

const STORAGE_KEY = 'terragraph-nodedata';

export class LocalStore {
  private data?: DataBlock = undefined;
  private static factoryMap: { [k: string]: any } = {
    'variables': VariablesNodeModel,
  }

  loadData() {
    this.data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  }

  saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
  }

  registerListeners() {
    eventBus.on('node:updated', this.handleNodeUpdated.bind(this));
  }

  unregisterListeners() {
    eventBus.off('node:updated', this.handleNodeUpdated.bind(this));
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
      const NodeModel = LocalStore.factoryMap[node.nodeType];
      if (!NodeModel) throw new Error(`Unknown node type ${node.nodeType}`);
      const nodeModel = new NodeModel(node, eventBus);
      model.addNode(nodeModel);
    });
  }
}

export const store = new LocalStore();
