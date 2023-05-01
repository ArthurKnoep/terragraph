import { FiType } from 'react-icons/fi';
import { dragManager } from '../../data/dragManager';
import { VariablesNodeModelGenerics } from './model';
import styles from './style.module.scss';

export interface Props {

}

export const VariablesPicker = ({

}: Props) => {
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
    <div draggable={true} onDragStart={handleDragStart} className={styles.pickerWrapper}>
      <FiType className={styles.nodeIcon} />
      <span className={styles.nodeName}>Variables</span>
    </div>
  );
}
