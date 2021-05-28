import { Point } from '../@types/index.d'
const pi = Math.PI,
    tau = 2 * pi,
    epsilon = 1e-6,
    tauEpsilon = tau - epsilon;

const instructMap = {
    "M": 1,
    "C": 1,
    "Q": 1,
    "A": 1,
    "T": 1,
}
declare let window: any;
class Path {

    static pluginName: string = 'mot-plugin-path'
    static installed: boolean = false
    static mot: any

    instructArray = []

    constructor(instruct?: string) {
        // this.instructArray = this.parse(instruct)
    }

    static install(mot: any) {
        this.mot = mot
        mot.register('createPath', (instruct: string) => {
            return new Path(instruct)
        })
    }

    parse(instruct: string) {
        let box = instruct.trim().replace(/\s/g, ' ').split(" ").filter(item => item !== '');
        let boxLen = box.length;
        let instructArray = [];
        let tempBox = {};
        for (let i = 0; i <= boxLen; i += 2) {
            if (box[i] === 'Z') {
                instructArray.push(this.createInstruct(tempBox))
                tempBox = {};
                continue;
            }
            tempBox[box[i]] = box[i + 1];
        }
        return instructArray
    }

    createInstruct(map) {
        let instruct = {
            duration: map.T || 400,
            timeFunction: map.E || 'linear',
            instruct: '',
            value: '',
        }
        for (let key in map) {
            if (key !== 'T' && key !== 'E') {
                instruct.instruct = key
                instruct.value = map[key]
            }
        }
        return instruct
    }


    linear(t: number) {
        return +t
    }

    easeIn(t) {
        return t * t
    }

    cubicIn(t) {
        return t * t * t;
    }

    cubicOut(t) {
        return --t * t * t + 1;
    }

    cubicInOut(t) {
        return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
    }

    quadraticBelzierCurve() {

    }

    Bezier2P(p0: number, p1: number, p2: number, t: number) {
        let P0: number, P1: number, P2: number;
        P0 = p0 * (Math.pow((1 - t), 2));
        P1 = p1 * 2 * t * (1 - t);
        P2 = p2 * t * t;
        return P0 + P1 + P2
    }

    getBezierNowPoint2P(p0: Point, p1: Point, p2: Point, num: number, tick: number): Point {
        return {
            x: this.Bezier2P(p0.x, p1.x, p2.x, num * tick),
            y: this.Bezier2P(p0.y, p1.y, p2.y, num * tick),
        }
    }

    create2PBezier(p0: Point, p1: Point, p2: Point, num: number = 100, tick: number = 1) {
        let t = tick / (num - 1);
        let points = [];
        for (let i = 0; i < num; i++) {
            let point = this.getBezierNowPoint2P(p0, p1, p2, i, tick);
            points.push({ x: point.x, y: point.y });
        }
        return points;
    }

    /**
     * 三次方塞尔曲线公式
     * @returns 
     */
    Bezier3P(p0: number, p1: number, p2: number, p3: number, t: number) {
        let P0: number, P1: number, P2: number, P3: number;
        P0 = p0 * (Math.pow((1 - t), 3));
        P1 = 3 * p1 * t * (Math.pow((1 - t), 2));
        P2 = 3 * p2 * Math.pow(t, 2) * (1 - t);
        P3 = p3 * Math.pow(t, 3);

        return P0 + P1 + P2 + P3;
    }

    /**
     * 获取坐标
     */
    getBezierNowPoint3P(p0: Point, p1: Point, p2: Point, p3: Point, num: number, tick: number) {
        return {
            x: this.Bezier3P(p0.x, p1.x, p2.x, p3.x, num * tick),
            y: this.Bezier3P(p0.y, p1.y, p2.y, p3.y, num * tick),
        }
    }

    /**
    * 生成三次方贝塞尔曲线定点数据
    * @param p0   起始点  { x : number, y : number}
    * @param p1   控制点1 { x : number, y : number}
    * @param p2   控制点2 { x : number, y : number}
    * @param p3   终止点  { x : number, y : number}
    * @param num  线条精度
    * @param tick 绘制系数
    * @returns {{points: Array, num: number}}
    */
    create3PBezier(p0: Point, p1: Point, p2: Point, p3: Point, num: number = 100, tick: number = 1) {
        let pointMum = num;
        let _tick = tick;
        let t = _tick / (pointMum - 1);
        let points = [];
        for (let i = 0; i < pointMum; i++) {
            let point = this.getBezierNowPoint3P(p0, p1, p2, p3, i, t);
            points.push({ x: point.x, y: point.y });
        }
        return points;
    }
}

if (window['motPluginPath']) {
    console.warn(`'motPluginPath' had been used,and it will be covered`);
}

window['motPluginPath'] = Path;

export default Path
