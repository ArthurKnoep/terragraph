import { DiagramEngine, PortWidget } from '@projectstorm/react-diagrams';
import { useEffect, useState } from 'react';
import { FiLogOut, FiTrash2 } from 'react-icons/fi';
import { Node } from '../../components/Node';
import { OneLineEdit } from '../../components/OneLineEdit';
import { Output, OutputsNodeModel } from './model';
import styles from './style.module.scss';

export interface Props {
  engine: DiagramEngine,
  model: OutputsNodeModel,
}

export function OutputsNodeWidget({
  engine,
  model,
}: Props) {
  const [editIdentifier, setEditIdentifier] = useState<string | undefined>();
  const [outputs, setOutputs] = useState<Output[]>(model.getOutputs());

  useEffect(() => {
    if (editIdentifier) {
      return model.setLocked(true);
    }
    model.setLocked(false);
  }, [model, editIdentifier]);

  const handleOutputRename = (identifier: string, value: string) => {
    model.outputRename(identifier, value);
    setEditIdentifier(undefined);
    setOutputs([...model.getOutputs()]);
  };

  const handleOutputDelete = (identifier: string) => {
    model.outputDelete(identifier);
    setOutputs([...model.getOutputs()]);
  }

  const handleAddOutput = () => {
    model.onAddOutput();
    setOutputs([...model.getOutputs()]);
  };

  return (
    <Node icon={FiLogOut} name="Outputs" className={styles.nodeWrapper} hasAdd onAdd={handleAddOutput}>
      <div className={styles.varLines}>
        {outputs.map((output) => (
          <div key={output.identifier} className={styles.varLine}>
            <PortWidget port={model.getPort('in') !} engine={engine} className={styles.port} />
            {(output.identifier !== editIdentifier) ? (
              <div
                onDoubleClick={() => setEditIdentifier(output.identifier)}
                className={styles.varName}
              >
                {output.name}
              </div>
            ) : (
              <OneLineEdit onCancel={() => setEditIdentifier(undefined)} onConfirm={(value: string) => handleOutputRename(output.identifier, value)} initialValue={output.name} />
            )}
            <FiTrash2 className={styles.delete} onClick={() => handleOutputDelete(output.identifier)} />
          </div>
        ))}
        {(!outputs.length) && (
          <div className={styles.noVars}>
            No outputs
          </div>
        )}
      </div>
    </Node>
  );
}
