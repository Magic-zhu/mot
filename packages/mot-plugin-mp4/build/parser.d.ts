/// <reference types="node" />
import { MDHDInfo } from './index.d';
declare class Parser {
    mvhd: any;
    trak: any;
    checkSignature(bytes: Uint8Array): boolean;
    parseChunks(buffer: Buffer): void;
    getBoxType(bytes: Uint8Array, offset: number, length?: number): any;
    getSize(bytes: Uint8Array, offset: number, length?: number): number;
    get16Int16FLOAT(bytes: Uint8Array, offset: number): number;
    get8INT8FLOAT(bytes: Uint8Array, offset: number): number;
    mvhdParser(bytes: Uint8Array, offset: number): void;
    tkhdParser(bytes: Uint8Array, offset: number): any;
    mdhdParser(bytes: Uint8Array, offset: number): MDHDInfo;
}
export default Parser;
