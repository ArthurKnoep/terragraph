import classNames from 'classnames';
import { VariablesPicker } from '../../nodes/Variables/picker';
import styles from './style.module.scss';

export interface Props {
  className?: string,
}

export const SideBar = ({
  className
}: Props) => {
  return (
    <div className={classNames(styles.sideBar, className)}>
      <div className={styles.nodeList}>
        <div className={styles.sectionHeader}>Basic nodes</div>
        <div className={styles.sectionList}>
          <VariablesPicker />
        </div>
        <div className={styles.sectionHeader}>Provider nodes</div>
        <div className={styles.sectionList}>
          <span className={styles.noProvider}>No provider configured</span>
        </div>
      </div>
    </div>
  );
};
