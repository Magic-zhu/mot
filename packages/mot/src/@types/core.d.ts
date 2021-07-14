export interface Action {
    type: string;
    children?: Action[];
    action?: string;
    transformOrigin?: string;
    parent: Action | ActionTree | null;
    time?: number;
    duration?: number;
    timeFunction?: string;
    [key: string]: any
}

export interface TranslateOptions {
    x?: number | string;
    y?: number | string;
    z?: number | string;
    duration?: number;
    timeFunction?: string;
}

export interface ScaleOptions {
    x?: number | string;
    y?: number | string;
    z?: number | string;
    duration?: number;
    timeFunction?: string;
    transformOrigin?:string;
}

export interface RotateOptions {
    x?: number | string;
    y?: number | string;
    z?: number | string;
    duration?: number;
    timeFunction?: string;
    transformOrigin?:string;
}

export interface SkewOptions {
    x?: number | string;
    y?: number | string;
    z?: number | string;
    duration?: number;
    timeFunction?: string;
}

export interface MoveOptions {
    x?: number | string;
    y?: number | string;
    duration?: number;
    timeFunction?: string;
}

export interface AttributeOptions {
    key: string;
    value: any;
    duration?: number;
    timeFunction?: string;
}

export interface ActionTree {
    parent: ActionTree | null
    children: Action[] | null
}

export interface EventTarget {
    handler: Function,
    once: boolean,
}

export interface StepOptions {
    duration?: number,
    timeFunction?: string
}

export interface StatusDescription {
    type:string,
    description?:string, 
}

export interface Point {
    x:number,
    y:number,
}

export interface PathOptions {
    precision?:number,
    ratio?:number,
}