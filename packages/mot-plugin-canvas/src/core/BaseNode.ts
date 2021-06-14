
class BaseNode {

    id: number | string

    x: number = 0;
    y: number = 0;

    attributes = {
        width: 0,
        height: 0,
        left: 0,
        top: 0,
        zIndex: 0,
    }

    constructor() {

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