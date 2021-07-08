declare class Vector2D extends Array {
    constructor(x?: number, y?: number);
    set x(v: any);
    set y(v: any);
    get x(): any;
    get y(): any;
    get length(): number;
    get dir(): number;
    copy(): Vector2D;
    add(v: any): this;
    sub(v: any): this;
    scale(a: any): this;
    rotate(rad: any): this;
    cross(v: any): number;
    dot(v: any): number;
    normalize(): this;
}
declare function vector2dPlus(vec1: any, vec2: any): Vector2D;
declare function vector2dMinus(vec1: any, vec2: any): Vector2D;
export { Vector2D, vector2dPlus, vector2dMinus };
