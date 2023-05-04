import createEngine, { DiagramModel } from '@projectstorm/react-diagrams';
import { OutputsNodeFactory } from '../../nodes/Outputs';
import { VariablesNodeFactory } from '../../nodes/Variables';

export const engine = createEngine();
export const model = new DiagramModel();

engine.getNodeFactories().registerFactory(new VariablesNodeFactory());
engine.getNodeFactories().registerFactory(new OutputsNodeFactory());
engine.setModel(model);
