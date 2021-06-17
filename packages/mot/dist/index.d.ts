interface Action {
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
}

interface RotateOptions {
    x?: number | string;
    y?: number | string;
    z?: number | string;
    duration?: number;
    timeFunction?: string;
}

interface SkewOptions {
    x?: number | string;
    y?: number | string;
    z?: number | string;
    duration?: number;
    timeFunction?: string;
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

interface ActionTree {
    parent: ActionTree | null
    children: Action[] | null
}

interface EventTarget {
    handler: Function,
    once: boolean,
}

interface StepOptions {
    duration?: number,
    timeFunction?: string
}

interface StatusDescription {
    type:string,
    description?:string, 
}

interface Plugin {
    pluginName: string;
    install: Function;
    installed:boolean;
}

interface PluginsMap {
    [key: string]: any;
}

export { Action, ActionTree, AttributeOptions, EventTarget, MoveOptions, Plugin, PluginsMap, RotateOptions, ScaleOptions, SkewOptions, StatusDescription, StepOptions, TranslateOptions };
