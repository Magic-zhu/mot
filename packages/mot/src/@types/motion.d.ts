interface commonFunction {
    (arg?: any): void
}
export default interface MomoOptions {
    el: HTMLDivElement;
    render: string;//dom svg canvas
    beforeStart?: commonFunction;
    end?: commonFunction;
}

export interface Plugin {
    pluginName: string;
    install: Function;
    installed:boolean;
}

export interface PluginsMap {
    [key: string]: any;
}