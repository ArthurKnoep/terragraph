import React from 'react';
import createEngine, {
  DefaultLinkModel,
  DefaultNodeModel,
  DiagramModel,
} from '@projectstorm/react-diagrams';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import './App.css';
import { VariablesNodeFactory, VariablesNodeModel } from './nodes/Variables';

const engine = createEngine();
// engine.getPortFactories()
//   .registerFactory(new SimplePort)
engine.getNodeFactories().registerFactory(new VariablesNodeFactory());

const var1 = new VariablesNodeModel();
var1.setPosition(100, 300);

// node 1
const node1 = new DefaultNodeModel({
  name: 'Node 1',
  color: 'rgb(0,192,255)',
});
node1.setPosition(100, 100);
let port1 = node1.addOutPort('Out');

// node 2
const node2 = new DefaultNodeModel({
  name: 'Node 2',
  color: 'rgb(0,192,255)',
});
node2.setPosition(300, 100);
let port2 = node2.addInPort('In');

// link them and add a label to the link
const link = port1.link<DefaultLinkModel>(port2);
// link.addLabel('Hello World!');

const model = new DiagramModel();
model.addAll(node1, node2, var1, link);
engine.setModel(model);

function App() {
  return (
    <div className="App">
      <CanvasWidget engine={engine} />
    </div>
  );
}

export default App;
