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
class Path {

    static pluginName: string = 'mot-plugin-path'
    static installed: boolean = false
    static mot: any

    instructArray = []

    constructor(instruct: string) {
        this.instructArray = this.parse(instruct)
    }

    static install(mot: any) {
        this.mot = mot
        mot.register('createPath', (instruct: string) => {
            return new Path(instruct)
        })
    }

    parse(instruct: string): [] {
        let box = instruct.trim().split(" ");
        let instructArray = box.map(()=>{

        })
        return []
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
}

export default Path
