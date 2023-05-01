import { Position } from '../types';

export interface RegisterDragStart<T> {
  position: Position,
  type: string,
  properties: T
}

export class DragManager {
  private dragStartPosition: Position | undefined;
  private nodeType: string | undefined;
  private properties: any;

  constructor() {
    this.dragStartPosition = undefined;
    this.nodeType = undefined;
    this.properties = {};
  }

  registerDragStart<T>({ position, type, properties }: RegisterDragStart<T>): void {
    this.dragStartPosition = position;
    this.nodeType = type;
    this.properties = properties;
  }

  getDragStartPosition(): Position | undefined {
    return this.dragStartPosition;
  }

  getNodeType(): string | undefined {
    return this.nodeType;
  }

  getProperties<T>(): T {
    return this.properties;
  }
}

export const dragManager = new DragManager();
