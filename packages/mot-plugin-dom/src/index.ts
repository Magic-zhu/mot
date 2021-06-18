import {
  Action,
  StyleObject,
  AttributeOptions,
  RotateOptions,
  ScaleOptions,
} from './@types';

declare const window: any;

/**
 * DomRender For Mot
 * @class DomRender
 */
class DomRender {
  static pluginName: string = 'DomRender';
  static installed: boolean = false;
  static mot: any;

  target: HTMLElement;
  Animation: any;
  taskQueue: any[];
  originTransform: any[];
  originTransitionProperty: string[];
  timeLine: any[];

  tempQueue: Object[];

  /**
   * Creates an instance of DomRender.
   * @param {HTMLElement} dom
   * @param {*} Animation
   * @memberof DomRender
   */
  constructor(dom: HTMLElement, Animation: any) {
    this.target = dom;
    let position = '';
    position = window.getComputedStyle(this.target, null).position;
    this.target.style.position =
      position == 'relative' ? 'relative' : 'absolute';
    this.Animation = Animation;
    this.init();
  }

  /**
   *
   *
   * @static
   * @param {*} mot
   * @memberof DomRender
   */
  static install(mot: any) {
    this.mot = mot;
    // register a function on the 'mot'
    mot.register('dom', (dom: HTMLElement, Animation: any) => {
      return new DomRender(dom, Animation);
    });
  }

  /**
   *
   *
   * @memberof DomRender
   */
  init() {
    console.log(document.styleSheets);
    this.originTransform = this.getOriginStyleTransform(this.target);
    this.originTransitionProperty = [];
    const animations = this.Animation.actions;
    this.taskQueue = animations.children || [];
    this.initStyle(this.taskQueue);
  }

  /**
   *
   * update this style
   * @param {(string | null)} transform
   * @param {(string | null)} transitionProperty
   * @memberof DomRender
   */
  update(transform: string | null, transitionProperty: string | null) {
    if (transform !== null) {
      this.originTransform = this.splitStyleToArray(transform);
    }
    if (transitionProperty !== null) {
      this.originTransitionProperty =
        this.spliteTransitionPropertyToArray(transitionProperty);
    }
  }

  /**
   *
   *
   * @param {HTMLElement} element
   * @return {*}
   * @memberof DomRender
   */
  getOriginStyleTransform(element: HTMLElement) {
    let transform: string = element.style.transform;
    transform =
      transform === '' ?
        window.getComputedStyle(element, null).transform :
        transform;
    if (transform === '' || transform === null || transform === 'none') {
      return [];
    }
    return this.splitStyleToArray(transform);
  }

  /**
   *
   *
   * @param {Action[]} taskQueue
   * @memberof DomRender
   */
  initStyle(taskQueue: Action[]) {
    let ifInitMove = false;
    const moveInit = () => {
      // TODO 用另一个api更好  待尝试
      this.target.style.left = this.target.style.left || '0px';
      this.target.style.top = this.target.style.top || '0px';
    };
    for (let i = 0, l = taskQueue.length; i < l; i++) {
      const item = taskQueue[i];
      if (item.type === 'group') {
        const ifHasMoveAction =
          item.children.findIndex((item) => item.action === 'move') !== -1;
        !ifInitMove && ifHasMoveAction && moveInit();
        ifInitMove = true;
      } else {
        if (item.action === 'move') {
          !ifInitMove && moveInit();
          ifInitMove = true;
        }
      }
    }
  }

  /**
   *
   *
   * @memberof DomRender
   */
  render() {
    DomRender.mot.emit('domRenderBeforeRender', this);
    const waitingList: StyleObject[] = this.getStyleFromTaskQueue(
        this.taskQueue,
    );
    const len: number = waitingList.length;
    let index: number = 0;
    const next = (item: StyleObject, time: number = -1) => {
      const done = () => {
        const {style} = item;
        // eslint-disable-next-line guard-for-in
        for (const attr in style) {
          this.target.style[attr] = style[attr];
        }
        index++;
        if (index < len) {
          next(
              waitingList[index],
            index === 0 ? 0 : waitingList[index - 1].duration,
          );
        }
      };
      // 判断是同步还是异步执行 -1 代表同步
      if (time === -1) {
        done();
      } else {
        setTimeout(() => {
          done();
        }, time);
      }
    };
    setTimeout(() => {
      next(waitingList[0]);
    }, 0);
  }

  /**
   *
   *
   * @param {any[]} origin
   * @param {string} newStyle
   * @return {*}  {string}
   * @memberof DomRender
   */
  mergeTransForm(origin: any[], newStyle: string): string {
    const newStyleArray = this.splitStyleToArray(newStyle);
    let transformStyle = newStyle;
    origin.forEach((item: any) => {
      let ifHasSameTransform = false;
      for (let i = 0, l = newStyleArray.length; i < l; i++) {
        if (item[0][0] == newStyleArray[i][0][0]) {
          ifHasSameTransform = true;
          break;
        }
      }
      if (!ifHasSameTransform) {
        transformStyle = transformStyle + ` ${item[0]}(${item[1]})`;
      }
    });
    return transformStyle;
  }

