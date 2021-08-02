import {
  Action,
  TranslateOptions,
  ScaleOptions,
  RotateOptions,
  MoveOptions,
  AttributeOptions,
  ActionTree,
  StepOptions,
  SkewOptions,
  StatusDescription,
  Point,
  PathOptions,
} from '../@types';
import Motion from '../base';
import { isUndef, copyOptions, isObject } from '../utils/share';

class AnimationLanguageSupport {
  actions: ActionTree;

  constructor() {
    this.actions = {
      parent: null,
      children: [],
    };
  }

  private initAction(): Action {
    return {
      type: 'single',
      parent: this.actions,
      duration: 400,
      timeFunction: 'linear',
      transformOrigin: '50% 50%',
    };
  }

  statusOn(
    statusDescription: StatusDescription | string,
    description?: string,
    transformOrigin?: string
  ) {
    let _statusDescription;
    if (isObject(statusDescription)) {
      _statusDescription = statusDescription;
    } else {
      _statusDescription = {
        type: statusDescription,
        description: description,
        transformOrigin: transformOrigin || '50% 50%',
      };
    }
    let action: Action = {
      type: 'single',
      action: 'statusOn',
      status: _statusDescription,
      parent: null,
      children: [],
      duration: -1,
    };
    this.actions.children.push(action);
    return this;
  }

  statusOff(statusDescription: StatusDescription | string) {
    let _statusDescription;
    if (isObject(statusDescription)) {
      _statusDescription = statusDescription;
    } else {
      _statusDescription = {
        type: statusDescription,
        description: '',
      };
    }
    let action: Action = {
      type: 'single',
      action: 'statusOff',
      status: _statusDescription,
      parent: null,
      children: [],
      duration: -1,
    };
    this.actions.children.push(action);
    return this;
  }

  step(args: any[], options: StepOptions = {}) {
    if (args.length == 0) return;
    let actions: Action = {
      type: 'group',
      parent: null,
      children: [],
    };
    actions.duration = isUndef(options.duration) ? 400 : options.duration;
    actions.timeFunction = isUndef(options.timeFunction)
      ? 'linear'
      : options.timeFunction;
    args.forEach((res) => {
      res.parent = actions;
      res.duration = actions.duration;
      res.timeFunction =
        res.timeFunction === undefined
          ? actions.timeFunction
          : res.timeFunction;
      actions.children.push(res);
    });
    this.actions.children.push(actions);
    return this;
  }

  translate(options: TranslateOptions | number, y?: number, duration?: number) {
    let action = this.initAction();
    action.action = 'translate';
    if (isObject(options)) {
      copyOptions(options, action, ['x', 'y', 'z', 'duration', 'timeFunction']);
    } else {
      action.x = options;
      action.y = y;
      action.duration = duration || 400;
    }
    this.actions.children.push(action);
    return this;
  }

  moveTo(options: MoveOptions | number, y?: number, duration?: number) {
    let action = this.initAction();
    action.action = 'move';
    if (isObject(options)) {
      copyOptions(options, action, ['x', 'y', 'duration', 'timeFunction']);
    } else {
      action.x = options;
      action.y = y;
      action.duration = duration || 400;
    }
    this.actions.children.push(action);
    return this;
  }

  scale(options: ScaleOptions | number, y?: number, duration?: number) {
    let action = this.initAction();
    action.action = 'scale';
    if (isObject(options)) {
      copyOptions(options, action, [
        'x',
        'y',
        'z',
        'duration',
        'timeFunction',
        'transformOrigin',
      ]);
    } else {
      if (isUndef(y)) {
        action.x = options;
        action.y = options;
      } else {
        action.x = options;
        action.y = y;
        action.duration = duration || 400;
      }
    }
    this.actions.children.push(action);
    return this;
  }

  rotate(options: RotateOptions | number, duration?: number) {
    let action = this.initAction();
    action.action = 'rotate';
    if (isObject(options)) {
      copyOptions(options, action, [
        'x',
        'y',
        'z',
        'duration',
        'timeFunction',
        'transformOrigin',
      ]);
    } else {
      action.z = options;
      action.duration = duration || 400;
    }
    this.actions.children.push(action);
    return this;
  }

  skew(options: SkewOptions | number, y?: number, duration?: number) {
    let action = this.initAction();
    action.action = 'skew';
    if (isObject(options)) {
      copyOptions(options, action, ['x', 'y', 'z', 'duration', 'timeFunction']);
    } else {
      action.x = options;
      action.y = y;
      action.duration = duration || 400;
    }
  }

  attribute(options: AttributeOptions|string, value?: string, duration?: number) {
    let action: Action = this.initAction();
    action.action = 'attribute';
    if (isObject(options)) {
      copyOptions(options, action, [
        'key',
        'value',
        'duration',
        'timeFunction',
      ]);
    } else {
      action.key = options;
      action.value = value;
      console.log(duration);
      action.duration = duration || 400;
    }
    this.actions.children.push(action);
    return this;
  }

  path(points: Point[], options:PathOptions = {}) {
    if (Motion.plugins['mot-plugin-path'] === undefined) {
      console.error(`'path()':this function is based on 'path' plugin`);
      return;
    }
    let action = this.initAction();
    action.action = 'path';
    let Path = Motion.createPath();
    action.points = Path.createSmoothLine(points, {
      precision: options.precision || 50,
      ratio: options.ratio || 0.3,
    });
    action.options = options || null;
    this.actions.children.push(action);
    return this;
  }

  wait(time: number) {
    let action = this.initAction();
    action.action = 'wait';
    action.time = time;
    this.actions.children.push(action);
    return this;
  }
}

export default AnimationLanguageSupport;
