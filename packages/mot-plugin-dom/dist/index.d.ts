interface Action {
    type: string;
    children?: Action[];
    action?: string;
    transformOrigin?: string;
    parent: Action | ActionTree | null;
    time?: number;
    duration?: number;
    timeFunction?: string;
    status?:StatusDescription;
}

interface ActionTree {
    parent: ActionTree | null
    children: Action[] | null
}
interface StyleObject {
    duration: number,
    style:Object,
    status?:string
}

interface TranslateOptions {
    x?: number | string;
    y?: number | string;
    z?: number | string;
    duration?: number;
    timeFunction?: string;
}

interface ScaleOptions {
    x?: number | string;
    y?: number | string;
    z?: number | string;
    duration?: number;
    timeFunction?: string;
    transformOrigin?:string;
}

interface RotateOptions {
    angle: number | string;
    x?: number | string;
    y?: number | string;
    z?: number | string;
    duration?: number;
    timeFunction?: string;
    transformOrigin?:string;
}

interface MoveOptions {
    x?: number | string;
    y?: number | string;
    duration?: number;
    timeFunction?: string;
}

interface AttributeOptions {
    key: string;
    value: any;
    duration?: number;
    timeFunction?: string;
}

interface StatusDescription {
    type:string,
    description?:string,
}

export { Action, ActionTree, AttributeOptions, MoveOptions, RotateOptions, ScaleOptions, StatusDescription, StyleObject, TranslateOptions };
