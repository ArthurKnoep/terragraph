import React, { useEffect } from 'react';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { DropZone } from './components/DropZone';
import { SideBar } from './components/SideBar';
import { engine, model } from './data/diagram';
import { store } from './data/store';
import styles from './style.module.scss';

function App() {
  useEffect(() => {
    store.loadData();
    store.recreateSavedNodes(model);
    store.registerListeners();
    return () => {
      store.unregisterListeners();
    }
  }, []);

  return (
    <div className={styles.app}>
      <SideBar />
      <DropZone>
        <CanvasWidget className={styles.canvas} engine={engine} />
      </DropZone>
    </div>
  );
}

export default App;
