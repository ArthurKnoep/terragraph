import classNames from 'classnames';
import { OutputsPicker } from '../../nodes/Outputs';
import { VariablesPicker } from '../../nodes/Variables';
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
        <div className={styles.sectionHeader}>I/O nodes</div>
        <div className={styles.sectionList}>
          <VariablesPicker />
          <OutputsPicker />
        </div>
        <div className={styles.sectionHeader}>Transform nodes</div>
        <div className={styles.sectionList}>
          <span className={styles.noProvider}>No transform nodes yet</span>
        </div>
        <div className={styles.sectionHeader}>Provider nodes</div>
        <div className={styles.sectionList}>
          <span className={styles.noProvider}>No provider configured</span>
        </div>
      </div>
    </div>
  );
};
