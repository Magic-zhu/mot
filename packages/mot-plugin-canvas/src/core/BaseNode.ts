let _BaseNodeId = 0;

/**
 *
 *
 * @class BaseNode
 */
class BaseNode {
  id: number | string; // unique identification
  x: number = 0; // absolute position
  y: number = 0; // absolute position
  parent: any = null;
  children: any = [];
  nodeType: string = 'base';
  attributes = {
    width: 0,
    height: 0,
    left: 0,
    top: 0,
    zIndex: 0,
    borderRadius: 0,
    backgroundColor: '#000000',
    padding: [0, 0, 0, 0],
    margin: [0, 0, 0, 0],
  };

  /**
   * Creates an instance of BaseNode.
   * @memberof BaseNode
   */
  constructor() {
    Object.defineProperty(this, 'id', {value: _BaseNodeId++});
  }

  /**
   * copy this ndoe
   */
  copy() {}

  /**
   *
   *
   * @readonly
   * @memberof BaseNode
   */
  get width() {
    return this.attributes.width;
  }

  /**
   *
   *
   * @readonly
   * @memberof BaseNode
   */
  get height() {
    return this.attributes.height;
  }

  /**
   *
   *
   * @readonly
   * @memberof BaseNode
   */
  get left() {
    return this.attributes.left;
  }

  /**
   *
   *
   * @readonly
   * @memberof BaseNode
   */
  get top() {
    return this.attributes.top;
  }

  /**
   * addEventListener
   */
  addEventListener() {}

  /**
   *
   *
   * @memberof BaseNode
   */
  removeEventListener() {}

  /**
   * removeAllListeners
   */
  removeAllListeners() {}

  /**
   *
   *
   * @memberof BaseNode
   */
  attr() {}

  /**
   *
   *
   * @memberof BaseNode
   */
  removeAttribute() {}

  /**
   *
   *
   * @memberof BaseNode
   */
  append() {}
}

export default BaseNode;
