import BaseNode from './BaseNode';
import {ApplicationOptions} from '../@types/index.d';
/**
 *
 *
 * @export
 * @class App
 * @extends {BaseNode}
 */
class App extends BaseNode {
  /**
  * Creates an instance of App.
  * @param {ApplicationOptions} [options]
  * @param {number} [options.resolution]
  * The resolution / device pixel ratio of the renderer.
  * @memberof App
  */
  constructor(options?:ApplicationOptions) {
    super();
  }
}

export default App;
