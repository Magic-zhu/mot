import App from './core/App';
import Block from './core/Block';
import Stage from './core/Stage';
import Sprite from './core/Sprite';
/**
 *
 *
 * @class CanvasRender
 */
class CanvasRender {
    static pluginName: string = 'CanvasRender'
    static installed: boolean = false
    static mot: any

    /**
     * install function is needed by the main program
     * @static
     * @param {*} mot
     * @memberof CanvasRender
     */
    static install(mot: any) {
      this.mot = mot;
    }
}

if (window['CanvasRender']) {
  console.warn(`'CanvasRender' had been used,and it will be covered`);
}

window['CanvasRender'] = CanvasRender;


export {
  CanvasRender,
  App,
  Stage,
  Block,
  Sprite,
};
