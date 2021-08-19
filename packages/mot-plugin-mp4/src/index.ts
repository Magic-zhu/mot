import Loader from './loader';
import Parser from './parser';
/**
 *
 *
 * @class MP4Render
 */
class MP4Render {
  constructor(url: string, canvas?: HTMLCanvasElement) {
    this.loadUrl(url);
  }

  loadUrl(url: string) {
    Loader(url)
      .then((buffer: Buffer) => {
        console.log(buffer);
        console.log(buffer.slice(4, 12));
        this.parse(buffer);
      })
      .catch((err) => [console.error(err)]);
  }

  parse(buffer: Buffer) {
    let parser = new Parser();
    // offset 4  slice(4,12) check if it is 'ftypisom'
    let isMP4 = parser.checkSignature(new Uint8Array(buffer.slice(4, 12)));
    if (!isMP4) {
      console.error('filetype should be mp4');
      return;
    }
    parser.parseChunks(buffer);
    console.log(parser);
  }
}

if (window['MP4Render']) {
  console.warn(`'MP4Render' had been used,and it will be covered`);
}

window['MP4Render'] = MP4Render;

export { MP4Render, Loader, Parser };
