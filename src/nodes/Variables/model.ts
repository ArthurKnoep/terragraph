import {
  LinkModel,
  DefaultLinkModel,
  NodeModel,
  NodeModelGenerics,
  PortModel,
  PortModelAlignment,
} from '@projectstorm/react-diagrams';
import { v4 as uuid } from 'uuid';

export interface VariablesNodeModelGenerics {}

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

export interface Variable {
  identifier: string
  name: string
}

export class VariablesNodeModel extends NodeModel<NodeModelGenerics & VariablesNodeModelGenerics> {
  private vars: Variable[];

  constructor() {
    super({
      type: 'variables'
    });
    this.addPort(new VariablePortModel());
    this.vars = [{
      name: "test1",
      identifier: uuid()
    }, {
      name: "test2",
      identifier: uuid()
    }];
  }

  onAddVar() {
    const name = window.prompt('Enter variable name');
    if (!name) return;
    this.vars.push({
      identifier: uuid(),
      name,
    });
  }

  varRename(identifier: string, value: string) {
    this.vars.some((variable) => {
      if (variable.identifier === identifier) {
        variable.name = value;
        return true;
      }
      return false;
    })
  }

  getVars() {
    return this.vars;
  }
}
