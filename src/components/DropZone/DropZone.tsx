import { v4 as uuid } from 'uuid';
import { DragEvent } from 'react';
import { engine, model } from '../../data/diagram';
import { dragManager } from '../../data/dragManager';
import { eventBus } from '../../data/eventBus';
import { FactoryMap } from '../../data/store';
import { NodeBlock } from '../../data/types';
import styles from './style.module.scss';

export interface Props {
  children: JSX.Element | JSX.Element[],
}

export const DropZone = ({
  children,
}: Props) => {
  const handleDrop = (evt: DragEvent<HTMLDivElement>) => {
    const NodeModel = FactoryMap[dragManager.getNodeType() ?? ''];
    if (!NodeModel) throw new Error('Unhandled node type');
    const payload: NodeBlock<any> = {
      id: uuid(),
      nodeType: dragManager.getNodeType() ?? '',
      position: {
        x: evt.nativeEvent.offsetX - (dragManager.getDragStartPosition()?.x ?? 0),
        y: evt.nativeEvent.offsetY - (dragManager.getDragStartPosition()?.y ?? 0),
      },
      properties: dragManager.getProperties(),
    };
    const node = new NodeModel(payload, eventBus);
    model.addNode(node);
    engine.repaintCanvas();
    eventBus.emit('node:added', payload);
  };

  return (
    <div
      className={styles.dropZone}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      {children}
    </div>
  )
};
