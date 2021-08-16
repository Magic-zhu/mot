/// <reference types="node" />
declare class Parser {
    checkSignature(bytes: Uint8Array): boolean;
    parseChunks(bytes: Buffer): void;
    getBoxType(): void;
}
export default Parser;