  /**
   *
   *
   * @param {string[]} origin
   * @param {string} newProperty
   * @return {*}
   * @memberof DomRender
   */
  mergeTransitionProperty(origin: string[], newProperty: string) {
    const newPropertyArray: string[] =
      this.spliteTransitionPropertyToArray(newProperty);
    let transitionProperty = newProperty;
    origin.forEach((item: any) => {
      if (!newPropertyArray.includes(item)) {
        transitionProperty = transitionProperty + ',' + item;
      }
    });
    return transitionProperty;
  }

  /**
   *
   *
   * @param {any[]} taskQueue
   * @return {*}  {StyleObject[]}
   * @memberof DomRender
   */
  getStyleFromTaskQueue(taskQueue: any[]): StyleObject[] {
    const styleArray: StyleObject[] = [];
    taskQueue.forEach((item) => {
      if (item.type == 'group') {
        item.children.forEach((child) => {
          child.duration = item.duration;
          styleArray.push({style: this.transferAction(child), duration: -1});
        });
        styleArray.push({style: {}, duration: item.duration});
      } else if (item.action == 'wait') {
        styleArray.push({style: {}, duration: item.time});
      } else {
        styleArray.push({
          style: this.transferAction(item),
          duration: item.duration,
        });
      }
    });
    return styleArray;
  }

  /**
   *
   *
   * @param {Action} item
   * @return {*}
   * @memberof DomRender
   */
  transferAction(item: Action) {
    const TYPEMAP = {
      translate: this.translate,
      rotate: this.rotate,
      scale: this.scale,
      attribute: this.attribute,
      move: this.move,
    };
    return TYPEMAP[item.action].bind(this)(item);
  }

  /**
   * keep animation
   * only 'rorate' 'scale' support now
   * @param {Action} item
   * @memberof DomRender
   */
  statusOn(item: Action) {

  }

  /**
   * clear the 'on' status
   * @memberof DomRender
   */
  statusOff() {}

  /**
   *
   *
   * @param {*} params
   * @return {*}
   * @memberof DomRender
   */
  translate(params: any) {
    let transform =
      params.z !== undefined ?
        `translate3d(${params.x},${params.y})` :
        `translate(${params.x},${params.y},${params.z})`;
    const transitionDuration = `${params.duration}ms`;
    const transitionTimingFunction = `${params.timeFunction}`;
    let transitionProperty = `transform`;
    transform = this.mergeTransForm(this.originTransform, transform);
    transitionProperty = this.mergeTransitionProperty(
        this.originTransitionProperty,
        transitionProperty,
    );
    this.update(transform, transitionProperty);
    return {
      transform,
      transitionDuration,
      transitionTimingFunction,
      transitionProperty,
    };
  }

  /**
   *
   *
   * @param {*} params
   * @return {*}
   * @memberof DomRender
   */
  move(params: any) {
    const left = `${Number(params.x) ? params.x + 'px' : params.x}`;
    const top = `${Number(params.x) ? params.x + 'px' : params.x}`;
    const transitionDuration = `${params.duration}ms`;
    const transitionTimingFunction = `${params.timeFunction}`;
    let transitionProperty = `left,top`;
    transitionProperty = this.mergeTransitionProperty(
        this.originTransitionProperty,
        transitionProperty,
    );
    this.update(null, transitionProperty);
    return {
      left,
      top,
      transitionDuration,
      transitionTimingFunction,
      transitionProperty,
    };
  }

  /**
   *
   *
   * @param {ScaleOptions} params
   * @return {*}
   * @memberof DomRender
   */
  scale(params: ScaleOptions) {
    let transform =
      params.z !== undefined ?
        `scale3d(${params.x},${params.y},${params.z})` :
        `scale(${params.x},${params.y})`;
    const transitionDuration = `${params.duration}ms`;
    const transitionTimingFunction = `${params.timeFunction}`;
    let transitionProperty = `transform`;
    transform = this.mergeTransForm(this.originTransform, transform);
    transitionProperty = this.mergeTransitionProperty(
        this.originTransitionProperty,
        transitionProperty,
    );
    this.update(transform, transitionProperty);
    return {
      transform,
      transitionDuration,
      transitionTimingFunction,
      transitionProperty,
    };
  }

