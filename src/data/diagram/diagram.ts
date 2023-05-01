import createEngine, { DiagramModel } from '@projectstorm/react-diagrams';
import { VariablesNodeFactory } from '../../nodes/Variables';

export const engine = createEngine();
export const model = new DiagramModel();

engine.getNodeFactories().registerFactory(new VariablesNodeFactory());
engine.setModel(model);
