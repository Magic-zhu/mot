/// <reference types="node" />
import Loader from './loader';
import Parser from './parser';
declare class MP4Render {
    constructor(url: string, canvas?: HTMLCanvasElement);
    loadUrl(url: string): void;
    parse(buffer: Buffer): void;
}
export { MP4Render, Loader, Parser };
