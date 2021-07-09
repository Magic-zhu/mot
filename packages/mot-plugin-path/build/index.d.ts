import { Point } from '../@types/index.d';
import { Vector2D } from './Vector2d';
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
    quadraticBezierCurve(): void;
    bezier2P(p0: number, p1: number, p2: number, t: number): number;
    getBezierNowPoint2P(p0: Point, p1: Point, p2: Point, num: number, tick: number): Point;
    create2PBezier(p0: Point, p1: Point, p2: Point, num?: number, tick?: number): any[];
    bezier3P(p0: number, p1: number, p2: number, p3: number, t: number): number;
    getBezierNowPoint3P(p0: Point, p1: Point, p2: Point, p3: Point, num: number, tick: number): {
        x: number;
        y: number;
    };
    create3PBezier(p0: Point, p1: Point, p2: Point, p3: Point, num?: number, tick?: number): any[];
    createSmoothLine(points: Point[], ratio?: number): any[];
    createSmoothLineControlPoint(p1: Vector2D, pt: Vector2D, p2: Vector2D, ratio?: number): {
        control1: Point;
        control2: Point;
    };
}
export default Path;
