import classNames from 'classnames';
import { ComponentType, DragEvent } from 'react';
import styles from './style.module.scss';

export interface Props {
  name: string,
  icon?: ComponentType<any>
  className?: string,
  onDragStart?: (evt: DragEvent<HTMLDivElement>) => void,
}

export const Picker = ({
  name,
  className,
  icon: Icon,
  onDragStart
}: Props) => {
  return (
    <div draggable={true} onDragStart={onDragStart} className={classNames(styles.pickerWrapper, className)}>
      {(Icon) && <Icon className={styles.nodeIcon} />}
      <span className={styles.nodeName}>{name}</span>
    </div>
  );
};