  /**
   *
   *
   * @param {RotateOptions} params
   * @return {*}
   * @memberof DomRender
   */
  rotate(params: RotateOptions) {
    let transform =
      params.x !== undefined || params.y !== undefined ?
        `rotate3d(${params.x}deg,${params.y}deg,${params.z}deg)` :
        `rotate(${params.z}deg)`;
    const transitionDuration = `${params.duration}ms`;
    const transitionTimingFunction = `${params.timeFunction}`;
    let transitionProperty = `transform`;
    transform = this.mergeTransForm(this.originTransform, transform);
    transitionProperty = this.mergeTransitionProperty(
        this.originTransitionProperty,
        transitionProperty,
    );
    this.update(transform, transitionProperty);
    return {
      transform,
      transitionDuration,
      transitionTimingFunction,
      transitionProperty,
    };
  }

  /**
   *
   *
   * @param {AttributeOptions} params
   * @return {*}
   * @memberof DomRender
   */
  attribute(params: AttributeOptions) {
    const transitionDuration = `${params.duration}ms`;
    const transitionTimingFunction = `${params.timeFunction}`;
    let transitionProperty = `${this.humpParse(params.key)}`;
    transitionProperty = this.mergeTransitionProperty(
        this.originTransitionProperty,
        transitionProperty,
    );
    this.update(null, transitionProperty);
    return {
      [params.key]: params.value,
      transitionDuration,
      transitionTimingFunction,
      transitionProperty,
    };
  }

  /**
   *
   * aaaBbb=>‘aaa-bbb’
   * @param {string} s
   * @return {*}
   * @memberof DomRender
   */
  humpParse(s: string) {
    const reg = /([a-z]+)|([A-Z]{1}[a-z]+)/g;
    const r = s.match(reg);
    let attr = '';
    r.forEach((e, index) => {
      if (index === 0) {
        attr = e;
      } else {
        e = e.toLowerCase();
        attr = attr + '-' + e;
      }
    });
    return attr;
  }

  /**
   *
   * "rotate(10) translate(1,1)" -> [["rotate",10],[translate,"1,1"]]
   * @param {string} styleString
   * @return {*}  {any[]}
   * @memberof DomRender
   */
  splitStyleToArray(styleString: string): any[] {
    const transformArray = styleString.match(/[a-zA-Z]+\s*?\(.*?\)/gms);
    return transformArray.map((item: string) => {
      try {
        const KEYREG = /([a-zA-Z]*?)\(/;
        const VALUEREG = /\((.*)\)/;
        // match the origin attributes
        return [[item.match(KEYREG)[1]], item.match(VALUEREG)[1]];
      } catch (error) {
        throw new Error('There is something wrong with transform style');
      }
    });
  }

  /**
   *
   *
   * @param {string} property
   * @return {*}  {string[]}
   * @memberof DomRender
   */
  spliteTransitionPropertyToArray(property: string): string[] {
    const array = property
        .split(',')
        .filter((item) => item !== '' || item !== undefined);
    return array;
  }


  /**
   * 在文档中添加一条样式表规则（这可能是动态改变 class 名的更好的实现方法，
   * 使得 style 样式内容可以保留在真正的样式表中，以斌面添加额外的元素到 DOM 中）。
   * 注意这里有必要声明一个数组，因为 ECMAScript 不保证对象按预想的顺序遍历，
   * 并且 CSS 也是依赖于顺序的。
   * 类型为数组的参数 decls 接受一个 JSON 编译的数组。
   * @example
  addStylesheetRules([
    ['h2', // 还接受第二个参数作为数组中的数组
      ['color', 'red'],
      ['background-color', 'green', true] // 'true' for !important rules
    ],
    ['.myClass',
      ['background-color', 'yellow']
    ]
  ]);
   * @param {*} decls
   * @memberof DomRender
   */
  addStylesheetRules(decls) {
    const style = document.createElement('style');
    document.getElementsByTagName('head')[0].appendChild(style);
    if (!window.createPopup) {
      /* For Safari */
      style.appendChild(document.createTextNode(''));
    }
    const s = document.styleSheets[document.styleSheets.length - 1];
    for (let i = 0, dl = decls.length; i < dl; i++) {
      let j = 1;
      let decl = decls[i];
      const selector = decl[0];
      let rulesStr = '';
      if (Object.prototype.toString.call(decl[1][0]) === '[object Array]') {
        decl = decl[1];
        j = 0;
      }
      for (let rl = decl.length; j < rl; j++) {
        const rule = decl[j];
        rulesStr +=
          rule[0] + ':' + rule[1] + (rule[2] ? ' !important' : '') + ';\n';
      }

      if (s.insertRule) {
        s.insertRule(selector + '{' + rulesStr + '}', s.cssRules.length);
      } else {
        /* IE */
        s.addRule(selector, rulesStr, -1);
      }
    }
  }
}

if (window['DomRender']) {
  console.warn(`'DomRender' had been used,and it will be covered`);
}

window['DomRender'] = DomRender;

export default DomRender;
