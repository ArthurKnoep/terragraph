import { ComponentType, ReactNode } from 'react';
import classNames from 'classnames';
import { FiEdit, FiPlus } from 'react-icons/fi';
import styles from './style.module.scss';

export interface Props {
  icon?: ComponentType,
  name: string,
  className?: string,
  hasEdit?: boolean,
  hasAdd?: boolean,
  canEdit?: boolean,
  canAdd?: boolean,
  onEdit?: () => void,
  onAdd?: () => void,
  children: ReactNode,
}

export const Node = ({
  icon: Icon,
  name,
  className,
  children,
  hasEdit,
  hasAdd,
  canEdit,
  canAdd,
  onEdit,
  onAdd,
}: Props) => {
  return (
    <div
      className={classNames(styles.nodeWrapper, className)}
    >
      <div className={styles.header}>
        <div className={styles.nodeName}>
          {(Icon) && <Icon />}
          <span>{name}</span>
        </div>
        {(hasEdit) && <FiEdit onClick={onEdit} className={classNames(canEdit && styles.iconDisabled)} />}
        {(hasAdd) && <FiPlus onClick={onAdd} className={classNames(canAdd && styles.iconDisabled)} />}
      </div>
      <div>
        {children}
      </div>
    </div>
  );
}
