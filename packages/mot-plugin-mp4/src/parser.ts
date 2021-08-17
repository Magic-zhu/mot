const MP4_SIGNATURE_BYTES = new Uint8Array([
  0x66,
  0x74,
  0x79,
  0x70,
  0x69,
  0x73,
  0x6f,
  0x6d, // ftypisom
]);

class Parser {
  /**
   * check if mp4
   *
   * @param {Uint8Array} bytes
   * @return {*}  {boolean}
   * @memberof Parser
   */
  checkSignature(bytes: Uint8Array): boolean {
    for (let i = 0; i < MP4_SIGNATURE_BYTES.length; i++) {
      if (MP4_SIGNATURE_BYTES[i] != bytes[i]) {
        return false;
      }
    }
    return true;
  }

  splitChunks(buffer: Buffer) {
    let bytes = new Uint8Array(buffer);
    // * skip the fileType box
    let offset = 32;
    let mvhd: any = {
      version: 0,
      flags: [],
      createTime: '',
      modifyTime: '',
      timeScale: '',
      duration: 0,
      rate: 1,
    };
    let i = 0;
    while (offset < bytes.length && i < 20) {
      i++;
      const boxLength = this.getSize(bytes, offset);
      console.log(this.getBoxType(bytes, offset + 4), boxLength);
      switch (this.getBoxType(bytes, offset + 4)) {
        case 'free':
          offset += boxLength;
          break;
        case 'mdat':
          offset += boxLength;
          break;
        case 'moov':
          offset += 8;
          break;
        case 'mvhd':
          offset += 8;
          mvhd.version = bytes[offset];
          offset += 1;
          mvhd.flags = bytes.slice(offset, offset + 3);
          offset += 3;
          mvhd.createTime = this.getSize(bytes, offset);
          offset += 4;
          mvhd.modifyTime = this.getSize(bytes, offset);
          offset += 4;
          mvhd.timeScale = this.getSize(bytes, offset);
          offset += 4;
          mvhd.duration = this.getSize(bytes, offset);
          offset += 4;
          mvhd.rate = 'lalala';
          offset += 4;
          mvhd.volume = 'lalalal';
          offset += 12;
          mvhd.matrix = bytes.slice(offset, offset + 36);
          offset += 36;
          offset += 24;
          mvhd.nextTrackId = this.getSize(bytes, offset);
          offset += 4;
          console.log(mvhd);
          break;
        case 'trak':
          offset += 8;
          break;
        case 'tkhd':
          let thkd: any = {};
          offset += 8;
          thkd.version = bytes[offset];
          offset += 1;
          thkd.flags = bytes.slice(offset, offset + 3);
          offset += 3;
          thkd.createTime = this.getSize(bytes, offset);
          offset += 4;
          thkd.modifyTime = this.getSize(bytes, offset);
          offset += 4;
          thkd.trackId = this.getSize(bytes, offset);
          offset += 4;
          // unused
          offset += 4;
          thkd.duration = this.getSize(bytes, offset);
          offset += 4;
          // unused
          offset += 8;
          thkd.layer = 0;
          console.log(bytes.slice(offset, offset +2))
          offset += 2;
          thkd.alternateGroup = 0;
          offset += 2;
          thkd.volume = 0;
          offset += 2;
          // unused
          offset += 2;
          thkd.matrix = bytes.slice(offset, offset + 36);
          offset += 36;
          thkd.width = this.get16Int16FLOAT(bytes, offset);
          offset += 4;
          thkd.height = this.get16Int16FLOAT(bytes, offset);
          offset += 4;
          console.log(thkd)
          break;
        default:
          offset += boxLength;
          break;
      }
    }
  }

  parseChunks(bytes: Buffer, off: number) {}

  getBoxType(bytes: Uint8Array, offset: number) {
    let chars = Array.prototype.slice.call(bytes.subarray(offset, offset + 4));
    return String.fromCharCode.apply(String, chars);
  }

  /**
   * get the box length
   * ?force unsigned
   * @param {Uint8Array} bytes
   * @param {number} offset
   * @param {number} length
   * @return {number}
   * @memberof Parser
   */
  getSize(bytes: Uint8Array, offset: number): number {
    let x = 0;
    x += (bytes[0 + offset] << 24) >>> 0;
    for (let i = 1; i < 4; i++) x += bytes[i + offset] << ((3 - i) * 8);
    return x;
  }

  /**
   *
   * [16.16]
   * @param {Uint8Array} bytes
   * @param {number} offset
   * @return {*}  {number}
   * @memberof Parser
   */
  get16Int16FLOAT(bytes: Uint8Array, offset: number): number{
    let  x = 0;
    let  y = 0;
    for (let i = 0; i < 2; i++) x += bytes[i + offset] << ((1 - i) * 8);
    for (let i = 2; i < 4; i++) y += bytes[i + offset] << ((3 - i) * 8);
    return Number(`${x}.${y}`);
  }
}
export default Parser;
