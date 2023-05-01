export interface Position {
  x: number,
  y: number,
}

export interface NodeBlock<T> {
  id: string,
  nodeType: string,
  position: Position,
  properties: T,
}

export interface LinkBlock {
  from: string,
  to: string,
}

export interface DataBlock {
  nodes: NodeBlock<any>[],
  links: LinkBlock[]
}
