import { useEffect, useState } from 'react';
import { FiType, FiEdit, FiPlus, FiTrash2 } from 'react-icons/fi';
import { DiagramEngine, PortWidget } from '@projectstorm/react-diagrams';
import { OneLineEdit } from '../../components/OneLineEdit';
import { Node } from '../../components/Node';
import { Variable, VariablesNodeModel } from './model';
import styles from './style.module.scss';

export interface Props {
  engine: DiagramEngine,
  node: VariablesNodeModel,
  // onAddVarClick?: () => {},
  // vars: string[],
}

export function VariablesNodeWidget({
  engine,
  node,
}: Props) {
  const [vars, setVars] = useState<Variable[]>(node.getVars());
  const [editIdentifier, setEditIdentifier] = useState<string | undefined>();

  useEffect(() => {
    if (editIdentifier) {
      node.setLocked(true);
    } else {
      node.setLocked(false);
    }
  }, [editIdentifier, node]);

  const onAddVars = () => {
    node.onAddVar();
    setVars([...node.getVars()]);
  };

  const onVarRenameBegin = (identifier: string) => {
    setEditIdentifier(identifier);
  }

  const onVarRename = (identifier: string, value: string) => {
    node.varRename(identifier, value);
    setEditIdentifier(undefined);
    setVars([...node.getVars()]);
  };

  const onVarDelete = (identifier: string) => {
    node.varDelete(identifier);
    setVars([...node.getVars()]);
  }

  return (
    <Node icon={FiType} className={styles.nodeWrapper} name="Variables" hasAdd onAdd={onAddVars}>
      <div className={styles.varLines}>
       {vars.map((variable) => (
         <div key={variable.identifier} className={styles.varLine}>
           {(variable.identifier !== editIdentifier) ? (
             <div
               onDoubleClick={() => onVarRenameBegin(variable.identifier)}
               className={styles.varName}
             >
               {variable.name}
             </div>
           ) : (
             <OneLineEdit onCancel={() => setEditIdentifier(undefined)} onConfirm={(value: string) => onVarRename(variable.identifier, value)} initialValue={variable.name} />
           )}
           <FiTrash2 className={styles.delete} onClick={() => onVarDelete(variable.identifier)} />
           <PortWidget port={node.getPort('out')!} engine={engine} className={styles.port} />
         </div>
       ))}
       {(!vars.length) && (
         <div className={styles.noVars}>
           No variables
         </div>
       )}
      </div>
    </Node>
  );
}
