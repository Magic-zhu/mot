/// <reference types="node" />
declare class Parser {
    checkSignature(bytes: Uint8Array): boolean;
    splitChunks(buffer: Buffer): void;
    parseChunks(bytes: Buffer, off: number): void;
    getBoxType(bytes: Uint8Array, offset: number): any;
    getSize(bytes: Uint8Array, offset: number): number;
    get16Int16FLOAT(bytes: Uint8Array, offset: number): number;
}
export default Parser;
