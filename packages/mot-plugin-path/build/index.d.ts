import { Point } from '../@types/index.d';
declare class Path {
    static pluginName: string;
    static installed: boolean;
    static mot: any;
    instructArray: any[];
    constructor(instruct?: string);
    static install(mot: any): void;
    parse(instruct: string): any[];
    createInstruct(map: any): {
        duration: any;
        timeFunction: any;
        instruct: string;
        value: string;
    };
    linear(t: number): number;
    easeIn(t: any): number;
    cubicIn(t: any): number;
    cubicOut(t: any): number;
    cubicInOut(t: any): number;
    quadraticBelzierCurve(): void;
    Bezier(p0: number, p1: number, p2: number, p3: number, t: number): any;
    getBezierNowPoint(p0: any, p1: any, p2: any, p3: any, num: any, tick: any): {
        x: any;
        y: any;
        z: any;
    };
    create3DBezier(p0: Point, p1: Point, p2: Point, p3: Point, num?: number, tick?: number): any[];
}
export default Path;
