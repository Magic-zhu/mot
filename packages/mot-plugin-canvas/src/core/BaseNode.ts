let _BaseNodeId = 0;
class BaseNode {

    id: number | string;  // unique identification

    x: number = 0;        // absolute position
    y: number = 0;        // absolute position

    parent: any = null;
    children: any = [];

    attributes = {
        width: 0,
        height: 0,
        left: 0,
        top: 0,
        zIndex: 0,
    }

    constructor() {
        Object.defineProperty( this, 'id', { value: _BaseNodeId ++ } );
    }

    copy() {

    }

    get width() {
        return this.attributes.width
    }

    get height() {
        return this.attributes.height
    }

    get left() {
        return this.attributes.left
    }

    get top() {
        return this.attributes.top
    }

    addEventListener() {

    }

    removeEventListener() {

    }

    removeAllListeners() {

    }

    attr() {

    }

    removeAttribute() {

    }
}

export default BaseNode