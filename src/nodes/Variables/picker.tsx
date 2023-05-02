import { FiType } from 'react-icons/fi';
import { Picker } from '../../components/Picker';
import { dragManager } from '../../data/dragManager';
import { VariablesNodeModelGenerics } from './model';
import styles from './style.module.scss';

export const VariablesPicker = () => {
  const handleDragStart = (evt: React.DragEvent<HTMLDivElement>) => {
    dragManager.registerDragStart<VariablesNodeModelGenerics>({
      position: {
        x: evt.nativeEvent.offsetX,
        y: evt.nativeEvent.offsetY,
      },
      properties: {
        variableList: [],
      },
      type: 'variables',
    });
  };

  return (
    <Picker icon={FiType} name="Variables" className={styles.picker} onDragStart={handleDragStart} />
  );
}
