import { TranslateOptions, ScaleOptions, RotateOptions, MoveOptions, AttributeOptions, ActionTree, StepOptions, SkewOptions, StatusDescription, Point, PathOptions } from '../@types';
declare class AnimationLanguageSupport {
    actions: ActionTree;
    constructor();
    private initAction;
    statusOn(statusDescription: StatusDescription | string, description?: string, transformOrigin?: string): this;
    statusOff(statusDescription: StatusDescription | string): this;
    step(args: any[], options?: StepOptions): this;
    translate(options: TranslateOptions | number, y?: number, duration?: number): this;
    moveTo(options: MoveOptions | number, y?: number, duration?: number): this;
    scale(options: ScaleOptions | number, y?: number, duration?: number): this;
    rotate(options: RotateOptions | number, duration?: number): this;
    skew(options: SkewOptions | number, y?: number, duration?: number): void;
    attribute(options: AttributeOptions | string, value?: string, duration?: number): this;
    path(points: Point[], options?: PathOptions): this;
    wait(time: number): this;
}
export default AnimationLanguageSupport;
