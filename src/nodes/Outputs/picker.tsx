import { DragEvent } from 'react';
import { FiLogOut } from 'react-icons/fi';
import { Picker } from '../../components/Picker';
import { dragManager } from '../../data/dragManager';
import styles from './style.module.scss';

export const OutputsPicker = () => {
  const handleDragStart = (evt: DragEvent<HTMLDivElement>) => {
    dragManager.registerDragStart<{}>({
      position: {
        x: evt.nativeEvent.offsetX,
        y: evt.nativeEvent.offsetY,
      },
      properties: {},
      type: 'outputs',
    });
  };

  return (
    <Picker icon={FiLogOut} name="Outputs" className={styles.picker} onDragStart={handleDragStart} />
  );
}
