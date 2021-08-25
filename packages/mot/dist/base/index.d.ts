import { Plugin, PluginsMap, MoveOptions, ScaleOptions, RotateOptions, AttributeOptions } from '../@types';
import EventEmitter from '../core/EventEmitter';
import AnimationLanguageSupport from '../core/AnimationLanguageSupport';
declare class Motion extends EventEmitter {
    static plugins: PluginsMap;
    static use(plugin: Plugin): typeof Motion;
    static current: HTMLElement;
    constructor();
    static register(methodName: string, method: Function): void;
    static createPath: Function;
    static dom: Function;
    static create(): AnimationLanguageSupport;
    static get(id: string): typeof Motion;
    static checkIfHasDomRender(callback: any): void;
    static moveTo(options: MoveOptions | number, y?: number, duration?: number): typeof Motion;
    static scale(options: ScaleOptions | number, y?: number, duration?: number): typeof Motion;
    static rotate(options: RotateOptions | number, duration?: number): typeof Motion;
    static attribute(options: AttributeOptions | string, value?: string, duration?: number): typeof Motion;
}
export default Motion;
