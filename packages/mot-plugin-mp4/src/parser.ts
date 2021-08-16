const MP4_SIGNATURE_BYTES = new Uint8Array([0x66,0x74,0x79,0x70,0x69,0x73,0x6F,0x6D]);
// ftypisom

class Parser {

  checkSignature(bytes: Uint8Array): boolean {
    for (let i = 0; i < MP4_SIGNATURE_BYTES.length; i++) {
      if (MP4_SIGNATURE_BYTES[i] != bytes[i]) {
        return false;
      }
    }
    return true;
  }

  parseChunks(bytes: Buffer) {
    let movieHeader = [];
    let trackHeader = [];
  }

  getBoxType() {

  }
}
 export default Parser;


