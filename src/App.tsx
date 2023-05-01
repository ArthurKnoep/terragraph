import React, { useCallback, useEffect } from 'react';
import createEngine, {
  DefaultLinkModel,
  DefaultNodeModel,
  DiagramModel,
} from '@projectstorm/react-diagrams';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { VariablesNodeFactory, VariablesNodeModel } from './nodes/Variables';
import { store } from './data/store';
import './App.css';

const engine = createEngine();
// engine.getPortFactories()
//   .registerFactory(new SimplePort)
engine.getNodeFactories().registerFactory(new VariablesNodeFactory());

// const var1 = new VariablesNodeModel({ id: 'test1234', nodeType: 'variable', position: { x: 100, y: 300 }, properties: { variableList: [] } });
// console.log(var1.getPort('out'));
//
// // node 1
// const node1 = new DefaultNodeModel({
//   name: 'Node 1',
//   color: 'rgb(0,192,255)',
// });
// node1.setPosition(100, 100);
//
// let port1 = node1.addOutPort('Out');
//
// // node 2
// const node2 = new DefaultNodeModel({
//   name: 'Node 2',
//   color: 'rgb(0,192,255)',
// });
// node2.setPosition(300, 100);
// let port2 = node2.addInPort('In');
//
// // link them and add a label to the link
// const link = port1.link<DefaultLinkModel>(port2);
// // link.addLabel('Hello World!');

const model = new DiagramModel();
// model.addAll(node1, node2, var1, link);
engine.setModel(model);

function App() {
  useEffect(() => {
    console.log('mounted');
    store.loadData();
    store.recreateSavedNodes(model);
    store.registerListeners();
    return () => {
      console.log('unmounted');
      store.unregisterListeners();
    }
  }, []);

  return (
    <div className="App">
      <CanvasWidget engine={engine} />
    </div>
  );
}

export default App;
